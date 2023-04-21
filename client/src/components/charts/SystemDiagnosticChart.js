import React, { useEffect, useState} from "react";
import './SystemDiagnosticChart.css';
import { BarChart, Bar, XAxis, YAxis, 
    CartesianGrid, Tooltip,Legend } from 'recharts';
import { fetch_jurisdictions, lastUsedDates, server_url } from "../common/utils";
import axios from 'axios';

const SystemDiagnosticChart = () => {
//   let jurisdictions, data;
//   fetch_jurisdictions().then(e => {
//     jurisdictions = e;
//   }
//   )
    const [jurisdictions, set_jurisdictions] = useState(null);
    var [lastUsedCounts, setLastUsedCounts] = useState(null)
    const [data, setData] = useState(null);
    const [tmpData, setTmpData] = useState(null);
    useEffect(() =>{
        if(!jurisdictions){ // fetch all distinct jurisdiction names
            fetch_jurisdictions().then(
                e => set_jurisdictions(e)
            )
        }
        if(jurisdictions){
            let tmp_jurisdiction = jurisdictions.map((jurisdiction) => (
                {
                "name": jurisdiction,
                "last_used": {
                },
                "4 days": 0,
                "7 days": 0,
                "one months": 0,
                "three months": 0,
                "six month": 0,
                "nine months": 0,
                "one year": 0
                }
                )
                )
            tmp_jurisdiction.forEach(jurisdiction => {
                fetchCountByJurisdiction(jurisdiction.name.jurisdiction).then(
                    e => {
                        e.data.forEach(entry =>{
                            // tmp_jurisdiction.last_used["SDFJSDFOI"] = 10
                            jurisdiction[entry.last_used] = entry.num
                        })
                    }
                )
                
            })
            setTmpData(tmp_jurisdiction);
            // setData(tmp_jurisdiction);
        }
    }, [jurisdictions]
    )

    const fetchCountByJurisdiction = async (jurisdiction) => {
        let res;
        try{
            res = await axios.get(`${server_url}/fetch_count_by_jurisdiction`,{
                params: {jurisdiction: jurisdiction}
            })
        }
        catch(err){
            console.log("got error", err);
        }
        finally{
            return res;
        }
    }
    const changeData = () =>{
        setData(tmpData)
    }
    return(
        <div className="SystemDiagnosticChart">
            {data ? 
            <div>

                <BarChart width={500} height={500} data={data} >
                <CartesianGrid />
                <XAxis dataKey="name.jurisdiction" interval='0' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="4 days" stackId="a" fill="violet" isAnimationActive={false} />
                <Bar dataKey="7 days" stackId="a" fill="green" isAnimationActive={false} />
                <Bar dataKey="one months" stackId="a" fill="purple" isAnimationActive={false} />
                <Bar dataKey="three months" stackId="a" fill="red" isAnimationActive={false}/>
                <Bar dataKey="six month" stackId="a" fill="aqua" isAnimationActive={false} />
                <Bar dataKey="nine months" stackId="a" fill="blue" isAnimationActive={false}/>
                <Bar dataKey="one year" stackId="a" fill="orange" isAnimationActive={false}/>
                </BarChart>
            </div> : "Loading..."}

            System Diagnostic Report<br/>
            <button onClick={changeData}>Click here if taking too long</button>

        </div>
    );
}

export default SystemDiagnosticChart;