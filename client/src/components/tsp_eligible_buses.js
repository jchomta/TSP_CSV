import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {server_url} from "./common/utils";
import Navbar from "./Navbar";

const INACTIVE_TSP_BUS = () => {
    
  const [inactive_tsp, set_inactive_tsp] = useState(null)

    useEffect(() =>{
      const fetch_inactive_tsp = async () => {
    try{
      const res = await axios.get(`${server_url}/tsp_eligibility`)
      set_inactive_tsp(res.data)
    }
    catch(err){
      console.log("got error", err);
    }
  }
    fetch_inactive_tsp();
  }, []
  )

  return(
    <div>
    <Navbar/>
    {/* <button onClick={fetch_inactive_tsp}>Fetch Inactive TSP List</button> */}
      {inactive_tsp?    

        <div className='tsp_eligibility_table'>
        <table class="center">
          <tr>
            <th>BusID</th>
            <th>Manufacturer</th>
            <th>BT Description</th>
            <th>Garage Name</th>
          </tr>

          {inactive_tsp.map(entry => (
            <tr>
            <td>{entry.bus_id}</td>
            <td>{entry.manufacturer}</td>
            <td>{entry.BT_Description}</td>
            <td>{entry.garage_name}</td>
            </tr>
          ))}
        </table>     
        </div>

      : <p>No Buses to show</p>
      } 
    </div>
  );
}

export default INACTIVE_TSP_BUS;