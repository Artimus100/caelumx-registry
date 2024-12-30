"use client";

import Link from "next/link";
import Logo from "@/components/assets/Logo.svg";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
          <img src={Logo.src} alt="Logo" className="mr-8 h-10 w-10" />
            <span className="font-semibold text-xl">Caelum Registry</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link href="/submit">
              <Button variant="ghost">Submit Project</Button>
            </Link>
            <Link href="/verify">
              <Button variant="ghost">Verify Projects</Button>
            </Link>
            <Link href="/status">
              <Button variant="ghost">Check Status</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}