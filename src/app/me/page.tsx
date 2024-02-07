"use client";
import Header from "@/components/Header";
import { useSession } from "@/components/session";
import Link from "next/link";
import { useRef, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/Toast";

export default () => {
  const { session, isAuth, recheckAuth } = useSession();

  const [newFirstName, setNewFirstName] = useState<string>(
    session?.firstName ?? "",
  );
  const [newLastName, setNewLastName] = useState<string>(
    session?.lastName ?? "",
  );
  const [newBio, setNewBio] = useState<string>(session?.bio ?? "");
  const [file, setFile] = useState<Blob | undefined | null>();
  const showToast = useToast();
  const fileRef = useRef<any>(null);
  if (!isAuth) {
    window.location.href = "/login";
  }
  if(session?.isVerified === false){
    window.location.href = '/verify'
  }

  const updateProfile = async () => {
    try {
      const formData = new FormData();

      if (file) {
        formData.append("FileName", "nothing.txt");
        formData.append("FormFile", file as Blob);
        const response = await axios.post(
          "https://localhost:7113/api/users/me/picture",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        console.log({ response });
      } else {
        console.log("No files found!");
      }

      await axios.patch("https://localhost:7113/api/users/me", {
        firstName: newFirstName,
        lastName: newLastName,
        bio: newBio,
      });
      recheckAuth();
      setTimeout(()=>{
        
          showToast( "Updated!");
         
      

      }, 2000)
     
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <input
        ref={fileRef}
        type="file"
        onChange={(e) => setFile(Array.from(e.target.files ?? [null])[0])}
        className="hidden"
      />
      <Header />
      <main className="h-3/4 w-3/5 rounded-xl bg-white flex flex-col p-5 items-center gap-3 card">
        <div className="self-end flex  gap-3">
          <Link className="text-blue-800 underline" href="forgot_password">
            I want to change my password
          </Link>
          <Link className="text-red-800 underline" href="del_account">
            Delete My Account
          </Link>
        </div>
        <div className="rounded-full w-32 h-32 w-  text-3xl shadow-xl self-center bg-slate-400 flex justify-center items-center">
          {session?.profileUrl ? (
            <img
              className="w-full h-full rounded-full"
              src={`${session.profileUrl}`}
            />
          ) : (
            <span>
              {session && session["firstName"].charAt(0)}
              {session && session["lastName"].charAt(0)}
            </span>
          )}
        </div>
        <button
          className="self-center underline text-blue-800"
          onClick={() => fileRef.current?.click()}
        >
          Change Photo
        </button>
        <div className=" flex justify-center items-center gap-2 text-sm w-1/2">
          <label className="w-1/6">First Name: </label>
          <input
            type="text"
            placeholder=""
            className=" border-2  p-2 rounded-lg border-black w-4/5"
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
          />
        </div>
        <div className=" flex justify-center items-center gap-2 text-sm w-1/2">
          <label className="w-1/6">Last Name: </label>
          <input
            type="text"
            placeholder=""
            className=" border-2  p-2 rounded-lg border-black w-4/5"
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
          />
        </div>
        <div className=" flex justify-center items-center gap-2 text-sm w-1/2">
          <label className="w-1/6">Bio: </label>
          <textarea
            placeholder=""
            className=" border-2  p-2 rounded-lg border-black w-4/5"
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
          />
        </div>
        <button className="btn btn-success w-12" onClick={updateProfile}>
          Save
        </button>
        <Link href={`/profile/${session.id}`} className="btn btn-link">See outside view</Link>
      </main>
    </div>
  );
};
