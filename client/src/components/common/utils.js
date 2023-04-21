import React, { useEffect, useState} from 'react';
import axios from 'axios';

export const server_url = "http://localhost:2000"



export const fetch_jurisdictions = async () => {
    try{
    const res = await axios.get(`${server_url}/distinct_jurisdictions`)
    return res.data;
}
    catch(err){
      console.log("got error", err);
    }
  }

export const fetch_tsp_eligibility = async () =>{
  try{
    const res = await axios.get(`${server_url}/tsp_eligibility`)
    return res.data;
  }
  catch(err){
    console.log("got error in fetch_tsp_eligibility", err)
  }
}

export const tsp_eligibility_distinct_garage_name = async () =>{
  try{
    const res = await axios.get(`${server_url}/tsp_eligibility-distinct_garage_name`)
    return res.data;
  }
  catch(err){
    console.log("got error in tsp_eligibility_distinct_garage_name", err)
  }
}

export const lastUsedDates = ["4 days", "7 days", "one months", "three months", "six month", "nine months", "one year"]
