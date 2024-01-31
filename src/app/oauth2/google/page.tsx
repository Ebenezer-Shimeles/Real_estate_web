"use client"

import { useEffect } from "react";
import axios from 'axios'

export default () =>{
  
    useEffect(()=>{
        axios.defaults.withCredentials = true;
           
        const searchParams = new URLSearchParams(window.location.hash.split('#')[1])
        const token = searchParams.get('access_token');
        const body = {accessToken:token}
  
     
        axios.post('https://localhost:7113/api/users/session_google', body).then(
            () =>{
                window.location.href = "http://localhost:3000"
            }
        ).catch(console.warn)





        
    }, [])
    
    return <div className="h-screen w-screen text-center flex flex-col justify-center items-center">
        <span className="text-3xl ">Loading Please Wait</span>
    </div>
}