import React, { useState, useEffect } from "react";
import Page from "../Page";


function Header({ list, deleteItem, MarkStatus }) {
  var [userPhoto, setUserPhoto] = useState(JSON.parse(localStorage.getItem("userPhoto")) || "");
  var [notification, setNotification] = useState(false);
  var [display, setDisplay] = useState("");
  var [UserName, setUserName] = useState(JSON.parse(localStorage.getItem("UserName")) || "Hello User");
  var [Count, setCount] = useState(0);
  var [MissedReminderCount, setMissedReminderCount] = useState(0);
  var [MissedTaskCount, setMissedTaskCount] = useState(0);
  var [upcomingCount, setUpcomingCount] = useState(0);
  var [showPhotoremove, setShowPhotoremove] = useState(false);
  var [showUserNameremove, setShowUserNameremove] = useState(false);


  useEffect(() => {
    const storedUserPhoto = JSON.parse(localStorage.getItem("userPhoto"));
    if (storedUserPhoto) {
      setUserPhoto(storedUserPhoto);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(handleReminder, 1000 * 60);
    return () => clearInterval(intervalId);
  });

  useEffect(() => {
    handlecount();
  });

  const replaceImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = document.createElement("img");
        img.src = reader.result;
        setUserPhoto(reader.result);
        localStorage.setItem("userPhoto", JSON.stringify(reader.result));
      };
      reader.readAsDataURL(input.files[0]);
    };
    input.click();
  };

  const removeImage = () => {
    setUserPhoto("");
    localStorage.removeItem("userPhoto");
  };

  const handleReminder = () => {
    var remindedTasks = list.filter((task) => {
      const today = new Date();
      const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
      const taskDate = new Date(task.TaskRemindDate);
      const taskTime = task.TaskRemindTime; // Fixed the error here
      return taskDate === today && taskTime === currentTime && task.TaskStatus === "Pending"; // Fixed the comparison operator here
    });
    if (remindedTasks.length > 0) {
      const message = `You have ${remindedTasks.length} task${remindedTasks.length > 1 ? "s" : ""} due today:\n${remindedTasks.map(
        (task) => task.TaskName
      ).join(", ")}`;
      alert(message);
      remindedTasks = [];
      return;
    }
  };

  function handleNotification() {
    setNotification(!notification);
  }

  function handleUserName() {
    var newUserName = prompt("Please enter your name");

    if (newUserName === null || newUserName === "") {
      alert("User cancelled the prompt.");
      return;
    }

    localStorage.setItem("UserName", JSON.stringify(newUserName));
    setUserName(newUserName);
  }

  function removeUserName() {
    setUserName("Hello User");
    localStorage.removeItem("UserName");
  }

  function handlecount() {
    let pendingTaskCount = 0;
    let missedReminderCount = 0;
    let upcomingReminderCount = 0;
    let missedTaskCount = 0;

    const today = new Date();
    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

    list.forEach((item) => {
      const taskDate = new Date(item.TaskRemindDate);
      const taskTime = item.TaskRemindTime;
      const status = item.TaskStatus;
      const taskDonedate = new Date(item.TaskRem);

      if (taskDonedate < today && status === "Pending") {
        missedTaskCount++;
      }

      if (taskDate === "" || taskTime === "") {
        return;
      }

      if (taskDate <= today && status === "Pending") {
        pendingTaskCount++;

        if (taskDate === today && taskTime >= currentTime) {
          upcomingReminderCount++;
        } else if (taskDate < today || taskTime !== "") {
          missedReminderCount++;
        }
      }
    });

    setCount(pendingTaskCount + missedTaskCount);
    setMissedReminderCount(missedReminderCount);
    setUpcomingCount(upcomingReminderCount);
    setMissedTaskCount(missedTaskCount);
  }



  function handleHome() {
    window.location.reload();
  }


  return (
    <div className="headersection">
      <div onClick={handleNotification}>
        <img src="images/notificationbell.webp" alt="notification" />
        {Count > 0 && <span className="notification-count">{Count}</span>}
      </div>
      <div>
        <div>
          {showPhotoremove === true && userPhoto !== "" && (
            <div className="bg">
              <div className="reminderform">
                <div className="alignement row">
                  <h2>Edit/Delete Photo</h2>
                  <div onClick={() => setShowPhotoremove(false)} className="closebtn">
                    X
                  </div>
                </div>
                <div className="col alignment">
                  <img src="images/edit-icon.webp" alt="edit" onClick={replaceImage} />
                  <img src="images/del-icon.webp" alt="delete" onClick={removeImage} />
                </div>
              </div>
            </div>
          )}

          {userPhoto ? (
            <img src={userPhoto} alt="Avatar" onClick={() => setShowPhotoremove(true)} />
          ) : (
            <img src="images/avatar.webp" alt="Avatar" onClick={() => setShowPhotoremove(true)} />
          )}
        </div>

        <div>
          {showUserNameremove === true && UserName !== "Hello User" && (
            <div className="bg">
              <div className="reminderform">
                <div className="alignement row">
                  <h2>Edit/Delete Username</h2>
                  <div onClick={() => setShowUserNameremove(false)} className="closebtn">
                    X
                  </div>
                </div>
                <div className="col alignment">
                  <img src="images/edit-icon.webp" alt="edit" onClick={handleUserName} />
                  <img src="images/del-icon.webp" alt="delete" onClick={removeUserName} />
                </div>
              </div>
            </div>
          )}

          <h3 onClick={() => setShowUserNameremove(true)}>{UserName}</h3>
        </div>

      </div>
      <div>
        <img src="images/home-icon.webp" alt="home" onClick={() => handleHome()} />
      </div>

      {notification === true && (
        <div className="bg">
          <div className="reminderform">
            <div className="alignement row">
              <h2>Check this out !!! </h2>
              <div onClick={handleNotification} className="closebtn">X</div>
            </div>
            <div className="col alignment">
              <div className="Notificationbanner row" >
                <div className="notification-container">
                  <img src="images/missedReminder.webp" className="img" onClick={() => setDisplay("OldReminder")} alt="missedRem" />
                  <span className="notification-count">{MissedReminderCount}</span>
                </div>

                <div className="notification-container">
                  <img src="images/upcommingReminder.webp" className="img" onClick={() => setDisplay("TodaysReminder")} alt="upcomingRem" />
                  <span className="notification-count">{upcomingCount}</span>
                </div>

                <div className="notification-container">
                  <img src="images/missed.webp" className="img" onClick={() => setDisplay("Missed")} alt="missedTask" />
                  <span className="notification-count">{MissedTaskCount}</span>
                </div>
              </div>

              {display === "TodaysReminder" && (
                <div >
                  <Page heading={"Todays Reminder"} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} id={display} />
                </div>
              )}
              {display === "OldReminder" && (
                <div >
                  <Page heading={"Old Task Reminder"} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} id={display} />
                </div>
              )}
              {display === "Missed" && (
                <div >
                  <Page heading={"Missed"} list={list} deleteItem={deleteItem} MarkStatus={MarkStatus} id={display} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;

