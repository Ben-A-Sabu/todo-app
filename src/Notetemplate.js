import React, { useState } from "react";

export default function Notetemplate({ item, index, list, deleteItem, MarkStatus }) {
  const [edit, setEdit] = useState(false);
  const [taskname, setTaskname] = useState(item.TaskName);
  const [taskdis, setTaskdis] = useState(item.TaskDis);
  const [taskrem, setTaskrem] = useState(item.TaskRem);
  const[OpenMenu, setOpenMenu] = useState(false);
  const[OpenDescription, setOpenDescription] = useState(false);
  const[OpenReminder, setOpenReminder] = useState(false);
  const [taskremindtime, setTaskremindTime] = useState(item.TaskRemindTime);
  const [taskreminddate, setTaskremindDate] = useState(item.TaskRemindDate);

  function handleEdit(index) {
    setEdit(index === edit ? false : index);
  }

  function handleOpenMenu(index) {
    setOpenMenu(index === OpenMenu ? false : index);
  }

  function handleOpenDescription(index) {
    setOpenDescription(index === OpenDescription ? false : index);
  }

  function handleOpenReminder(index) {
    setOpenReminder(index === OpenReminder ? false : index);
  }

  function handleDelete(index) {
    deleteItem(index);
  }

  function handleDone(index) {
    MarkStatus(index);
  }

  function isPastDate(date) {
    var today =  new Date().toISOString().split('T')[0];
    if (date < today) {
      return true;
    }
    return false;
  }

  function handleUpdate(index) {
    if (taskname !== "" && taskrem !== "") {
      if (isPastDate(taskrem)) {
        alert("Please enter a valid date!");
        return;
      }
      list[index]["TaskName"] = taskname;
      list[index]["TaskDis"] = taskdis;
      list[index]["TaskRem"] = taskrem;
      localStorage.setItem("todos", JSON.stringify(list));
      handleEdit(index);
      return;
    } else if (taskname !== "" && taskrem === "") {
      if (window.confirm("Are you sure you want to update without a reminder?")) {
        list[index]["TaskName"] = taskname;
        list[index]["TaskDis"] = taskdis;
        list[index]["TaskRem"] = taskrem;
        localStorage.setItem("todos", JSON.stringify(list));
        handleEdit(index);
        return;
      } else {
        return;
      }
    }
  }

 function handleReminder(index) {
        if (taskreminddate === "" || taskremindtime === "") {
          alert("Please enter a valid date and time!");
          return;
        }
        if (isPastDate(taskreminddate) || new Date().toISOString().split('T')[0].getTime(taskremindtime) < new Date().toISOString().split('T')[0].getTime()) {
          alert("Please enter a valid date! (or) Please enter a valid time!");
          return;
        }
          list[index]["TaskRemindTime"] =taskremindtime ;
          list[index]["TaskRemindDate"] = taskreminddate;
          localStorage.setItem("todos", JSON.stringify(list));
          handleOpenReminder(index)
 }

function handleReminderReset(index) {
  list[index]["TaskRemindTime"] ="" ;
  list[index]["TaskRemindDate"] = "";
  localStorage.setItem("todos", JSON.stringify(list));
  handleOpenReminder(index)
}

  return (
    <div className="todo">
      <div className="row TaskMenubar">
      <img src="images/menu.webp" alt="edit" className="menubtn" onClick={()=> handleOpenMenu(index)} />

          {OpenMenu === index && (
            <div className="menulist row">
               <img src="images/reminder.webp" alt="reminder"  className="reminderbtn" onClick={()=> handleOpenReminder(index)}></img>
               <img src="images/view-details.webp" alt="view-detail" className="detailbtn" onClick={()=>handleOpenDescription(index)}></img>
           </div>
            )}

          {OpenDescription === index && (
            <div className="bg">
           <div className="reminderform">
           <div className="alignement row"><h2> Description</h2><div onClick={()=>handleOpenDescription(index)} className="closebtn">X</div></div>
           <div className="alignment col">
            <div className="row alignment"> <h3>Task:</h3> {item.TaskName}</div>
            <div className="col alignment"><h3>Description</h3>{item.TaskDis}</div>
           </div>
           </div>
            </div>
          )}

          {OpenReminder === index && (
            <div className="bg">
            <div className="reminderform">
             <div className="alignement row"><h2>Set Reminder</h2><div onClick={()=>handleOpenReminder(index)} className="closebtn">X</div></div>
               <div className="alignment col">
                 <input type="date"  name="taskdate"  value={taskreminddate}   onChange={(e)=> setTaskremindDate(e.target.value)}/>
                 <input type="time"  name="taskreminder" value={taskremindtime} onChange={(e)=>setTaskremindTime(e.target.value)}/>
                        <div className="row">
                           {item.TaskRemindDate==="" &&  (
                            <>
                            <button type="submit" className="generalbtn"  onClick={()=>handleReminder(index)}>Set</button>
                            <button type="submit" className="generalbtn "  onClick={()=>handleOpenReminder(index)}>Cancel</button>
                            </>
                            )}
                            {item.TaskRemindDate!=="" &&   (
                            <>
                             <button type="submit" className="generalbtn"  onClick={()=>handleReminder(index)}>Update</button>
                             <button type="submit" className="generalbtn "  onClick={()=>handleReminderReset(index)}>Clear</button>
                           </>
                            )}
                        </div>
              </div>
            </div>
            </div>
            )}          

      </div>
      <div className="taskname">{item.TaskName}</div>
      {(isPastDate(item.TaskRem)===true || (item.TaskRem > new Date().toISOString().split('T')[0])) && (<div className="taskdate">{item.TaskRem}</div>)}
      <div className="row taskbtn">
        <img src="images/edit-icon.webp" alt="edit"  onClick={() => handleEdit(index)} />
        <img src="images/del-icon.webp" alt="delete"  onClick={() => handleDelete(index)} />
        {
          item.TaskStatus === "Done" ? (
            <img src="images/undo.webp" alt="MarkasDone"  onClick={() => handleDone(index)} />
          ) : (
            <img src="images/done-icon.webp" alt="Unmark"  onClick={() => handleDone(index)} />
          )
        }
      </div>
      {edit === index && (
        <div className="col alignment">
          <input type="text" id="taskname" name="taskname" placeholder="Taskname" value={taskname} onChange={(e) => setTaskname(e.target.value)} />
          <input type="text" id="taskdis" name="taskdis" placeholder="Task Dis" value={taskdis} onChange={(e) => setTaskdis(e.target.value)} />
          <input type="date" id="taskrem" name="taskrem" value={taskrem} onChange={(e) => setTaskrem(e.target.value)} />
          <div className="row">
            <button type="submit" className="generalbtn" id="update" onClick={() => handleUpdate(index)}>Update</button>
            <button type="submit" className="generalbtn" id="Cancel" onClick={() => handleEdit(index)}>Cancel</button>
          </div>
        </div>
      )}
 
    </div>
  );
}
