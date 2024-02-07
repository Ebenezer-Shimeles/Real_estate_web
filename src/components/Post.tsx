import { FaThumbsDown, FaThumbsUp } from "react-icons/fa6"
import Link from "next/link"




export default (
    props :{
        img: string,
        caption: string,
        price: string,
        ownerId: string,
        relative: string
    }

)=>{

    return (
        <div className="card w-96 bg-base-200 shadow-sm">
            <figure><img src={props.img}  className="h-[250px] w-3/4"/></figure>
            <div className="card-body">
               
                <p>{props.caption}</p>
                <p className="italic">Location: {props.relative}</p>
                <div className="card-actions justify-between">
                <div className="text-sm italic font-bold">Price: {props.price}</div>
                <div className="flex w-full justify-between gap-2">
                    
                    <button><FaThumbsUp /></button>
                  
                    <Link href={`msg?userId=${props.ownerId}`}><button className="underline text-blue-500">Chat With The Owner</button></Link>
                </div>
                
                </div>
                
            </div>
        
</div>
    )
}