import React from "react";
import { selectActive, selectWed } from "./features/userSlice";
import { useSelector } from "react-redux";
const Team = ({ people }) => {
  const active = useSelector(selectActive);
  const wed = useSelector(selectWed);

  //Team members without manager
  const newPeople = people.filter((person) => {
    return person.login !== "bppeders";
  });

  return (
    <>
      {/* Loop through the team members and find those active/available/onsite members */}
      {newPeople.map((person) => {
        const { id, name, login, image } = person;

        //Assign onsite members that are in the array
        let onSiteMembers = null;
        wed.forEach((member) => {
          if (member.login === login) {
            onSiteMembers = member;
          }
        });

        //once we find that there are onsite members then we should make it conditional.
        //active is for a single members during the day/night, onSiteMembers are a group of available members day/night which only happens on wednesday
        return active === login || onSiteMembers ? (
          <article key={id} className="person ">
            <div className="availableUserSign"></div>
            <img className="availableUser" src={image} alt={name} />
            <div className="personDiv">
              <h4>{name}</h4>
              <h4 style={{ color: "yellow", marginTop: "5px" }}>on-site</h4>
            </div>
          </article>
        ) : (
          <article key={id} className="person">
            <img src={image} alt={name} />
            <div className="personDiv">
              <h4>{name}</h4>
              <h4 style={{ color: "red", marginTop: "5px" }}>Off-site</h4>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default Team;
