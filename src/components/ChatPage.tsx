"use client"

import { useEffect, useRef, useState } from "react";
import { singalRContext, useSession } from "./session";
import axios from "axios";

export default (props: {userId: string})=>{
    const [messages, setMessages] = useState<any[]>([]);
    const [rand, setRand] = useState(Math.random());
    const [isLoading, setIsLoading]= useState<boolean>(false);
    const [oldesMessageId, setOlderMessageId] = useState();
    const lastMessageId = useRef(200_000);
    const [lastScrollDir, setLastScrollDir] = useState(0);
    const [isInit, setIsInit] = useState<boolean>(true);
    const scrollBottom = ()=>{
        // const elem =  document.getElementById('msgs');
        // if(!elem){
        //     console.warn('could not find msgs')
        //     return;
        // }
        // elem.scroll(0,  1000_000);
        // setLastScrollDir(1000_000);
        // setIsInit(false);
    };
    const {session} = useSession();

    const fetchUnreadMessages = async ()=>{
        setIsLoading(true);
        try{
            if(!props.userId){
                return;
            }
            const newMessages = await axios.get(`https://localhost:7113/api/messages/chats/${props.userId}/messages/unread`);
            console.log({newMessages})
            setMessages([...(newMessages.data.data), ...messages]);
          
            await axios.delete(`https://localhost:7113/api/messages/chats/${props.userId}/messages`);
            scrollBottom();

        }catch(e){

        }
        setIsLoading(false);

    };

    const fetchMessagesSince = async () =>{
        setIsLoading(true);
        console.log("Since =", lastMessageId.current);
        try{
            const messagesRw = (await axios.get(`https://localhost:7113/api/messages/chats/${props.userId}/messages?since=${lastMessageId.current}`)).data.data;
            for(const msg of messagesRw){
                //console.log("Comparing Id ", msg.messageData.id)
                const m = Math.min(lastMessageId.current, msg.messageData.id);
                lastMessageId.current = m;
                //console.log("max Id ", m, msg.messageData.id, " vs ", lastMessageId)
            
            }
            //console.log("Last Message Id ", lastMessageId)
            setMessages([  ...messages,...messagesRw]);
            //messages.sort((m1, m2) => m1.sentAt - m2.sentAt)
            await axios.delete(`https://localhost:7113/api/messages/chats/${props.userId}/messages`);
        }catch(e){
            console.warn(e);
        }
        setIsLoading(false)

    };

    useEffect(()=>{
       
        
        
     
       
        fetchMessagesSince()
        
        

    }, [])

    
    singalRContext.useSignalREffect("newMsg", ()=>{
        const audio = new Audio("new_msg.mp3");
        try{
             audio.play();

        }catch(e){

        }
       
        fetchUnreadMessages();
    }, []);
    
    return(
        <div className="bg-slate-200 mt-auto mb-auto w-full h-5/6 overflow-y-auto relative  flex flex-col-reverse" id='msgs'
           onScroll={(e) =>{
               e.preventDefault()
               
               const diff = e.currentTarget.scrollTop - lastScrollDir;
               
              // console.log(diff, e.currentTarget)
               if(diff > 10){
                //  console.log('up')
                return;
               } else{
                // console.log('down')
                fetchMessagesSince();
               }
               setLastScrollDir(e.currentTarget.scrollTop)
           }}
        >
            {isLoading && <div className="radial-progress">Loading</div>}
            {
                messages.length == 0 ? <span className="text-2xl self-center mb-auto mt-auto">No messages :(</span> : <></>
            }
              
           {messages.map(
             

              (msgData, i) =>{
              
                const msg = msgData.messageData;
               
   
          
                return(
                    <div className={"chat " + (msgData.isFromMe ? "chat-start": "chat-end")}>
                        <div className={"chat-bubble  text-white font-bold flex flex-col" + (msgData.isFromMe ? " bg-blue-500": " bg-black")} >
                            {msg.mediaContent && <img src={`https://localhost:7113/uploads/${msg.mediaContent.key}`}  className="w-20 h-20"/>}
                            {msg.textContent}
                           <span className="text-xs text-slate-100 italic">{msg.sentAt.substring(0, 10)}</span> 
                        </div>
                      
                    </div>
                )
              }

           )}
  

       </div>
    )
}