import React from "react";
import "./App.css";
import FormDisplay from "./components/FormDisplay";
import mu from "./components/mat.png";
import form from "./components/formik.png";
import yup from "./components/yup.webp";
import ts from "./components/ts.png";

function App() {
  return (
    <>
      <div className="header">
        <h1>PROJECT 10</h1>
        <img className="img" src={mu} alt="" />
        <img className="img" src={form} alt="" />
        <img className="img" src={yup} alt="" />
        <img className="img" src={ts} alt="" />
      </div>

      <FormDisplay />
    </>
  );
}

export default App;
