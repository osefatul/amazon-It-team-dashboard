import React, { Component, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { activate, selectActive } from "./features/userSlice";
import { useSelector } from "react-redux";

const AvailbleTeam = ({ prsn, day, dayShift }) => {
  const dispatch = useDispatch();
  const [availablePerson, setAvailablePerson] = useState(prsn);

  // const day = parseInt("2");
  const hours = new Date().getHours().toString();
  const sec = new Date().getSeconds().toString();

  useEffect(() => {
    setAvailablePerson(prsn);
    if (day !== 4) {
      dispatch(activate(prsn.login));
    }
  }, [sec, availablePerson, dayShift]);
  //We will only assign a single member that is working on site to activate reducer. which happens every day except wednesday

  const { id, name, badge } = availablePerson;
  return (
    <div>
      <article className="parentShiftContainer">
        <div key={id} className="availableShift">
          <img src={badge} alt={name} />
        </div>
      </article>
    </div>
  );
};

export default AvailbleTeam;
