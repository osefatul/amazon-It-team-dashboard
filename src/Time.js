import React, { useState, useEffect, Component } from "react";
import Team from "./Team";
import Moment from "react-moment";
import "moment-timezone";
import AvailbleTeam from "./availableTeam";
import { useDispatch } from "react-redux";
import {
  activate,
  deaActivate,
  selectActive,
  setWed,
  selectWed,
  unsetWed,
} from "./features/userSlice";
import { useSelector } from "react-redux";
const schedule = require("node-schedule");

const Time = ({ people }) => {
  const day = (new Date().getDay() + 1).toString(); //this is string
  // const day = "4";
  const hours = new Date().getHours().toString();
  // const hours = "20";
  const minutes = new Date().getMinutes().toString();
  const sec = new Date().getSeconds().toString();
  //shift setter
  const [dayShift, setDayShift] = useState(false);
  const [counter, setCounter] = useState(0);

  const active = useSelector(selectActive);
  const wed = useSelector(selectWed);
  const dispatch = useDispatch();

  //Days Team
  const FHD = ["osefatul"];
  const weDay = ["osefatul", "amiladmo"];
  const BHD = ["amiladmo"];

  //Night Team
  const FHN = ["rrrajand"];
  const WedNight = ["rrrajand", "ksaaed"];
  const BHN = ["ksaaed"];

  //The difference between team and shift is that shift has all the data of the team member

  // Day Shift
  const fhdShift = people.filter((person) => {
    return FHD.includes(person.login);
  });
  const wedShift = people.filter((person) => {
    return weDay.includes(person.login);
  });
  const bhdShift = people.filter((person) => {
    return BHD.includes(person.login);
  });

  // Night Shift
  const fhnShift = people.filter((person) => {
    return FHN.includes(person.login);
  });
  const weNShift = people.filter((person) => {
    return WedNight.includes(person.login);
  });
  const bhnShift = people.filter((person) => {
    return BHN.includes(person.login);
  });

  useEffect(() => {
    //for changing shift
    if (parseInt(hours) >= 7 && parseInt(hours) <= 17) {
      setDayShift(true);
      //if it is wednesday and it is dayshift then deploy onsite members
      day === "4" ? dispatch(setWed(wedShift)) : dispatch(unsetWed());
    }

    //if shift is night shift
    else {
      setDayShift(false);
      //then wednesday night shift should be deployed as available on site Member
      day === "4" && dayShift === false
        ? dispatch(setWed(weNShift))
        : dispatch(unsetWed());
    }

    const interval = setInterval(() => {
      return setCounter((prevCounter) => prevCounter + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [counter]);

  //reRendering after a sec
  useEffect(() => {
    //for deactiving the active/available or onsite user user
    if (parseInt(hours) >= 18 && parseInt(hours) <= 19) {
      return dispatch(deaActivate());
    } else if (parseInt(hours) >= 6 && parseInt(hours) <= 7) {
      return dispatch(deaActivate());
    }
    // console.log("see this", day === "4" && dayShift);
  }, [sec, dayShift]);

  if (dayShift) {
    if (day === "1" || day === "2" || day === "3") {
      return (
        <>
          {fhdShift.map((nfr) => {
            return (
              <>
                <AvailbleTeam key={nfr.id} prsn={nfr} dayShift={dayShift} />
              </>
            );
          })}
        </>
      );
    } else if (day === "4") {
      return (
        <>
          {wedShift.map((nfr) => {
            return (
              <>
                <AvailbleTeam
                  key={nfr.id}
                  prsn={nfr}
                  availableMember={weDay}
                  day={4}
                  dayShift={dayShift}
                />
              </>
            );
          })}
        </>
      );
    } else {
      return (
        <>
          {bhdShift.map((nfr) => {
            return (
              <>
                <AvailbleTeam key={nfr.id} prsn={nfr} dayShift={dayShift} />
              </>
            );
          })}
        </>
      );
    }
  } else {
    if (day === "1" || day === "2" || day === "3") {
      return (
        <>
          {fhnShift.map((nfr) => {
            return (
              <>
                <AvailbleTeam key={nfr.id} prsn={nfr} dayShift={dayShift} />
              </>
            );
          })}
        </>
      );
    } else if (day === "4") {
      return (
        <>
          {weNShift.map((nfr) => {
            return (
              <>
                <AvailbleTeam
                  key={nfr.id}
                  prsn={nfr}
                  availableMember={WedNight}
                  day={4}
                  wed={wed}
                  dayShift={dayShift}
                />
              </>
            );
          })}
        </>
      );
    } else {
      return (
        <>
          {bhnShift.map((nfr) => {
            return (
              <>
                <AvailbleTeam key={nfr.id} prsn={nfr} dayShift={dayShift} />
              </>
            );
          })}
        </>
      );
    }
  }
};

export default Time;
