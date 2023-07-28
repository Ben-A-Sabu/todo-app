import './App.css';
import React, { useState } from 'react';
import Headerpart from './components/Header';
import Footer from './components/Footer';
import Floatingbtn from './components/Floatingbtn';
import Page from './Page';

function App() {

  const [list, setList] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [display, setDisplay] = useState("Today");
  const [page, setPage] = useState(0);
  const pageArr=["Today","Completed","This Week","Tommorow","Upcoming","Someday","Missed","OldReminder","TodaysReminder"];

  const handleSlide = (btnid) => { 

    if(btnid==="forward"){
      setPage(page+1);
      setDisplay(pageArr[page+1]);
    }
    else{
      setPage(page-1);
      setDisplay(pageArr[page-1]);
    }
  }
    
  function updateList() {
    const updatedList = JSON.parse(localStorage.getItem("todos")) || [];
    setList(updatedList);
  }

  function deleteItem(index) {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
    localStorage.setItem("todos", JSON.stringify(newList));
  }

  function MarkStatus(index) {
    if (list[index]["TaskStatus"] === "Done") {
      list[index]["TaskStatus"] = "Pending";
    } else {
      list[index]["TaskStatus"] = "Done";
    }
    localStorage.setItem("todos", JSON.stringify(list));
    updateList();
  }
  

  return (
    <div className="App">
      <Headerpart  list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} />
      <div className="todolist" id="mainlist">
        {page<8 &&(<img src="images/slide-icon.webp" alt="slidebtn" id="forward" className='fpbtn' onClick={()=>handleSlide("forward")}/>)}
        
          {page===8 &&( <Page heading={"Todays Reminder"} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} id={display} />)}
          {page===7 &&(  <Page heading={"Old Task Reminder"} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} id={display} />)}
          {page===6 &&( <Page heading={"This Week"} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} id={display} />)}
          {page===5 && (<Page heading={"Tomorrow"} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} id={display} />)}
          {page===4 && (<Page heading={"Upcoming"} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus}  id={display} />)}
          {page===3 && (<Page heading={"Someday"} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} id={display} />)}
          {page===2 && (<Page heading={"Missed"} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} id={display}/>)}
          {page===1 && (<Page heading={"Completed"} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} id={display} />)}
          {page===0 && (<Page heading={"Today"} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} id={display}/>)}
          
        {page>0 &&( <img src="images/slide-icon.webp" alt="slidebtn" id="previous" className='fpbtn'   onClick={()=>handleSlide("previous")}/>)}

      </div>
      <Footer />
      <Floatingbtn updateList={updateList} />
    </div>
  );
}


export default App;










