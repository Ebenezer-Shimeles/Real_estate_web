import Link from "next/link"

export default ()=>{
    return (
        <>
          

            <div className="h-screen w-screen flex flex-col justify-center items-center gap-10 z-10  bg-transparent fixed font-bold
                        
            "
              
            >
                <div className="text-3xl font-bold md:text-5xl text-slate-950">
                    <h1>Welcome to Rise Properties</h1>
                </div>
                <div>
                    <h2>We help you get into your dream home.</h2>
                </div>
                <div className="flex gap-4 flex-col md:flex-row ">
                    <button className="btn btn-info text-sm min-w-1">Browse Catalogue</button>
                    <Link href='/login'><button className="btn btn-success text-sm min-w-1">Register</button></Link>
                </div>
            </div> 
            <div className="z-1 w-screen h-screen fixed bottom-0 right-0  min-h-full min-w-full bg-green-100">
                <video  className="w-screen h-screen z-1 min-h-full min-w-full"    autoPlay muted loop style={{minWidth: "100vw", minHeight: '100vh'}}>
                    <source src='https://localhost:7113/bg.mp4'></source>
                </video>

            </div>
        </>
    )
}