"use client"
import Link from "next/link"
export default (
    props : {
        title: string,
     
        lastMessage: string
        id: string,
        unreadCount: number
    }
)=>{
    return (
        <a href={`msg?userId=${encodeURIComponent(props.id.toString())}`} className="w-full">
            <div className="w-full flex gap-3 border-b-2 border-slate-300  hover:bg-slate-200">
                <span className="rounded-full border-2 text-2xl bg-slate-200 aspect-auto w-10 h-10 text-center">
                ET
                </span>
                <span className="flex flex-col">
                    <span className="font-bold text-2xl ">
                        {props.title}
                    </span>
                    <span className="text-sm text-black">
                        {props.lastMessage}

                    </span>
                
                </span>
                {props.unreadCount &&  <span className="rounded-full font-bold font-italic ml-auto mr-4 self-center bg-red-600 w-6 h-6 text-center">
                        {props.unreadCount}
                </span>}
                    

            </div>
        </a>
    )
}