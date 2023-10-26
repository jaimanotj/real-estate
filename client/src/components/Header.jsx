import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-bgColor shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate">Real</span>
            <span className="text-stoneBold">Estate</span>
          </h1>
        </Link>
        <form className="bg-bgColorLight p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-bgColorLight focus:outline-none w-24 sm:w-64"
          />
          <FaSearch />
        </form>
        <ul className="flex gap-8">
          <Link to="/">
            <li className="hidden sm:inline text-stoneBold hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-stoneBold hover:underline">
              About
            </li>
          </Link>
          <Link to="/sign-in">
            <li className="text-stoneBold hover:underline">Sign in</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
