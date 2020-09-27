import { useEffect, useState } from "react";

// import "../styles/Timer.css";

const Timer = (isButton) => {
  const [seconds, setSeconds] = useState(20);
  let i;

  useEffect(() => {
    let sec = seconds;
    i = setInterval(() => {
      sec--;
      setSeconds(sec);
    }, 1000);
    if (seconds <= 0) {
      clearInterval(i);
      return;
    }
  }, [seconds, i]);
  return (
    <div id="timer">
      <div className="timer-div">
        {" "}
        00 <span className="timer-span">minutes</span>
      </div>

      <div className="timer-div">
        {seconds}
        <span className="timer-span">seconds</span>
      </div>
    </div>
  );
};

export default Timer;
