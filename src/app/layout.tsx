import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {UserProvider} from "@auth0/nextjs-auth0/client";
import {PrimeReactProvider} from "primereact/api";
import {TopBar} from "@/components";
import "@/styles/globals.css";
// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import "primeicons/primeicons.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Tasklfow",
  description: "Tasklfow is a task management application built with Next.js, PrimeReact, and TypeORM.",
};

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang="en">
      <PrimeReactProvider>
        <UserProvider>
          <body className={`min-h-screen bg-gray-100 ${inter.className}`} suppressHydrationWarning={true}>
            <TopBar />
            <main className="container mx-auto pt-5">
              {children}
            </main>
          </body>
        </UserProvider>
      </PrimeReactProvider>
    </html>
  );
}
