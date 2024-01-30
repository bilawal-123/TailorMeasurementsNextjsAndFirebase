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
import { RiHome6Line } from "react-icons/ri";

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
      className="relative flex w-full flex-wrap items-center justify-center bg-gray-700 py-2 text-neutral-500 shadow-lg "
      data-te-navbar-ref
    >
      <div className="w-[1000px] max-w-full px-4 flex justify-center items-center flex-col sm:justify-between  sm:flex-row">
        <div className="mb-2.5 md:mb-0">
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
          className={`${lato.className} flex md:space-x-10 space-x-2 text-sm w-full sm:w-auto justify-between sm:justify-end gap-7 sm:gap-0`}
        >
          <Link href={"/"} className="nav-link-style">
            <RiHome6Line className="nav-link-icon-style" />{" "}
            <span className="hidden sm:block">Home</span>
          </Link>
          <Link href={"/addMeasure"} className="nav-link-style">
            <TbRulerMeasure className="nav-link-icon-style" />{" "}
            <span className="hidden sm:block">Add Measurement</span>
          </Link>
          {!authUser ? (
            <Link href={"/userRegister"} className="nav-link-style">
              <TbLogin className="nav-link-icon-style" />
              <span className="hidden sm:block">Register</span>
            </Link>
          ) : (
            <>
              <button onClick={signOut} className="nav-link-style">
                <TbLogout className="nav-link-icon-style" />
                <span className="hidden sm:block">Sign out</span>
              </button>
              <Link href="/profile" className="nav-link-style">
                <TbUserCircle className="nav-link-icon-style" />
                <span className="hidden sm:block">
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
