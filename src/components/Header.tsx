"use client";
import {
  FaPerson,
  FaDoorOpen,
  FaOilWell,
  FaBell,
  FaMessage,
  FaChartBar,
  FaBookmark,
  FaHouse,
} from "react-icons/fa6";
import Link from "next/link";
import { singalRContext, useSession } from "./session";
import { useEffect, useState } from "react";
import axios from "axios";
export default () => {

  const { logOut } = useSession();
  const [notifCount, setNotifCount] = useState<number>(0)
  const [randHolder, setRandHolder] = useState(Math.random());
  const [msgCount, setMsgCount] = useState<number>(0);

  singalRContext.useSignalREffect("newNotif", ()=>{
        setRandHolder(Math.random())
  }, []);
  singalRContext.useSignalREffect("newMsg", ()=>{
    setRandHolder(Math.random())
}, []);
  useEffect(()=>{
    (
       async ()=>{
           const res = (await axios.get("https://localhost:7113/api/notifications/unread/count")).data.data;
           setNotifCount(res);
           const msgCountRes = (await axios.get("https://localhost:7113/api/messages/count")).data.data;
           setMsgCount(msgCountRes)
           

       }


    )()


  }, [randHolder])

  return (
    <header
      id="btns"
      className="flex w-full justify-end gap-3 mr-3 h-1/6 mt-3 text-sm overflow-x-scroll"
    >
      <Link href="/">
        {" "}
        <button className="btn">
          {" "}
          <FaHouse /> <span className="hidden md:block text-sm">Home</span>
        </button>
      </Link>
      <button className="btn">
        <FaOilWell />{" "}
        <span className="hidden md:block text-sm">My Properties</span>
      </button>
      {/* <button className="btn">
        <FaBookmark />{" "}
        <span className="hidden md:block text-sm">Bookmarks</span>
      </button> */}
      <Link href='/msg'>
        <button className="btn">
          <FaMessage /> <span className="hidden md:block text-sm">Messages
         
          
          </span>
          {msgCount && <span className="
          avatar bg-red-600 rounded-full text-white font-bold p-1 aspect-square text-center flex flex-col justify-center items-center">{msgCount}</span>}
        </button>
      </Link>
    
      <Link href={'/notifs'}>
        <button className="btn">
          <FaBell /> 
          <span className="hidden md:block text-sm">
            Nofication
            </span>
          {notifCount && <span className="
          avatar bg-red-600 rounded-full text-white font-bold p-1 aspect-square text-center flex flex-col justify-center items-center">{notifCount}</span>}
        </button>
      </Link>
      <Link href="/me">
        {" "}
        <button className="btn">
          <FaPerson /> <span className="hidden md:block text-sm">Profile</span>
        </button>
      </Link>
      <button className="btn">
        <FaChartBar /> <span className="hidden md:block text-sm">Admin</span>
      </button>

      <button className="btn text-red-700" onClick={logOut}>
        <FaDoorOpen />
        <span className="hidden md:block">Logout</span>
      </button>
    </header>
  );
};
