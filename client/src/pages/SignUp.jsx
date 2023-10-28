import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-md mx-auto">
      <h1 className="text-3xl font-semibold text-center my-3">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          className="border-none p-3 rounded-lg focus:outline-none"
          type="text"
          placeholder="Username"
          id="username"
        />
        <input
          className="border-none p-3 rounded-lg focus:outline-none"
          type="email"
          placeholder="Email"
          id="email"
        />
        <input
          className="border-none p-3 rounded-lg focus:outline-none"
          type="password"
          placeholder="Password"
          id="password"
        />
        <button className="rounded-lg bg-slate text-white p-3 uppercase hover:opacity-95 disabled-80">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue hover:underline">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
