import React from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="p-3 max-w-md mx-auto">
      <h1 className="text-3xl font-semibold text-center my-3">Sign In</h1>
      <form className="flex flex-col gap-4">
        <input
          className="border-none p-3 rounded-lg focus:outline-none"
          placeholder="Email"
          type="email"
          id="email"
        />
        <input
          className="border-none p-3 rounded-lg focus:outline-none"
          placeholder="Password"
          type="password"
          id="password"
        />
        <button className="rounded-lg bg-lightBlue text-white p-3 uppercase hover:opacity-95 disabled-80">
          Sign In
        </button>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Don't have an account ?</p>
        <Link to={"/sign-up"}>
          <span className="text-rose hover:underline">SignUp</span>
        </Link>
      </div>
    </div>
  );
}
