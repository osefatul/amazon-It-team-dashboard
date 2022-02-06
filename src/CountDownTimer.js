import React, { useState, useEffect } from "react";

setInterval(() => {});

const CountDownTimer = ({ hoursMinSecs }) => {
  const [timer, setTimer] = useState(false);

  const hours = (new Date().getHours() + 1).toString();
  const seconds = new Date().getSeconds().toLocaleString();
  const minutes = new Date().getMinutes().toLocaleString();
  const day = (new Date().getDay() + 1).toString(); //this is string

  //We are using counter where it will chane per 1000miliseconds === 1 sec. because this will refresh the page to render the countdown timer.
  //we can't directly use seconds or minutes as it will not render from the page.
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (parseInt(hours) > 7 && parseInt(hours) < 19) {
      setTimer(true);
    } else {
      setTimer(false);
    }

    //using setinterval to render counter each second otherwise it won't work.
    const interval = setInterval(() => {
      return setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);

  return (
    <>
      {timer ? (
        <div style={{ color: "red" }}>
          <h2>{`${17 - hours} : ${60 - minutes}  :${60 - seconds} `}</h2>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CountDownTimer;
