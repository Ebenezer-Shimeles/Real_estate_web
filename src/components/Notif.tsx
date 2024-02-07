import { FaArchway, FaInfo, FaLightbulb } from "react-icons/fa6";

export default (
    props :{
        value: string,
        type:number
        isSeen: boolean
    }
)=>{
    let m = ["info", "warn", "quick"]

    let icon;

    switch(m[props.type]){
        case "info":
            icon = <FaInfo />
            break;
        case "warn":
            icon = <FaArchway/>
            break
        case "quick":
            icon = <FaLightbulb />
            break

    }
  
    return(
        <div className={"w-full flex flex-row justify-start h-9 gap-5 border-b-2"  + (props.isSeen ? "   bg-slate-100" : "bg-slate-300")}>
            <span className="flex flex-col justify-center">{icon}</span>
            <span className="flex flex-col justify-end">{props.value}</span>
            {/* <span>{props.isSeen.toString()}</span> */}


           {/* <hr /> */}
        </div>
    )

}