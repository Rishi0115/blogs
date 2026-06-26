"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getAllUsers } from "@/services/auth";
import { User } from "@/types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminUsersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.replace("/login"); return; }
    if (!user.is_admin) { router.replace("/blog"); return; }

    getAllUsers()
      .then(setUsers)
      .finally(() => setFetching(false));
  }, [user, authLoading, router]);

  if (authLoading || fetching) {
    return (
      <div className="flex items-center justify-center py-32">
        <svg className="h-8 w-8 animate-spin text-indigo-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">Admin</span>
          <h1 className="text-3xl font-bold text-white">Users</h1>
        </div>
        <p className="mt-1 text-sm text-white/40">{users.length} registered users</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/40">ID</th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/40">Email</th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/40">Username</th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/40">Role</th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/40">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((u) => (
              <tr key={u.id} className="transition hover:bg-white/5">
                <td className="px-5 py-4 text-white/40">#{u.id}</td>
                <td className="px-5 py-4 text-white">{u.email}</td>
                <td className="px-5 py-4 text-white/70">@{u.username}</td>
                <td className="px-5 py-4">
                  {u.is_admin ? (
                    <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400">Admin</span>
                  ) : (
                    <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-white/40">Member</span>
                  )}
                </td>
                <td className="px-5 py-4 text-white/40">{formatDate(u.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="py-16 text-center text-white/30">No users found.</div>
        )}
      </div>
    </div>
  );
}
