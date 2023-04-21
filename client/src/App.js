import './App.css';
import React, { useEffect, useState} from 'react';
// import { response } from 'express';
// import NavBar from "./components/navbar"
import {BrowserRouter, Routes, Route} from "react-router-dom";
// import { Nav } from './components/NavbarElements';
import Scrap from './components/scrap_buses';
import HomePage from './components/HomePage/HomePage';
import INACTIVE_TSP_BUS from './components/tsp_eligible_buses';
import SYSTEM_DIAGNOSTIC from './components/system_diagnostic_report';
function App() {

  var server_url = "http://localhost:3001"
  const [data, setData] = useState(null)
  const [system_diagnostic_report, set_system_diagnostic_report] = useState(null)

  // useEffect(() =>{
  //   const fetchAll = async () => {
  //     try{
  //       const res = await axios.get(`${server_url}/api`)
  //       setData(res.data)
  //     }
  //     catch(err){
  //       console.log("Got error")
  //       console.log(err)
  //     }
  //   }
  //   fetchAll();
  // }, []
  // )

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/system_diagnostic" element={<SYSTEM_DIAGNOSTIC/>}></Route>
          <Route path="/scrap" element={<Scrap/>}></Route>
          <Route path="/inactive_TSP" element={<INACTIVE_TSP_BUS/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
