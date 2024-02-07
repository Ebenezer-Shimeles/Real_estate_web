"use client";
import Header from "@/components/Header";
import { useSession } from "@/components/session";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/Toast";
import { useParams } from "next/navigation";

export default () => {

  const [firstName, setFirstName] = useState<string>("-");
  const [lastName, setLastName] = useState<string>("-");
  const [profPic, setProfPic] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const showToast = useToast();
  const id = useParams().id;

  useEffect(()=>{
      (
        async ()=>{
          try{
            const res = await axios.get("https://localhost:7113/api/users/"+id);
            setFirstName(res.data.data.firstName)
            setLastName(res.data.data.lastName);
            setBio(res.data.data.bio)
   
         }catch(e){
           console.warn(e);
           showToast("Invalid user!")
         }
       }
      )();
  }, []);

 


  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-100">


      <main className="h-3/4 w-3/5 rounded-xl bg-white flex flex-col p-5 items-center gap-3 card shadow-2xl justify-center">

        <div className="rounded-full w-32 h-32 w-  text-3xl shadow-xl self-center bg-slate-400 flex justify-center items-center">
          {profPic ? (
            <img
              className="w-full h-full rounded-full"
              src={`${profPic}`}
            />
          ) : (
            <span>
              {(firstName ?? "-").charAt(0)}
              {(lastName ?? "-").charAt(0)}
            </span>
          )}
        </div>

        <div className=" flex justify-center items-center gap-2 text-sm w-1/2">
          <label className="w-1/6">First Name: </label>
         <span>{firstName}</span>
          
        </div>
        <div className=" flex justify-center items-center gap-2 text-sm w-1/2">
          <label className="w-1/6">Last Name: </label>
        <span>{lastName}</span>
          </div>
        <div className=" flex justify-center items-center gap-2 text-sm w-1/2">
          <label className="w-1/6">Bio: </label>
          <span>{bio}</span>
        
        </div>
        <Link href='/'><button className="btn btn-link">Back Home</button></Link>

      </main>
    </div>
  );
};
