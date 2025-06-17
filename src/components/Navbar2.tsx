"use client";

import { signOut } from "@/actions/client/signout";
import { getUsername } from "@/actions/saveToCookies";
import { routes } from "@/constants/route";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar2 = () => {
  const [username, setUsername] = useState("user");
  const [signouting, setSignouting] = useState(false);
  useEffect(() => {
    const setName = async () => {
      const user = await getUsername();
      setUsername(user ?? "user");
    };
    setName();
  }, []);

  useEffect(() => {
    if (signouting) {
      signOut();
      setSignouting(false);
    }
  }, [signouting]);

  return (
    <nav className="navbar rounded-b-md shadow-base-300/20 shadow-sm">
      <div className="w-full md:flex md:items-center md:gap-2">
        <div className="flex items-center justify-between">
          <div className="navbar-start items-center justify-between max-md:w-full">
            <div>
              <Link href={routes.home} className="flex items-center">
                <Image
                  src="/icons8-chat-gpt.svg"
                  alt="Logo"
                  width={52}
                  height={52}
                />
                <div className="font-semibold font-sans text-slate-800 hidden sm:block">
                  CompassAI
                </div>
              </Link>
            </div>
            <div className="md:hidden">
              <button
                type="button"
                className="collapse-toggle btn btn-outline btn-secondary btn-sm btn-square"
                data-collapse="#dropdown-navbar-collapse"
                aria-controls="dropdown-navbar-collapse"
                aria-label="Toggle navigation"
              >
                <span className="icon-[tabler--menu-2] collapse-open:hidden size-4"></span>
                <span className="icon-[tabler--x] collapse-open:block hidden size-4"></span>
              </button>
            </div>
          </div>
        </div>
        <div
          id="dropdown-navbar-collapse"
          className="md:navbar-end collapse hidden grow basis-full overflow-hidden transition-[height] duration-300 max-md:w-full"
        >
          <ul className="menu md:menu-horizontal gap-2 p-0 text-base max-md:mt-2">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li className="dropdown relative inline-flex [--auto-close:inside] [--offset:9] [--placement:bottom-end]">
              <button
                id="dropdown-nav"
                type="button"
                className="dropdown-toggle dropdown-open:bg-base-content/10 dropdown-open:text-base-content"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Dropdown"
              >
                Welcom, {username}
                <span className="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-4"></span>
              </button>
              <ul
                className="dropdown-menu dropdown-open:opacity-100 hidden"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="dropdown-nav"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Account settings
                  </a>
                </li>
                <hr className="border-base-content/25 -mx-2" />
                <li>
                  <a
                    onClick={() => setSignouting(true)}
                    className="dropdown-item"
                    href="#"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
