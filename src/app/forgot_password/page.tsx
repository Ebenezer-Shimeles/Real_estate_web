"use client"

import { useToast } from "@/components/Toast";
import axios from "axios";
import Link from "next/link"
import { useState } from "react"
export default ()=>{
    const [email, setEmail] = useState<string>("");
    const showToast = useToast();

    const sendRequest = async () =>{
        
        await axios.put("https://localhost:7113/api/users/Session", {email});
        showToast("Link sent to your email address")
        
  

    }
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl shadow-lg bg-indigo-50 w-1/2 h-3/4">
                <img src='pwd.png' className="avatar rounded-full"/>
                <h1 className="text-2xl font-bold mb-7">Change Password</h1>
                <input type='email' placeholder="Your Email Address" className="border-2 border-black p-3 rounded-lg" value ={email} onChange={e => setEmail(e.target.value)}/>
                
                <input type="button" className="btn btn-success" value="Send Change Password Link" onClick={sendRequest}/>

                <Link href='/login'><button className='btn'>Back</button></Link>
            </div>

        </div>
    )
}