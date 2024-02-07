"use client"

import Header from "@/components/Header"
import { useToast } from "@/components/Toast";
import axios from "axios";
import { DragEventHandler, FormEventHandler, useRef, useState } from "react"

export default ()=>{
    const [files, setFiles] = useState<Blob[]>([]);
    const [posLong, setPosLong] = useState<string>("0.00");
    const [postLat, setPostLat] = useState<string>("0.00");
    const [caption, setCaption] = useState<string>("");
    const [price, setPrice] = useState<null | number>(null);
    const [relativeLocation, setRelativeLocation] = useState<string>("");


    const fileRef = useRef(null)
    const showToast = useToast();

    const handleSend: FormEventHandler = async (e)=>{
        
        e.preventDefault();
        /**
         *  [Required]
        public string Caption{get; set;}

        [Required]
        public string PosLat{get; set;}

        [Required]
        public string PosLong{get; set;}

        [Required]
        public string RelativeLocation{get; set;}
        [Required]
        public List<IFormFile> Medias{get;set;}

        [Required]

        public decimal Price {get;set;}
         */
        try{
            const formData = new FormData();
            formData.append("Caption", caption);
            formData.append("PosLat", postLat);
            formData.append("PosLong", posLong);
            formData.append("RelativeLocation", relativeLocation);
            // formData.append("Medias", files);
            for(const file of files){
                formData.append("Medias", file);
            }
            formData.append("Price", price?.toString() as string);
            await axios.post("https://localhost:7113/api/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            showToast("Done")
            window.location.href = "/"

        }catch(e){
            console.warn(e);
            showToast("Could not post now!")
        }

    }
    const onDrag : DragEventHandler= (e) =>{
        e.preventDefault();
        if(e.dataTransfer.items){
            const files: Blob[] = []
            for(const data of Array.from(e.dataTransfer.items)){
                if(data.type == "file"){
                    files.push(data.getAsFile() as Blob)
                }
            }
            setFiles(files)
        }
    };
    const onDragStop : DragEventHandler= (e) =>{
        e.preventDefault();
    }
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
           <Header/>
           <div className="h-3/4 w-3/5 rounded-xl bg-white flex flex-col p-5 items-center gap-3 card">
               <form onSubmit={handleSend} className="flex flex-col justify-center gap-3 w-full h-full items-center">
                   
                   <div className="h-1/2 w-3/5 bg-slate-100 flex justify-center flex-col items-center"
                      onDragOver={onDragStop} 
                      onDrop={onDrag}

                   
                   >
                  {files.length && <span>{files.length} File Ready to be uploaded</span>}
                <input required onChange={e => setFiles(e.target.files as unknown as Blob[])} 
                     accept="image/png, image/gif, image/jpeg"
                ref={fileRef} type='file' className="hidden w-full h-full"/>
                        Drag Files Here On <button  onClick={(e)=>{ e.preventDefault(); (fileRef.current as any).click();}}  className="text-blue-500 underline">Click</button>
                   </div>
                   <div className="flex gap-3 ">
                      <input required type='text' placeholder="Latittude" className="border-2 border-black p-2 rounded-xl" 
                         onChange={e => setPosLong(e.target.value)}
                      />
                      <input required type='text' placeholder="Longitute" className="border-2 border-black p-2 rounded-xl"
                           onChange={e => setPostLat(e.target.value)}
                      />

                   </div>
                   <input required type='text' placeholder="Relative Location" className="border-2 border-black p-2 rounded-xl" 
                       onChange={e => setRelativeLocation(e.target.value)}
                   />
                   <input required type="text" placeholder="Caption Content" className="border-2 border-black p-2 rounded-xl"
                       onChange={e => setCaption(e.target.value)}
                   />
                   <input required type='number' placeholder="Price" className="border-2 border-black p-2 rounded-xl"
                         onChange={e => setPrice(Number(e.target.value))}
                   />
                   <button className="btn btn-success">Send</button>
               </form>
 
           </div>
        </div>
    )

}