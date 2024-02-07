"use client";
import Image from "next/image";
import { singalRContext, useSession } from "../components/session";
import { useEffect, useState } from "react";
import Link from "next/link.js";

import { FaFilter } from "react-icons/fa6";
import Header from "@/components/Header";
import { HubConnectionState } from "@microsoft/signalr";
import axios from "axios";
import Post from "@/components/Post";
import { useToast } from "@/components/Toast";


export default function Home() {
  const { session, isAuth, logOut } = useSession();
  const [posts, setPosts] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [page,setPage] = useState<number>(0);
  const showToast =useToast();
  const [numPages, setNumPages] = useState(10);

  useEffect(()=>{
    (
       async ()=>{
          setNumPages( Math.ceil(( ( (await axios.get("https://localhost:7113/api/posts/pages/count")).data.data))/3 ))
       }
    )()
  }, []);

  useEffect(() => {
    axios.get("https://localhost:7113/api/posts/").then(console.log).catch(console.error)
    if (!isAuth) {
      window.location.href = "http://localhost:3000/login";
    }
    if(session?.isVerified === false){
      window.location.href = '/verify'
    }
  }, [session, isAuth]);

  useEffect(()=>{
    (async ()=>{
      try{
        setPosts((await axios.get(`https://localhost:7113/api/posts?q=${query}&page=${page}&minPrice=${minValue}&maxPrice=${maxValue}`)).data.data)
      //  showToast("Welcome back")
        

      }catch(e){
        console.warn(e)
        showToast("Could not show at this time")
        
      }
    }
    )();

  },[maxValue, minValue, query,page])
  // (singalRContext?.on  )(
  //   (m:string)=>{
  //         alert("holly " + m);
  //    }
  singalRContext.useSignalREffect("newNotif", (e)=>alert('NewNotfi found'), [])
  
  function getPagination( count: number, activeCount: number){
    const buttons = []
    for(let i=0;i<count;i++){
        buttons.push(
            <button className={"join-item btn " + (i+1 == activeCount ? "btn-active" : "")}>{i+1}</button>
        )
    }
    return (
        <div className="join">
            {buttons.map(
              (btn, i)=>{
                return <button onClick={()=>setPage(i)}>{btn}</button>
              }
            )}
        </div>
    )

    }


  return (
    <div className="h-screen w-screen flex flex-col  bg-slate-50 items-center scroll">
      <Header />
      <main className="h-3/4 w-full flex flex-col items-center gap-5 justify-center">
        <div className="flex  flex-col w-full  justify-center gap-4 items-center">
          <div className="flex   w-full  justify-center gap-4 items-center">
          <input
            type="search"
            placeholder="Search For Your New Home"
            className="border-2  p-2 rounded-lg border-black w-1/2"
            onChange={e => setQuery(e.target.value)}
            
          />
          <button onClick={()=>setShowFilter(!showFilter)}><FaFilter /></button>

          </div>
        
          <div className=" w-1/7 gap-1 flex justify-center" >
            {showFilter && <input value={minValue} type='number' placeholder="Min Price" className="flex-1 border-2  p-2 rounded-lg border-black w-15"
                 onChange={e => setMinValue(Number(e.target.value))}
            />}
           {showFilter && <input value={maxValue} type='number' placeholder="Max Price" className="flex-1 border-2  p-2 rounded-lg border-black w-15"
                 onChange={e => setMaxValue(Number(e.target.value))}
             />}
        


          </div>
       
       
        </div>
        <div className="h-5/6 w-full  border-black rounded-md flex flex-wrap gap-5 overflow-y-auto bg-slate-100 p-10 ">

       {
              posts.map(
                post =>{
                  return (
                    <Post 
                       img={"https://localhost:7113/uploads/"+post.medias[0].key}
                       caption={post.caption}
                       price={post.price}
                       ownerId={post.owner.id}
                       relative={post.relativeLocation}
                    />
                  )
                }
              )
             }
        
        </div>
        {getPagination( numPages, page+1)}
      </main>
      <Link href={"create_post"}>
        <button className="rounded-full text-2xl bg-green-600 text-white w-14 h-14 fixed bottom-6 right-6">
          +
        </button>
      </Link>
    </div>
  );
}
