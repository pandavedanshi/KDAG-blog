import React, { useState, useEffect } from 'react';


const Countdown = ({ countdownData, event_name }) => {
  if (!countdownData.isItBday) {
    return (
      <div>
        
        <div className='countdown-wrapper'>
          <div className='countdown-box'>
            {countdownData.days} 
            <span className='legend'>Days</span>
          </div>
          <div className='countdown-box'>
            {countdownData.hours}  
            <span className='legend'>Hours</span>
          </div>
          <div className='countdown-box'>
            {countdownData.minutes}  
            <span className='legend'>Minutes</span>
          </div>
          <div className='countdown-box'>
            {countdownData.seconds} 
            <span className='legend'>Seconds</span>
          </div>
        </div>
      </div>
    );
  } 
};
const Birthday = ({ event_name, day, month }) => {
  // useState Hooks
  const [state, setState] = useState({
    seconds: 0,
    hours: 0,
    minutes: 0,
    days: 0,
    isIteventday: false,
  });

  if (event_name === undefined || day === undefined || month === undefined) {
    // This is if not enough params are provided
    event_name = 'KDSH'; // Name of the Person
    month = 10; // Month of the Birthday
    day = 28; // Day of the Birthday
  }

  // get current time
  const currentTime = new Date();
  // get current year
  const currentYear = currentTime.getFullYear();

  // Getting the Birthday in Data Object
  // WE subtract 1 from momnth ; Months start from 0 in Date Object
  // Bithday Boolean
  const isIteventday =
    currentTime.getDate() === day && currentTime.getMonth() === month - 1;

  useEffect(() => {
    setInterval(() => {
      const countdown = () => {
        // Getting the Current Date
        const dateAtm = new Date();

        // if the Birthday has passed
        // then set the Birthday countdown for next year
        let birthdayDay = new Date(currentYear, month - 1, day);
        if (dateAtm > birthdayDay) {
          birthdayDay = new Date(currentYear + 1, month - 1, day);
        } else if (dateAtm.getFullYear() === birthdayDay.getFullYear() + 1) {
          birthdayDay = new Date(currentYear, month - 1, day);
        }

        // Getitng Current Time
        const currentTime = dateAtm.getTime();
        // Getting Birthdays Time
        const birthdayTime = birthdayDay.getTime();

        // Time remaining for the Birthday
        const timeRemaining = birthdayTime - currentTime;

        let seconds = Math.floor(timeRemaining / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;

        // Setting States
        setState((prevState) => ({
          ...prevState,
          seconds,
          minutes,
          hours,
          days,
          isIteventday,
        }));
        // console.log(`${days}:${hours}:${minutes}:${seconds} , ${isItBday}`);
      };
      if (!isIteventday) {
        countdown();
      } else {
        setState((prevState) => ({
          ...prevState,
          isIteventday: true,
        }));
      }
    }, 1000);
  }, [currentYear, day, isIteventday, month]);

  let birth = new Date(currentYear, month - 1, day);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let monthBday = monthNames[birth.getMonth()];

  return (
   
    <div className='page'>
      <Countdown countdownData={state} event_name={event_name}/>
    </div>
  );
};

export default Birthday;