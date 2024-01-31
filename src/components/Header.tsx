"use client";
import {
  FaPerson,
  FaDoorOpen,
  FaOilWell,
  FaBell,
  FaMessage,
  FaChartBar,
  FaBookmark,
  FaHouse,
} from "react-icons/fa6";
import Link from "next/link";
import { useSession } from "./session";
export default () => {
  console.log(useSession());
  const { logOut } = useSession();

  return (
    <header
      id="btns"
      className="flex w-full justify-end gap-3 mr-3 h-1/6 mt-3 text-sm overflow-x-scroll"
    >
      <Link href="/">
        {" "}
        <button className="btn">
          {" "}
          <FaHouse /> <span className="hidden md:block text-sm">Home</span>
        </button>
      </Link>
      <button className="btn">
        <FaOilWell />{" "}
        <span className="hidden md:block text-sm">My Properties</span>
      </button>
      <button className="btn">
        <FaBookmark />{" "}
        <span className="hidden md:block text-sm">Bookmarks</span>
      </button>
      <button className="btn">
        <FaMessage /> <span className="hidden md:block text-sm">Messages</span>
      </button>
      <button className="btn">
        <FaBell /> <span className="hidden md:block text-sm">Nofication</span>
      </button>
      <Link href="/me">
        {" "}
        <button className="btn">
          <FaPerson /> <span className="hidden md:block text-sm">Profile</span>
        </button>
      </Link>
      <button className="btn">
        <FaChartBar /> <span className="hidden md:block text-sm">Analysis</span>
      </button>

      <button className="btn text-red-700" onClick={logOut}>
        <FaDoorOpen />
        <span className="hidden md:block">Logout</span>
      </button>
    </header>
  );
};
