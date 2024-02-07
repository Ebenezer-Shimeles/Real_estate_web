"use client"

import Header from "@/components/Header"
import Notif from "@/components/Notif"
import { singalRContext } from "@/components/session"
import axios from "axios"
import { useEffect, useState } from "react"

export default ()=>{
    const [randHolder, setRandHolder] = useState(Math.random())
    const [notifs, setNotifs] = useState<any[]>([]);
    singalRContext.useSignalREffect("newNotif", ()=>{
          setRandHolder(Math.random())
    }, [])
    useEffect(()=>{
        (
           async ()=>{
              const res = await axios.get("https://localhost:7113/api/notifications");
              const rawNotifs = res.data.data;
       
              console.log(rawNotifs)
              setNotifs(rawNotifs)
             await axios.delete("https://localhost:7113/api/notifications/validation");
          }



        )()

    }, [randHolder]);
    return (
        <div className="h-screen w-screen flex flex-col justify-start items-center">
            <Header/>
            <div className="bg-slate-100 rounded-xl w-3/4 h-3/4 flex flex-col p-8 overflow-y-auto gap-2">
            {
                notifs.map
                (
                    notif =>{
                        console.log({notif})
                        return  <Notif value={notif.value} isSeen={notif.isseen} type={notif.type}/>
                    }
                )
            }
            </div>
     
        </div>
    )

}