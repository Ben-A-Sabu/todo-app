import { useState } from 'react';

export default function Floatingbtn({updateList}) {

  const[displaypopup,setdisplaypopup]=useState(false);
  const [todo, setTodo] = useState("");
  const [tododis, setTododis] = useState("");
  const [todorem, setTodorem] = useState("");

  function isPastDate(date){
    let today = new Date().toISOString().split('T')[0];
    let taskdate = new Date().toISOString().split('T')[0];

    if(taskdate<today){
      return true;
    }
    return false;
  }

   function addTodo() {

    if(todo==="" ){
      alert("Please enter Task");
      return;
    }

    else if(isPastDate(todorem)){
      alert("Please enter valid date");
      return;
    }

  const Newtodoarr =JSON.parse(localStorage.getItem("todos"))||[];
    let todoObj = {
      TaskName: todo,
      TaskDis: tododis,
      TaskRem: todorem,
      TaskStatus: "Pending",
      TaskRemindTime: "",
      TaskRemindDate: "",
    }
    
      Newtodoarr.push(todoObj);
      localStorage.setItem("todos", JSON.stringify(Newtodoarr));
      updateList();
      setdisplaypopup(!displaypopup);
   }


  function handleDisplaypopup(){
    setdisplaypopup(!displaypopup);
  }
  return (
    <div id='Addbtn' className="fpbtn">
      <img src="images/button_add.webp" alt="add" onClick={handleDisplaypopup}></img>
      
     {/* Popup content */} 
      {displaypopup && (
        <div className="bg">
          <div  className="reminderform">
            <div className="col">
              <h2>Popup Header</h2>
              <div className='closebtn' onClick={handleDisplaypopup}>X</div>
            </div>
            <div className='alignment col'>
              <input  type="text" placeholder="Enter Task" value={todo} onChange={(e) => setTodo(e.target.value)}></input>   
              <input  type="text" placeholder="Enter Description" value={tododis} onChange={(e) => setTododis(e.target.value)}></input>
              <input   type="date" placeholder="Date and Time" value={todorem} onChange={(e) => setTodorem(e.target.value)}></input>
              <button  className='generalbtn' onClick={addTodo}>Save</button>
            </div>
          </div>
        </div> 
      )} 
      {/* Popup content */}      

    </div>
  );
  
}

