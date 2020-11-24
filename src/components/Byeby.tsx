import React from "react";
import "./Byebye.css";

const Byeby = ({ data }: any) => {
  console.log(data, "data");
  return (
    <div>
      <h1>Great!! The account with the following info has been created</h1>
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
      <p>
        <strong className="info">Subject:</strong>{" "}
        {data.Subject?.map((arr: string, i: number) => {
          return <div key={i}>{arr}</div>;
        })}
      </p>
    </div>
  );
};

export default Byeby;
