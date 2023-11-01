import React from "react";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import Form from "./components/Form";
import SubmissionArea from "./components/SubmissionArea";


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
