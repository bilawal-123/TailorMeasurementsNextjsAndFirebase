"use client";
import { useState, useEffect } from "react";
import { auth } from "@/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useAuth } from "@/firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import Loader from "../components/loader";
import { CiLock } from "react-icons/ci";
import { RiUserAddFill } from "react-icons/ri";
import { TbBrandGoogleFilled } from "react-icons/tb";
export default function UserRegister() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { authUser, isLoading, setAuthUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!isLoading && authUser) {
      router.push("/");
    }
  }, [authUser, isLoading, pathname]);

  const provider = new GoogleAuthProvider();
  const signupHandler = async (e) => {
    if (!email || !password) return;
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      setAuthUser({
        uid: user.uid,
        email: user.email,
      });
    } catch (error) {
      console.error("An Error Occured", error);
    }
  };
  const signInWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("An Error Occured", error);
    }
  };
  return isLoading || (!isLoading && authUser) ? (
    <Loader></Loader>
  ) : (
    <div className="auth-wrapper w-full items-center flex bg-[url('/auth-bg.jpg')] h-[calc(100vh_-_100px)] bg-cover ">
      <div className="w-[500px] max-w-full mx-auto px-4 py-8 bg-gray-600">
        <div className="flex flex-col justify-center items-center mb-3">
          <div className="text-5xl text-gray-600 mb-2 inline-flex bg-white rounded-full p-4 shadow-md shadow-gray-500 ">
            <CiLock />
          </div>
          <h1 className="text-white mb-2 text-lg uppercase">
            User Registeration
          </h1>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            className="block mb-3 min-h-[auto] border-2 text-white border-gray-300 w-full rounded bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:border-white"
            placeholder="Email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="block mb-3 min-h-[auto] border-2 text-white border-gray-300 w-full rounded bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:border-white"
            placeholder="Password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-3 mt-6">
            <button onClick={signupHandler} className="button-style">
              {" "}
              <RiUserAddFill className="text-lg" />
              Register User
            </button>
            <button onClick={signInWithGoogle} className="button-default">
              <TbBrandGoogleFilled className="text-red-600 text-lg" /> Signin
              With Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
