import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          className="border-bgColorLight p-3 rounded-lg focus:outline-none mt-4"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="border-bgColorLight p-3 rounded-lg focus:outline-none"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border-bgColorLight p-3 rounded-lg focus:outline-none"
        />
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-rose cursor-pointer">Delete account</span>
        <span className="text-rose cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
