/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

const CountdownTimer = ({dateTime}) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(()=>{
    const intervalId = setInterval(() => {
      const givenDateTime = new Date(dateTime);
      const currentTime = new Date();
      const difference =  givenDateTime.getTime() - currentTime.getTime();

      if(difference <= 0){
        clearInterval(intervalId);
        setTimeLeft('Time has Expired');
      }else{
        const hoursLeft = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(`${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`);
      }
    }, 1000);

    return () => clearInterval(intervalId);

  }, [dateTime])
  return (
    <div>
      {timeLeft !== null ? (
        <p>Time remaining : {timeLeft}</p>
      ):(
        <p>Initializing countdown...</p>
      )}
    </div>
  )
}

export default CountdownTimer;