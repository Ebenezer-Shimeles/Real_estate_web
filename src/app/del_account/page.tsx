"use client"
import { useToast } from "@/components/Toast";
import { useSession } from "@/components/session"
import axios from "axios";
import Link from "next/link";
import { ChangeEventHandler, KeyboardEventHandler, useEffect, useRef, useState } from "react";

export default () =>{
    const {logOut, isAuth, recheckAuth} = useSession();
    const inputKey= useRef("");
    const showToast = useToast();
    const [key, setKey] = useState("");
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    

    useEffect(()=>{
        if(!isAuth){
            window.location.href = "http://localhost:3000/login"
        }
        const key = (Number(Math.random().toString().substring(0, 5)) * 1000).toFixed(0).toString();
        setKey(key);
    }, []);
    const strokeListener : ChangeEventHandler= (e) =>{
        inputKey.current =  ((e.target as any).value);
        console.log(key, inputKey)
        if(inputKey.current === key){
            setIsDisabled(false);
        }else{
            setIsDisabled(true);
        }

    }

    const deleteAccount = async ()=>{
        try{
            axios.defaults.withCredentials = true;
         
            await axios.delete("https://localhost:7113/api/users/account");
            await logOut();
            showToast("Account Deleted :(");
          
   

            
           
        }catch(e){
            if((e as any).name == 'NetworkError'){
                showToast("No internet :(")
            }
            else{
                showToast("Could not delete at this time")
            }
        }

        window.location.reload()
    };
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="w-1/2 bg-white h-3/4 rounded-2xl flex flex-col items-center justify-center gap-3">
                <img src='cry.jpeg'/>
                <h1 className="text-3xl font-bold">Delete Account</h1>
                <span>Enter key to delete account</span>
                <span>Key: {key}</span>
                <input  type='text' onChange={strokeListener} placeholder="Enter Key" className="p-6 rounded-lg border-2 text-xl" />
                <input type='button' className="btn btn-error" value='Delete Account' disabled={isDisabled} onClick={deleteAccount}/>
                <Link href='/'><button className="btn btn-success">Back To Home</button></Link>

            </div>
        </div>
    )
}
