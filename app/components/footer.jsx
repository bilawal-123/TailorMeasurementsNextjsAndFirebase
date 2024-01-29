import { useContext } from "react";
import ShopContext from "./context";
import { RiCopyrightFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  const shop = useContext(ShopContext);
  return (
    <footer className="text-center bg-gray-700 py-3 text-neutral-500">
      <div className="w-[1000px] max-w-full mx-auto flex justify-between">
        <p className="text-xs text-[#a3a3a3] font-light flex items-center  gap-2">
          All rights reserved <RiCopyrightFill />
          <span className="font-medium"> {shop.shopNameContext} </span>
        </p>
        <p className="text-xs text-[#a3a3a3] font-light flex items-center gap-2">
          Developed with <FaHeart /> by Muhammad Bilawal
        </p>
      </div>
    </footer>
  );
}
