"use client"
import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";


const Toast =  (props: { msg: string; mode: boolean }) => {
  return (
    <>
      <div className="toast toast-bottom toast-center">
        {props.mode ? (
          <div className="alert alert-info">
            <span>{props.msg}</span>
          </div>
        ) : (
          <div className="alert alert-success">
            <span>{props.msg}</span>
          </div>
        )}
      </div>
    </>
  );
};


const toastContext = createContext<any>(null);


export const useToast = ()=>{
    return useContext(toastContext);
}

export default (props : {children: ReactNode}) =>{
    const [toastMessage, setToastMessage] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);


    const showToast = ( msg=  "", mode =  true, time =3000)=>{
        setToastMessage(msg);
        setIsError(mode);
        setIsVisible(true);
     
        setTimeout(()=>{
            setIsVisible(false);
            setIsError(false);
            setToastMessage("");
        },time)
    }

    return (
        <toastContext.Provider value={showToast}>
            
            {props.children}
            {isVisible && <Toast mode={!isError} msg={toastMessage}/>}
        </toastContext.Provider>
    )
    
}

