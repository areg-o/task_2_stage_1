"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative w-[6vw] h-[6vh]">
        <Image
          src="/logo.png"
          alt="Logo"
          fill
          style={{ objectFit: "contain" }}
          sizes="8vw"
          priority
        />
      </div>
      <span className="text-[2.5vw] font-semibold">Dashboard</span>
    </div>
  );
};

export default Logo;
