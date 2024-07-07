"use client";
import {useState} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import {useRouter} from "next/navigation";

export default function TopBar() {
  const router = useRouter();
  const {user} = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const navigate = (path: string) => router.push(path);

  return (
    <header className="bg-gray-800 text-white">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <a className="text-lg font-bold cursor-pointer" onClick={() => navigate("/")}>
            Taskflow
          </a>
          <div className="hidden md:block">
            <a className="text-white cursor-pointer" onClick={() => navigate("/projects")}>
              Projects
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <a
                  className="text-white cursor-pointer flex items-center space-x-2"
                  onClick={() => navigate("/account")}
                >
                  <i className="pi pi-user text-xl"></i>
                  <span>Account</span>
                </a>
                <a href="/api/auth/logout" className="text-white cursor-pointer flex items-center space-x-2">
                  <i className="pi pi-sign-out text-xl"></i>
                  <span>Sign Out</span>
                </a>
              </>
            ) : (
              <a href="/api/auth/login" className="text-white cursor-pointer flex items-center space-x-2">
                <i className="pi pi-sign-in text-xl"></i>
                <span>Sign In</span>
              </a>
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
          <a className="block py-2 cursor-pointer" onClick={() => navigate("/projects")}>
            Projects
          </a>
          {user ? (
            <>
              <a className="block py-2 cursor-pointer" onClick={() => navigate("/account")}>
                Account
              </a>
              <a href="/api/auth/logout" className="block py-2 cursor-pointer">
                Sign Out
              </a>
            </>
          ) : (
            <a href="/api/auth/login" className="block py-2 cursor-pointer">
              Sign In
            </a>
          )}
        </div>
      )}
    </header>
  );
}
