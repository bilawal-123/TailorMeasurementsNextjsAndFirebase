"use client";
import { useContext } from "react";
import ShopContext from "./context";
import Link from "next/link";
import { useAuth } from "../../firebase/auth";
import { useRouter } from "next/navigation";
import Loader from "./loader";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Image from "next/image";
import { Nova_Square, Roboto } from "next/font/google";
// React icons
import {
  TbNeedleThread,
  TbRulerMeasure,
  TbLogout,
  TbLogin,
  TbUserCircle,
} from "react-icons/tb";
// If loading a variable font, you don't need to specify the font weight
const nova = Nova_Square({
  subsets: ["latin"],
  weight: ["400"],
});
const lato = Roboto({
  subsets: ["latin"],
  weight: ["400"],
});
export default function Navbar() {
  const { authUser, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [shopName, setShopName] = useState("");
  const [shopOwner, setShopOwner] = useState("");
  const shop = useContext(ShopContext);
  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/userLogin");
    }
    if (authUser) {
      const fetchUserProfileData = async () => {
        try {
          const profilesCollection = collection(db, "profile");
          const querySnapshot = await getDocs(
            query(profilesCollection, where("owner", "==", authUser.uid))
          );

          if (!querySnapshot.empty) {
            const userProfileData = querySnapshot.docs[0].data();
            setShopName(userProfileData.shopName || "");
            setShopOwner(userProfileData.shopOwner || "");
            // Fix the typo here, change userProfileData.shopOwner to userProfileData.shopName
            shop.setShopNameContext(userProfileData.shopName);
            shop.setShopOwnerContext(userProfileData.shopOwner);
          }
        } catch (error) {
          console.error("Error fetching user profile data", error);
        }
      };

      fetchUserProfileData();
    }
  }, [authUser, isLoading]);

  return (
    <nav
      className="relative flex w-full flex-wrap items-center justify-center bg-gray-700 py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4"
      data-te-navbar-ref
    >
      <div className="w-[1000px] max-w-full  px-4 flex md:justify-between justify-center flex-wrap ">
        <div>
          <Link href={"/"} className="flex items-center gap-2">
            <span className="bg-white w-6 h-6 inline-flex items-center justify-center rounded-sm">
              <Image
                src="/icon-black.png"
                alt="Example Image"
                width={20}
                height={20}
                priority
                style={{ height: "auto" }}
              />
            </span>
            {/* {authUser?.username} */}
            <span className={` text-xl text-white capitalize font-bold`}>
              <span className={nova.className}>
                {" "}
                {/* {shopName || "Shop Name"} */}
                {shop.shopNameContext}
              </span>
            </span>
          </Link>
        </div>
        <div
          className={`${lato.className} flex md:space-x-10 space-x-2 text-sm`}
        >
          <Link
            href={"/"}
            className="flex items-center md:space-x-2  text-gray-50 "
          >
            <TbNeedleThread className="text-yellow-200 text-2xl hidden md:block" />{" "}
            <span>Home</span>
          </Link>
          <Link
            href={"/addMeasure"}
            className="flex items-center space-x-2 text-gray-50"
          >
            <TbRulerMeasure className="text-yellow-200 text-2xl hidden md:block" />{" "}
            <span>Add Measurement</span>
          </Link>
          {!authUser ? (
            <Link
              href={"/userRegister"}
              className="flex items-center space-x-2 text-gray-50"
            >
              <TbLogin className="text-yellow-200 text-2xl hidden md:block" />
              <span>Register</span>
            </Link>
          ) : (
            <>
              <button
                onClick={signOut}
                className="flex items-center space-x-2 text-gray-50"
              >
                <TbLogout className="text-yellow-200 text-2xl hidden md:block" />
                <span>Sign out</span>
              </button>
              <Link
                href="/profile"
                className="flex items-center space-x-2 text-gray-50"
              >
                <TbUserCircle className="text-yellow-200 text-2xl hidden md:block" />
                <span>
                  {/* {shopOwner || "Owner Name"} */}
                  {shop.shopOwnerContext}
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
