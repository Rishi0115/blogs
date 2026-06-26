"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import FormInput from "@/components/ui/FormInput";
import Button from "@/components/ui/Button";

export default function AdminLoginPage() {
  const { loginUser, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginUser(email, password);
      // user state updates asynchronously — read from loginUser's resolved user
      // We use a short check after login via the updated context
    } catch {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }
    setLoading(false);
  }

  useEffect(() => {
    if (user !== null) {
      if (user.is_admin) {
        router.push("/admin/users");
      } else {
        setError("You are not an admin.");
      }
    }
  }, [user, router]);

  return (
    <div className="flex min-h-[calc(100vh-65px)] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-amber-500/20 bg-white/5 p-8 shadow-xl backdrop-blur-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
            <svg className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="mt-1 text-sm text-white/50">Restricted access only</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormInput
            id="admin-email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
          />
          <FormInput
            id="admin-password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
              {error}
            </p>
          )}

          <Button type="submit" loading={loading} className="mt-2 w-full">
            Sign In as Admin
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-white/40">
          Regular user?{" "}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition">
            Go to login
          </Link>
        </p>
      </div>
    </div>
  );
}
