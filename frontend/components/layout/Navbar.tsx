"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logoutUser();
    router.push("/login");
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          Blogs<span className="text-indigo-400">App</span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              {user.is_admin && (
                <Link
                  href="/admin/users"
                  className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-400 transition hover:bg-amber-500/20"
                >
                  Admin Panel
                </Link>
              )}
              <Link
                href="/create-post"
                className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-500"
              >
                Create Post
              </Link>
              <Link href="/my-posts" className="text-sm text-white/70 transition hover:text-white">
                My Posts
              </Link>
              <Link href="/profile" className="text-sm text-white/70 transition hover:text-white">
                Profile
              </Link>
              <span className="text-white/20">|</span>
              <button
                onClick={handleLogout}
                className="text-sm text-white/50 transition hover:text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-white/70 transition hover:text-white">
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-500"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
