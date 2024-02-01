"use client"
import { useToast } from "@/components/Toast";
import axios from "axios";
import { useParams } from "next/navigation"
import { FormEventHandler, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default () =>{
    const [currrentPassword, setCurrentPassword] = useState<string>("");
    const [confirmPassworf, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isPasswordVsisible, setIsPasswordVisible] = useState<boolean>(false);
    const params = useParams();
    const showToast = useToast();

    const send = async ()=>{

        try{
            setError("");
            if(currrentPassword != confirmPassworf){
                setError("Error passwors donot match");
                return;
            }
            const body =  {newPassword: currrentPassword, hashKey: params.hash};
            console.log(body)
            await axios.patch("https://localhost:7113/api/users/session",body);
            showToast("Password Changed!");
            window.location.href = '/login';


        }catch(e){
            showToast("Error in given values")
        }
    };
    const handleEye: FormEventHandler = (e) => {
        if (isPasswordVsisible) {
          setIsPasswordVisible(false);
          //   (passwordRef.current as unknown as {type:string}).type = 'password';
        } else {
          setIsPasswordVisible(true);
          //   (passwordRef.current as unknown as {type:string}).type = 'text';
        }
        e.preventDefault();
      };


    return (
        <div className="h-screen bg w-screen flex flex-col items-center justify-center bg-slate-100" >
            <div className="bg-slate-50 shadow-2xl flex flex-col w-1/3 h-2/4 justify-center gap-3 p-10 rounded-lg ">
                  <h1 className="text-3xl font-bold">Reset Your Password</h1>
                  <input type={  isPasswordVsisible ? 'text':  'password'} className="border-2 border-black rounded p-3" placeholder="New Password" value={currrentPassword}  onChange={(e)=> setCurrentPassword(e.target.value)}/>
                  <input type={  isPasswordVsisible ? 'text':  'password'}  className="border-2 border-black rounded p-3"  placeholder="Confirm New Password" value={confirmPassworf} onChange={e => setConfirmPassword(e.target.value)}/>
                  {error && <span className="text-red-500 text-sm italics">{error}</span>}
                  <button
                    onClick={handleEye}
                    className="w-1/7 flex flex-col justify-cetner h-2/3"
                  >
                    {isPasswordVsisible ? "Hide Password" : "Show Password"}
                   </button>
                  <button className="btn btn-success" onClick={send}>Reset Password</button>
            </div>

        </div>
    )
}