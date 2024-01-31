"use client"
import Image from 'next/image'
import {useSession} from '../components/session'
import {useEffect} from 'react'
import Link from 'next/link.js'

import {FaFilter} from 'react-icons/fa6'
import Header from '@/components/Header'

export default function Home() {
  
   const {session ,isAuth, logOut} = useSession();
   
   useEffect(()=>{
      if(!isAuth){
          window.location.href = "http://localhost:3000/login"
      
      }
   
     
   }, [session, isAuth])


  
  
  return (
       <div className='h-screen w-screen flex flex-col  bg-slate-50 items-center scroll'>
           <Header />
           <main className='h-3/4 w-full flex flex-col items-center gap-5'>
               <div className='flex  w-full  justify-center gap-4'>
                   <input type = 'search' placeholder='Search For Your New Home' className='border-2  p-2 rounded-lg border-black w-1/2' />
                   <button className='text-sm'><FaFilter />  Filter</button>
                </div>
               <div className='h-4/5 w-3/4  border-black rounded-md flex flex-col'>
                   <div className='card'>Card</div>
               </div>
              
           </main>
           <button className='rounded-full text-2xl bg-green-600 text-white w-14 h-14 fixed bottom-6 right-6'>+</button>
          
       </div>
  )
  }