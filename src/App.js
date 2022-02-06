import React, { useState, useEffect } from "react";
import data from "./data";
import Team from "./Team";
import Mgr from "./Mgr";
import Time from "./Time";
import CountDownTimer from "./CountDownTimer";
import AvailbleTeam from "./availableTeam";
import Footer from "./Footer";
import opsIt from "../src/imgs/opsIT.jpg";
// import yvr2It from "../src/imgs/yvr2It.png";

import Moment from "react-moment";
import "moment-timezone";
import moment from "moment-timezone";

const schedule = require("node-schedule");

function App() {
  const [people, setPeople] = useState(data);

  return (
    <section className="sec">
      <article className="title">
        <h1>IT Team</h1>
        <img className="opsImg" src={opsIt} alt="" />
      </article>

      <div>
        <div className=" mgr">
          <Mgr people={people} />
        </div>
        <div className="team">
          <Team people={people} />
        </div>
      </div>
      <section className="countDown-timer">
        <CountDownTimer />
      </section>

      <section className="container3">
        <div className="main">
          <article className="schedule">
            <div>
              <h2 style={{ color: "yellow" }}>Available Team Members</h2>
            </div>
            <div className="shiftTime">
              <Time people={people} />
            </div>
          </article>
        </div>

        <div className="footer">
          <Footer />
        </div>
      </section>
    </section>
  );
}

export default App;
