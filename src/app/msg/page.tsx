"use client"
import Chat from "@/components/Chat"
import ChatPage from "@/components/ChatPage"
import Header from "@/components/Header"
import { useToast } from "@/components/Toast"
import { singalRContext, useSession } from "@/components/session"
import axios from "axios"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { FaArrowLeft, FaArrowRight, FaBackward, FaBackwardStep, FaFile, FaFileCsv, FaMessage } from "react-icons/fa6"

export default ()=>{
    const fileRef = useRef(null);
    const [userId, setUserId] = useState<string | null>("");
    const [file, setFile] = useState<null | Blob>(null);
    const [messageText, setMessageText] = useState<string>("");
    const showToast = useToast();
    const {session} = useSession();
    const [chats, setChats] = useState<any[]>([]);
    const [rand, setRand] = useState(Math.random());

    useEffect(()=>{
       axios.get("https://localhost:7113/api/messages/chats")
       .then(
            (chats: any) =>{
                setChats(chats.data.data)
            }
       )
    }, [rand])
    console.log({chats})
    useEffect(()=>{
        const searchParams = new URLSearchParams(window.location.search);
        setUserId(searchParams.get("userId"));
     
      
      
    }, []);
    singalRContext.useSignalREffect("newMsg", ()=>{
        setRand(Math.random())
    }, []);
    console.log(session)

    const sendMessage = async () =>{
        try{
            const formData = new FormData();
            if(file){
                formData.append("FileContent", file);
                
            }
            if(messageText){
                formData.append("TextContent", messageText);
            }
            if((!messageText && !file ) || !userId){
                return;
            }
            formData.append('ToUserId', userId!)
            await axios.post("https://localhost:7113/api/messages", formData, {headers: {'Content-Type': 'multipart/form-data'}});

        }catch(e){
            console.warn(e);
            showToast("Cannot send Messages at this time");

        }
        finally{
            setMessageText("");
            setFile(null);
        }
       

    };

 //   console.log({userId});

    const chatList =  (
        <>
         
            <div className=" bg-slate-100 w-5/6 h-3/4 rounded-xl flex flex-col items-start gap-4 p-2">
                <h2 className="text-center self-center text-3xl font-bold">Messages</h2>
          
                {
                    chats.map(
                        chat =>{
                            return <Chat id={chat.id} lastMessage={chat.lastUnreadMessage} title={chat.name} unreadCount={chat.unreadCount} />
                        }
                    )
                }

            </div>
        </>
            

   
    );
    const messenger = (
        <div className=" bg-slate-100 w-5/6 h-3/4 rounded-xl flex flex-col items-start gap-4 p-4">
            <div className="font-bold text-2xl gap-4 w-full flex shadow-sm">
                <a href={'msg'}>
                    <button className="btn">
                        <FaArrowLeft /> 
                    </button>
                </a>
                <span className="rounded-full border-2 text-2xl bg-slate-200 aspect-auto w-10 h-10 text-center flex flex-col">
                   ET
                </span>
                <span>Ebenezer Shimeles</span>
                
            </div>

            <ChatPage userId={userId as string}/>
            
            <div className="flex w-full gap-3 ">
                <div className="flex-1 flex flex-col justify-evenly">
                    {file &&<span className="text-md font-bold">File Attached: { file.type}</span>}
                    <input className=" border-2 border-black rounded-md p-2" type='text' placeholder="Message to send"
                       value={messageText}
                       onChange={e => setMessageText(e.target.value)}
                    />
                </div>
               

                <button onClick={() => (fileRef.current as any).click()}>
                    <input 
                    accept="image/png, image/gif, image/jpeg"
                    onChange={e => setFile(   (e?.target?.files  ?? [null] ) [0] )}  type='file' className="hidden" ref={fileRef}/>
                 
                    <FaFile />

                    
                </button>
                <button className="flex gap-1 items-center bg-green-400 hover:bg-green-600 rounded-md p-2" onClick={sendMessage}>
                 
                   <FaArrowRight />
                </button>

            </div>

        </div>
    )
    return ( 
         <div className="h-screen w-screen flex flex-col justify-center items-center">
            <Header />
            {  userId ? messenger: chatList}
        </div>
    )
}