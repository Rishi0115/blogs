"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getAllPosts, deletePost } from "@/services/posts";
import { Post } from "@/types";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminManagePostsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [fetching, setFetching] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.replace("/login"); return; }
    if (!user.is_admin) { router.replace("/blog"); return; }

    getAllPosts()
      .then(setPosts)
      .finally(() => setFetching(false));
  }, [user, authLoading, router]);

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deletePost(deleteTarget.id);
      setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

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
    <>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">Admin</span>
            <h1 className="text-3xl font-bold text-white">Manage Posts</h1>
          </div>
          <p className="mt-1 text-sm text-white/40">{posts.length} total posts</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/40">Title</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/40">Author</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/40">Date</th>
                <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-white/40">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.map((post) => (
                <tr key={post.id} className="transition hover:bg-white/5">
                  <td className="max-w-xs px-5 py-4">
                    <Link
                      href={`/blog/${post.id}`}
                      className="truncate font-medium text-white transition hover:text-indigo-300"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-white/50">@{post.author.username}</td>
                  <td className="px-5 py-4 text-white/40">{formatDate(post.created_at)}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/edit-post/${post.id}`}>
                        <Button variant="secondary">Edit</Button>
                      </Link>
                      <Button variant="danger" onClick={() => setDeleteTarget(post)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {posts.length === 0 && (
            <div className="py-16 text-center text-white/30">No posts found.</div>
          )}
        </div>
      </div>

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Post"
        message={`Delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmText={deleting ? "Deleting…" : "Delete"}
        confirmVariant="danger"
      />
    </>
  );
}
