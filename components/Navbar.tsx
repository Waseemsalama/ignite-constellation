"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/30">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-bold text-primary text-xl">
          ✨ Constellation
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/constellation" className="hover:text-primary">Constellation</Link>
          <Link href="/leaderboard" className="hover:text-primary">Leaderboard</Link>
          <Link href="/points" className="text-primary font-semibold">
            ⚡ Points
          </Link>
          {session ? (
            <>
              <Link href="/account" className="hover:text-primary">Account</Link>
              <button onClick={() => signOut()} className="btn">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

