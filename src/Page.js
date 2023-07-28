import React, { useEffect } from "react";
import Body from "./components/Body";
import Notetemplate from "./Notetemplate";

export default function Page({ Heading, list, deleteItem, MarkStatus , id}) {

  var count=0;

  useEffect(() => {
    handleTaskCount();
  });
  
   function getWeek(date) {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const millisecsInDay = 86400000;
    const dayOfYear = (date - onejan) / millisecsInDay;
    return Math.ceil((dayOfYear + onejan.getDay() + 1) / 7);
     }

     function handleTaskCount(){
      document.getElementById("NumberofTasks").innerHTML = count + " Tasks"
     }
         
    return (
        count=0,
        <>
        {id==="Today" &&(
        <Body heading={"Today"}>
          { list.map((item, index) => {
            const itemDate = item.TaskRem;
            const todayDate = new Date().toISOString().split('T')[0];
            const isToday = itemDate === todayDate;
            if (isToday && item.TaskStatus === "Pending") {
              count=count+1;
              return <Notetemplate item={item} index={index} key={index} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} />;
            }
            return null;
          })}
        </Body>
        )}

     { id==="This Week" && ( 
        <Body heading={"This Week"}>
          { list.map((item, index) => {
            const itemDate =new Date (item.TaskRem)
            const todayDate = new Date();
            const Thisweek = getWeek(itemDate);
            const currentWeek = getWeek(todayDate);

            if (Thisweek === currentWeek && item.TaskStatus==="Pending") {
              count=count+1;
              return <Notetemplate item={item} index={index} key={index} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} />;
            }

            return null;
          })}
        </Body>
      )}

     {id==="Tommorow" &&(
         <Body heading={"Tommorow"}>
          {  list.map((item, index) => {
               const itemDate = new Date(item.TaskRem).toDateString();
               const todayDate = new Date();
               var tomorrow = new Date(todayDate);
               tomorrow.setDate(todayDate.getDate() + 1);
               tomorrow=tomorrow.toDateString();
            if (itemDate === tomorrow && item.TaskStatus==="Pending") {
              count=count+1;
              return <Notetemplate item={item} index={index} key={index} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} />;
            }
            return null;
          })}
        </Body>
       )}

     {id==="Upcoming" &&(
         <Body heading={"Upcoming"}>
          {list.map((item, index) => {
            const itemDate = item.TaskRem
            const todayDate = new Date().toISOString().split('T')[0]
            if (todayDate < itemDate && item.TaskStatus==="Pending") {
              count=count+1;
              return <Notetemplate item={item} index={index} key={index} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} />;
            }
            return null;
          })}
        </Body>
           )}

        {id==="Someday" &&(
          <Body heading={"Someday"}>
          {list.map((item, index) => {
            if (item.TaskRem==="" && item.TaskStatus==="Pending") {
              count=count+1;
              return <Notetemplate item={item} index={index} key={index} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} />;
            }
            return null;
          })}
        </Body>
         )}

    {id==="Missed" &&(
          <Body heading={"Missed Tasks"}>
          {id="Missed" && list.map((item, index) => {
            const itemDate = item.TaskRem
            const todayDate = new Date().toISOString().split('T')[0];
            if (itemDate<todayDate && item.TaskStatus==="Pending") {
              count=count+1;
              return <Notetemplate item={item} index={index} key={index} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} />;
            }
            return null;
          })}
        </Body>
         ) }

       {id==="Completed" && (
        <Body heading={"Completed"}>
          {list.map((item, index) => {
            if (item.TaskStatus==="Done") {
              count=count+1;
              return <Notetemplate item={item} index={index} key={index} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} />;
            }
            return null;
          })}
        </Body>
        )}
    {/*//////////////////////////////////////////////////////////////////////////*/}
     {id==="OldReminder" && (
        <Body heading={"Old Task Reminder"}>
        { list.map((item, index) => {
          const itemDate = new Date(item.TaskRemindDate)
          const itemtime = item.TaskRemindTime
          const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
          const todayDate =new Date()
          const isTrue = itemDate < todayDate && item.TaskStatus === "Pending" ;
         
            if((itemDate === todayDate && itemtime < currentTime && item.TaskStatus==="Pending") || (isTrue)){
              count=count+1;
            return <Notetemplate item={item} index={index} key={index} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} />;
            }
          
          return null;
        })}
      </Body>
        )}

     {id==="TodaysReminder" && (
        <Body heading={"Todays Reminder"}>
        { list.map((item, index) => {
          const itemDate = new Date(item.TaskRemindDate)
          const todayDate = new Date()
          const itemtime = item.TaskRemindTime
          const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
          const isToday = itemDate === todayDate;
          if (isToday && item.TaskStatus === "Pending" && currentTime<itemtime &&itemDate !=="" && item.TaskRemindTime !=="") {
            count=count+1;
            return <Notetemplate item={item} index={index} key={index} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} />;
          }
          return null;
           })}
        </Body>
        )}
        </>
    );
    
}