"use client"
import Header from "@/components/Header"
import { useSession } from "@/components/session"
import Link from "next/link";
import { useState } from "react";
import axios from 'axios';

export default () =>{
    const {session, isAuth, recheckAuth} = useSession();
    const [newFirstName, setNewFirstName] = useState<string>(session?.firstName ?? "")
    const [newLastName, setNewLastName] = useState<string>(session?.lastName ?? "")
    const [newBio, setNewBio] = useState<string>(session?.bio ?? "")
    if(!isAuth){
        window.location.href = "/login"
    }

    const updateProfile = async () =>{
        try{
            await axios.patch('https://localhost:7113/api/users/me', {firstName: newFirstName, lastName: newLastName, bio: newBio});
            recheckAuth();
        }catch(e){

        }

    };


    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <Header />
            <main className="h-3/4 w-4/5 rounded-xl bg-slate-200 flex flex-col p-5 items-center gap-3">
                 <div className="self-end flex  gap-3">
                     <Link className="text-blue-800 underline" href='forgot_password'>I want to change my password</Link>
                     <Link className="text-red-800 underline" href='forgot_password'>Delete My Account</Link>
                 </div>
                  <div className="rounded-full w-32 h-32 w-  text-3xl shadow-xl self-center bg-slate-400 flex justify-center items-center" >
                     <span>{session && session['firstName'].charAt(0)}{ session &&session['lastName'].charAt(0)  }</span>
                     
                      
                  </div>
                  <button className="self-center underline text-blue-800">Change Photo</button>
                  <div className=" flex justify-center items-center gap-2 text-sm w-1/2">
                    <label className="w-1/6" >First Name: </label>
                    <input type = 'text' placeholder="" className=" border-2  p-2 rounded-lg border-black w-4/5"
                        value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)}
                    />
                 </div>
                 <div className=" flex justify-center items-center gap-2 text-sm w-1/2">
                    <label  className="w-1/6">Last Name: </label>
                    <input type = 'text' placeholder="" className=" border-2  p-2 rounded-lg border-black w-4/5"
                        value={newLastName} onChange={(e) => setNewLastName(e.target.value)}
                    />
                 </div>
                 <div className=" flex justify-center items-center gap-2 text-sm w-1/2">
                    <label className="w-1/6">Bio: </label>
                    <textarea  placeholder="" className=" border-2  p-2 rounded-lg border-black w-4/5"
                        value={newBio} onChange={(e) => setNewBio(e.target.value)}
                    />
                 </div>
                 <button className="btn btn-success w-14" onClick={updateProfile}>Save</button>
                
            </main>
          
           
        </div>
    )
}