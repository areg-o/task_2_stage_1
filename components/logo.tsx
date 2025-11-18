"use client";

import useUrl from "@/shared/hooks/useUrl";
import Image from "next/image";

const Logo = () => {
  const { updateParams } = useUrl();

  const handleClick = () => {
    updateParams({ page: 1, name: "" });
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
