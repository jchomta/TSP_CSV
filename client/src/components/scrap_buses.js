import React, { useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import Navbar from "./Navbar";
import {server_url} from "./common/utils";
const Scrap = () => {
    
  const [scrap_buses, set_scrap_buses] = useState(null)
    useEffect(() =>{
    const fetch_scrap_buses = async () => {
      try{
        const res = await axios.get(`${server_url}/scrap_buses`,  
        {params: {
          product: "prodSKLDJFLKSDFKLSJDLFKJSDL:KFJ:LSKDJFKL:SDJF:LKSDJF:KLSDJF:LKSDKFJSDKLJFHSDKLJFuct"
        }
        }
        )
        set_scrap_buses(res.data)
        console.log(res.data)
      }
      catch(err){
        console.log("got error", err);
      }
  }
    fetch_scrap_buses();
  }, []
  )


  return(
    <div>
    <Navbar/>
    {/* <button onClick={fetch_scrap_buses}>Fetch scrap_buses</button> */}
      {scrap_buses?   

        <div className='scrap_table'>
        <table className="center">
          <tr>
            <th>deviceId</th>
            <th>deviceName</th>
            <th>createdDateTime</th>
            <th>agencyName</th>
            <th>vehicleName</th>
          </tr>

          {scrap_buses.map(entry => (
            <tr>
            <td>{entry.deviceId}</td>
            <td>{entry.deviceName}</td>
            <td>{entry.createdDateTime}</td>
            <td>{entry.agencyName}</td>
            <td>{entry.vehicleName}</td>
            </tr>
          ))}
        </table>     
        </div>

      : <p>No scrap_buses</p>
      } 
    </div>
  );
}

export default Scrap;