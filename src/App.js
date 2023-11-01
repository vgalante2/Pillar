import React from "react";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs/AboutUs";
import Form from "./components/Form/Form";
import SubmissionArea from "./components/SubmissionArea/SubmissionArea";


function App() {
  return (
    <div >
      <Navbar />
      <Form />
      <SubmissionArea />
      <AboutUs/>
    </div>
  );
}

export default App;
