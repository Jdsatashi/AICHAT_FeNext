import { routes } from "@/constants/route";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center my-2">
        <Link href={routes.home}>
          <Image src="/icons8-chat-gpt.svg" alt="Logo" width={52} height={52} />
        </Link>
      </div>
      <div className="flex items-center ">
        <button className="px-4 py-1.5 font-semibold rounded-md border-2 bg-columbia hover:opacity-90 hidden sm:block">
          Sign in
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
