import React from "react";
import "./Byebye.css";
import DoneAllIcon from "@material-ui/icons/DoneAll";
const Byeby = ({ data }: any) => {
  console.log(data, "data");
  return (
    <div className="byebye">
      <div className="donediv">
        <DoneAllIcon />
      </div>
      <h2>Great!! The account with the following info has been created</h2>
      <p>
        <strong className="info">First Name:</strong> {data.firstName}
      </p>
      <p>
        <strong className="info">Last Name:</strong> {data.lastName}
      </p>
      <p>
        <strong className="info"> Age:</strong> {data.age}
      </p>
      <p>
        <strong className="info">Email:</strong> {data.email}
      </p>
      <p className="flex">
        <strong className="info">Subject:</strong>{" "}
        {data.Subject?.map((arr: string, i: number) => {
          return <div key={i}>{arr}</div>;
        })}
      </p>
    </div>
  );
};

export default Byeby;
