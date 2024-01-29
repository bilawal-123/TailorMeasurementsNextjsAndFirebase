import Image from "next/image";
export default function Loader() {
  return (
    <div className="relative w-full h-[calc(100vh_-_350px)]">
      <div className="absolute  w-full h-full flex items-center justify-center mx-auto bg-opacity-20">
        <Image width={100} height={100} alt="" src={"/loader.gif"} />
      </div>
    </div>
  );
}
