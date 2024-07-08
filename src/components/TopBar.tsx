"use client";
import Link from 'next/link';
import {useState} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";

export function TopBar() {
  const {user} = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gray-800 text-white">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-lg font-bold cursor-pointer">
            Taskflow
          </Link>
          <div className="hidden md:block">
            <Link href="/projects" className="text-white cursor-pointer">
              Projects
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/account" className="text-white cursor-pointer flex items-center space-x-2">
                  <i className="pi pi-user text-xl"></i>
                  <span>Account</span>
                </Link>
                <Link href="/api/auth/logout" className="text-white cursor-pointer flex items-center space-x-2">
                  <i className="pi pi-sign-out text-xl"></i>
                  <span>Sign Out</span>
                </Link>
              </>
            ) : (
              <Link href="/api/auth/login" className="text-white cursor-pointer flex items-center space-x-2">
                <i className="pi pi-sign-in text-xl"></i>
                <span>Sign In</span>
              </Link>
            )}
          </div>

          <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white p-4">
          <Link href="/projects" className="block py-2 cursor-pointer">
            Projects
          </Link>
          {user ? (
            <>
              <Link href="/account" className="block py-2 cursor-pointer">
                Account
              </Link>
              <Link href="/api/auth/logout" className="block py-2 cursor-pointer">
                Sign Out
              </Link>
            </>
          ) : (
            <Link href="/api/auth/login" className="block py-2 cursor-pointer">
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
