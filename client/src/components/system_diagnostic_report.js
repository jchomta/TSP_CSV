import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {server_url} from "./common/utils";
import Navbar from "./Navbar";

const SYSTEM_DIAGNOSTIC = () => {
  var last_used = "4 days";

  const [system_diagnostic, set_system_diagnostic] = useState(null)
  const [jurisdictions, set_jurisdictions] = useState(null)
  const fetch_jurisdictions = async () => {
    try{
      const res = await axios.get(`${server_url}/distinct_jurisdictions`)
      set_jurisdictions(res.data)
      console.log(res.data)
    }
    catch(err){
      console.log("got error", err);
    }
  
  }
  const fetch_system_diagnostic_report = async () => {
    try{
      console.log("GOT HERE", last_used)
      const res = await axios.get(`${server_url}/system_diagnostic_report`,
      {
        params: {last_used: last_used}
      })
      set_system_diagnostic(res.data)
      console.log(res.data)
    }
    catch(err){
      console.log("got error", err);
    }
  }
  const selectTimeRange = (e) =>{
    last_used = e.target.value;
    fetch_system_diagnostic_report();
  }


  return(
    <div>
    <Navbar/>
    {/* <button onClick={fetch_jurisdictions}>Fetch jurisdiction</button> */}

       <select onChange={selectTimeRange}>
       <option value="Select Time Range">Select Time Range</option>
       <option value="4 days">4 days</option>
       <option value="7 days">7 days</option>

       <option value="one months">one months</option>
      <option value="three months">three months</option>
       <option value="six month">six month</option>
       <option value="nine months">nine months</option>
       <option value="one year">one year</option>
     </select>


    {/* <button onClick={fetch_system_diagnostic_report}>Fetch System Diagnostic Report</button> */}
      {system_diagnostic?    

        <div className='system_diagnostic_table'>
        <table class="center">
          <tr>
            <th>vehicleId</th>
            <th>jurisdiction</th>
          </tr>
          {system_diagnostic.map(entry => (
            <tr>
            <td>{entry.vehicleId}</td>
            <td>{entry.jurisdiction}</td>
            </tr>
          ))}
        </table>     
        </div>

      : <p>No buses to show</p>
      } 
    </div>
  );
}

export default SYSTEM_DIAGNOSTIC;