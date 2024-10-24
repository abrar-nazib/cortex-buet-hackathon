"use client";
import { ModeToggle } from "../ThemeButton";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAppContext } from "@/context";
import Logout from "../Logout";

function Header() {
  const { session } = useAppContext();

  return (
    <header className="mb-24">
      <motion.div
        className="fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border bg-primary border-primary/10  border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-lg dark:bg-primary/15 dark:border-primary/40 dark:bg-opacity-75"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      >
        <nav className="h-full flex items-center justify-between px-8">
          <motion.li
            className="flex items-center justify-center relative"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Link href="/" className="text-xl text-primary/80">
            <span className="text-primary font-semibold text-2xl ">Cx</span>-RAILWAY
            </Link>
          </motion.li>
          <div className="flex items-center justify-center gap-4">
            <motion.li
              className="flex items-center justify-center relative"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <ModeToggle />
            </motion.li>

            {session?.token ? (
              <motion.li
                className="flex items-center justify-center relative"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <Logout />
              </motion.li>
            ) : (
              <div className="flex items-center">
                <motion.li
                  className="flex items-center justify-center relative"
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <Link href="/login" className="flex w-full items-center justify-center px-3 py-3">
                    Sign In
                  </Link>
                </motion.li>
                <motion.li
                  className="flex items-center justify-center relative"
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <Link
                    href="/register"
                    className="flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition dark:text-gray-500 dark:hover:text-gray-300"
                  >
                    Sign Up
                  </Link>
                </motion.li>
              </div>
            )}
          </div>
        </nav>
      </motion.div>
    </header>
  );
}

export default Header;
