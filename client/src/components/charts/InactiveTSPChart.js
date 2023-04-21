import React, { useEffect, useState} from "react";
import { BarChart, Bar, XAxis, YAxis, 
    CartesianGrid, Tooltip,Legend } from 'recharts';
import axios from 'axios';
import {server_url} from '../common/utils'
const InactiveTSPChart = () => {
    const [inactive_count, set_inactive_count] = useState(null)
    useEffect(() => {
        const tsp_eligibility_distinct_garage_name = async () =>{
            try{
                const res = await axios.get(`${server_url}/tsp_eligibility-distinct_garage_name`)
                return res.data;
            }
            catch(err){
                console.log("got error in tsp_eligibility_distinct_garage_name", err)
            }
        }
        if(!inactive_count){
        tsp_eligibility_distinct_garage_name().then(e=>{
            console.log(e)
            set_inactive_count(e)
        })
        }

    }, [inactive_count])

    return(
        <div className="InactiveTSPChart">
            <BarChart width={500} height={500} data={inactive_count}>
            <CartesianGrid />
            <XAxis dataKey="garage_name" interval='0' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" stackId="a" fill="aqua" isAnimationActive={false} />

            </BarChart>
            Inactive TSP By Garage<br/>
        </div>
    );
}

export default InactiveTSPChart;