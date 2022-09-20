import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { toast } from "react-toastify";
import { signUp } from "../utils/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  // todo: functions
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password || !retypedPassword) {
      return toast.error("please fill all the fields");
    }
    // if password is too short
    if (password.toString().length < 7) {
      return toast.error("password must be at leas 7 chars");
    }
    // if passwords do not match
    if (password !== retypedPassword) {
      return toast.error("passwords do not match");
    }

    const { error, session } = await signUp({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      setEmail("");
      setPassword("");
      setRetypedPassword("");
      toast.dark("Sign Up Successful. Please chek your email inbox");
    }
  };
  // todo: component
  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-primary h-[40vh] flex items-center justify-center text-white">
        <h1>Sign Up</h1>
      </div>
      <div className="form-container px-[10%] pt-10 max-w-[800px] mx-auto">
        <form onSubmit={handleSignUp}>
          <div className="rounded-3xl mb-[32px]">
            <input
              type="email"
              placeholder="Email"
              className="border-[1px] border-gray-500 focus:border-primary focus:border-[2px]  rounded-full w-full px-6 py-[7px] outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="rounded-3xl mb-[32px]">
            <input
              type="password"
              placeholder="Password"
              className="border-[1px] border-gray-500 focus:border-primary focus:border-[2px]  rounded-full w-full px-6 py-[7px] outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="rounded-3xl mb-[32px]">
            <input
              type="password"
              placeholder="Password"
              className="border-[1px] border-gray-500 focus:border-primary focus:border-[2px]  rounded-full w-full px-6 py-[7px] outline-none"
              onChange={(e) => setRetypedPassword(e.target.value)}
              value={retypedPassword}
            />
          </div>

          <button
            type="submit"
            className="rounded-full w-full px-6 py-[7px] outline-none bg-primary text-white capitalize block"
            disabled={isSubmitting}
          >
            sign up
          </button>
        </form>

        <div className=" mt-[28px]  flex flex-col justify-center">
          <small className="text-gray-700 my-[20px] block text-center">
            or
          </small>
          <button className="flex items-center justify-center gap-5 shadow-2xl border-none  bg-mx-suto">
            <img src="google.svg" className="block w-[20px]" />
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
