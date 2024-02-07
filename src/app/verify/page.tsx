"use client"
import { useToast } from "@/components/Toast";
import { useSession } from "@/components/session"
import axios from "axios";
import { useEffect, useState } from "react";

export default ()=>{
    const {session, isAuth} = useSession();
    const [vCOde, setVCode] = useState<string>("")
    const showToast = useToast();
    useEffect(()=> {
      //  console.log(session)
        if(!isAuth){
            window.location.href = "/login";
        }
        if(session.isVerified){
            window.location.href = '/';
        }

    }, []);
    const resendCode = async ()=>{
        try{
            await axios.get('https://localhost:7113/api/users/verification')
            showToast("Code Resent!")
        }catch(e){
            console.warn(e);
            showToast("Error could not resend code", false)
      
        }
       
    };
    const verifyAccount = async ()=>{
 
        try{
            await axios.post('https://localhost:7113/api/users/verification', {verificationCode: vCOde})
            showToast("Verified!")
            window.location.href = '/'
        }catch(e){
            console.warn(e);
            showToast("Wrong code given")
      
        }
    }
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <div className="rounded-lg shadow-xl w-1/3 h-3/5 bg-slate-100 flex flex-col justify-center items-center text-center">

                <h1 className="text-3xl font-bold">Verification</h1>
                <h2 className="text-md font-bold italic">Please Input the Verification code sent at {session.email}</h2>
                <input onChange={e => setVCode(e.target.value)} value={vCOde}  type='text' placeholder="Verification Code" 
                     className="text-xl mt-5 border-2 border-green-400 pl-5 pr-5 rounded-2xl p-3"/>
                <button className="btn" onClick={resendCode}>Resend Code</button>
                <button onClick={verifyAccount} className="btn btn-success p-6 text-center mt-8  flex flex-col justify-center items-center"><span>Submit</span></button>
            </div>

        </div>
    )
}