"use client";
import { FormEventHandler, useRef, useState } from "react";
import { useMutation, useQueries } from "react-query";
import axios from "axios";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleOneTapLogin,
} from "@react-oauth/google";
import Link from "next/link";
import { useEffect } from "react";

import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import { oauthSignIn, useSession } from "../../components/session";

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */

export default function LoginPage() {
  const { session, isAuth, logOut } = useSession();

  useEffect(() => {
    if (isAuth) {
      window.location.href = "http://localhost:3000/";
    }
  }, [isAuth, session]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const root = "https://localhost:7113";

  const [error, setError] = useState<string>("");
  const [isPasswordVsisible, setIsPasswordVisible] = useState<boolean>(true);
  const handleEye: FormEventHandler = (e) => {
    if (isPasswordVsisible) {
      setIsPasswordVisible(false);
      //   (passwordRef.current as unknown as {type:string}).type = 'password';
    } else {
      setIsPasswordVisible(true);
      //   (passwordRef.current as unknown as {type:string}).type = 'text';
    }
    e.preventDefault();
  };

  const handleSend: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;

      const response = await axios.post(root + "/api/users/session", {
        Email: email,
        Password: password,
      });

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (e) {
      console.warn(e);
      if ((e as Error).name == "NetworkError") {
        setError("No Internet Connection :(");
      } else {
        setError("Error in Credentials Given!");
      }
    }
    //
  };
  //window.open('https://accounts.google.com/gsi/select?client_id=193639341386-68nab82oon15r56pv202rarc7hnl8lt8.apps.googleusercontent.com&ux_mode=popup&ui_mode=card&as=A4oTI4SYhJDek3U1deakdQ&channel_id=b973c9d905278f7e5394ea91a69ff8ff6e555c8fecfc76da730c383bb2885881&origin=http%3A%2F%2Flocalhost%3A3000')
  return (
    <div className="h-screen w-screen flex flex-row justify-center items-center bg-slate-50">
      <form
        onSubmit={handleSend}
        className="flex flex-col sm:w-full md:w-1/3   h-3/5 rounded-2xl justify-center gap-2 items-center"
      >
        <h2 className="text-lg font-medium mb-8 ">Sign Into Your Account</h2>
        <input
          type="email"
          placeholder="Email Address"
          className="rounded-lg p-1 bg-white border-2 border-black w-3/4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="w-full flex justify-center items-center ml-7 gap-4 ">
          <input
            type={!isPasswordVsisible ? "text" : "password"}
            placeholder="Password"
            className="rounded-lg p-1 bg-white border-2 border-black mb-7 w-3/4 self-center"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleEye}
            className="w-1/7 flex flex-col justify-cetner h-2/3"
          >
            {isPasswordVsisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {error && <label className="text-red-700 text-sm">{error}</label>}
        <button className="bg-green-500 text-white mb-20 pl-20 pr-20 pt-2 pb-2 rounded-xl font-bold hover:bg-green-600">
          Submit
        </button>
        <p className="mb-10 text-sm">
          {" "}
          Don't have an account?{" "}
          <Link className="underline text-blue-500" href={"signup"}>
            Signup
          </Link>
        </p>
        <button
          onClick={(e) => {
            e.preventDefault();
            oauthSignIn();
          }}
          className="flex justify-between items-center gap-2 border-black border-2 p-2 rounded-lg font-bold hover:bg-slate-200"
        >
          <FaGoogle className="text-red-700" />
          <span>Login with Google</span>
        </button>
      </form>

      <img src="bg.png" className="w-2/3  hidden md:block h-screen" />
    </div>
  );
}
