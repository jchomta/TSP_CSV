import React from "react";
import Navbar from "../Navbar";
import './HomePage.css';
import SystemDiagnosticChart from "../charts/SystemDiagnosticChart";
import InactiveTSPChart from "../charts/InactiveTSPChart";

const HomePage = () => {
  return(
    <div>
      <Navbar/>
      <SystemDiagnosticChart/>
      <InactiveTSPChart/>
    </div>
  );
}

export default HomePage;