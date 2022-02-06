import React, { useState, useEffect } from "react";

const Mgr = ({ people }) => {
  const day = (new Date().getDay() + 1).toString(); //this is string
  // const day = parseInt("2");
  const hours = new Date().getHours().toString();
  // const hours = 17;
  const minutes = new Date().getMinutes().toString();
  const [counter, setCounter] = useState(0);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    if (day > 1) {
      if (parseInt(hours) >= 9 && parseInt(hours) <= 16) {
        setAvailable(true);
      } else {
        setAvailable(false);
      }
    }
    //using setinterval to render counter each second otherwise it won't work.
    const interval = setInterval(() => {
      return setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);

  const newMgr = people.filter((person) => {
    return person.login === "bppeders";
  });

  return (
    <>
      {newMgr.map((person) => {
        const { id, name, login, image } = person;
        return available ? (
          <div key={newMgr.id} className="managerPerson ">
            <div className="availableMgrSign"></div>
            <img className="availableUser" src={image} alt={name} />
            <div className="personDiv">
              <h4>{name}</h4>
              <h4 style={{ color: "yellow", marginTop: "5px" }}>on-site</h4>
            </div>
          </div>
        ) : (
          <div key={id} className="managerPerson">
            <img src={image} alt={name} />
            <div className="personDiv">
              <h4>{name}</h4>
              <p>
                <b>{login}</b>
              </p>
              <h4 style={{ color: "red", marginTop: "5px" }}>Off-site</h4>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default Mgr;
