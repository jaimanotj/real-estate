import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success === false) {
        dispatch(signInFailure(result.message));
        return;
      }
      dispatch(signInSuccess(result));
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error.message));
    }
  }
  return (
    <div className="p-3 max-w-md mx-auto">
      <h1 className="text-3xl font-semibold text-center my-3">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border-none p-3 rounded-lg focus:outline-none"
          placeholder="Email"
          type="email"
          id="email"
          onChange={handleChange}
        />
        <input
          className="border-none p-3 rounded-lg focus:outline-none"
          placeholder="Password"
          type="password"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="rounded-lg bg-lightBlue text-white p-3 uppercase hover:opacity-95 disabled-80"
        >
          Sign In
        </button>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Dont have an account ?</p>
        <Link to={"/sign-up"}>
          <span className="text-rose hover:underline">SignUp</span>
        </Link>
      </div>
      {error && <p className="text-rose mt-5">{error}</p>}
    </div>
  );
}
