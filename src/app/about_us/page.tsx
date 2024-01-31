"use client";
import { useState, useEffect } from "react";
import axios from "axios";
export default () => {
  const [aboutUs, setAboutUs] = useState("");

  useEffect(() => {
    (async () => {
      const res = await axios.get("https://localhost:7113/api/info/about");
      //console.log(res)
      setAboutUs(res.data.data);
    })(); //IIFE :)
  }, []);
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div>
        <h1 className="text-5xl font-bold">About Us</h1>
      </div>
      <div className="text-left m-5">{aboutUs}</div>
    </div>
  );
};
