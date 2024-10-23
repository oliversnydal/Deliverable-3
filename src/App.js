import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import React from 'react'

function App() {

  const [reminder, setReminder] = useState(null);
  const [date, setDate] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [completedReminders, setCompletedReminders] = useState([]);


  function submit(e){
    e.preventDefault();

    const dueDate = new Date(date);
    if (isNaN(dueDate.getTime()) || (dueDate.getYear() == 69 && dueDate.getMonth() == 11)){
      alert('Enter a valid date');
      return;
    }

    const newReminder = {
      activity: reminder,
      dueDate: dueDate,
      checked: false
    };

    const updatedReminders = [...reminders, newReminder].sort((a,b) => a.dueDate-b.dueDate);
    setReminders(updatedReminders);
    setReminder('');
    setDate('');
  }

  const toggleChecked = (index, isCompleted) => {
    if (isCompleted){

      const toggledItem = completedReminders[index];

      const newReminders = [...reminders, {...toggledItem, checked: false}];
      setReminders(newReminders);

      const updatedCompletedReminders = completedReminders.filter((_,i) => i!==index);
      setCompletedReminders(updatedCompletedReminders);

    } else {

      const toggledItem = reminders[index];

      const newCompletedReminders = [...completedReminders, {...toggledItem, checked: true}];
      setCompletedReminders(newCompletedReminders);

      const updatedReminders = reminders.filter((_,i) => i !== index);
      setReminders(updatedReminders);

    }



    {/*const updatedReminders = reminders.map((item,i) =>
      i===index ? {...item, checked: !item.checked} : item
    );

    updatedReminders.sort((a,b) => {
      if (a.checked === b.checked){
        return a.dueDate - b.dueDate;
      }
      return a.checked ? 1:-1;
    }); */}
  };

  return(
    <div>
      <h1>Create your checklist</h1>
      <form onSubmit = {submit}>

      <div>
        <input
          id = {"reminderInput"}
          type = {"text"}
          placeholder = {"Enter Reminder"}
          value = {reminder}
          onChange = {e => setReminder(e.target.value)}
        />

        <input
          id = {"dateInput"}
          type = {"date"}
          value = {date}
          onChange = {e => setDate(e.target.value)}
        />

        <button
          id = {"submitButton"}
          type = {"submit"}
        >
          Add Reminder
        </button>

        </div>
        </form>

        {reminders.length>0 &&(
          <div>
            <h2>To Do</h2>
            <ol id = "remindersList">
              {reminders.map((activity,index) =>(
                <li key = {index}>
                  <input
                    type = "checkbox"
                    checked = {activity.checked}
                    onChange = {() => toggleChecked(index, false)}
                  />
                  {activity.activity}-{activity.dueDate.toLocaleDateString()}
                </li>
              ))}
            </ol>
          </div>
        )}

        {completedReminders.length > 0 &&(
          <div>
            <h2>Completed Tasks</h2>
            <ol id="completedRemindersList">
              {completedReminders.map((activity, index) => (
                <li key = {index}>
                  <input 
                    type ="checkbox"
                    checked = {activity.checked}
                    onChange = {()=>toggleChecked(index, true)}
                  />
                  {activity.activity} - {activity.dueDate.toLocaleDateString()}
                </li>
              ))}
            </ol>
          </div>
        )}

      </div>
  );
}





export default App;
