"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          KG Registry
        </Link>
        <div className="space-x-4 flex items-center">
          <Link href="/" className="hover:text-blue-200">
            Home
          </Link>
          <Link href="/browse" className="hover:text-blue-200">
            Browse
          </Link>
          <Link href="/register" className="hover:text-blue-200">
            Register
          </Link>
          <Link href="#" className="hover:text-blue-200">
            Booking
          </Link>
          {session?.user && (session.user as any).role === "admin" && (
            <Link href="/admin" className="hover:text-blue-200">
              Admin
            </Link>
          )}
          {session?.user ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
            >
              Logout
            </button>
          ) : (
            <Link href="/admin/login" className="hover:text-blue-200">
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
