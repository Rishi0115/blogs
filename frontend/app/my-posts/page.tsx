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

export default function MyPostsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [fetching, setFetching] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
      return;
    }
    if (!authLoading && user) {
      getAllPosts()
        .then((all) => setPosts(all.filter((p) => p.author.id === user.id)))
        .finally(() => setFetching(false));
    }
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
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">My Posts</h1>
            <p className="mt-1 text-sm text-white/40">{posts.length} post{posts.length !== 1 ? "s" : ""}</p>
          </div>
          <Link
            href="/create-post"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            + New Post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-24 text-center">
            <p className="text-xl font-semibold text-white/30">No posts yet</p>
            <p className="mt-2 text-sm text-white/20">Start writing your first post.</p>
            <Link
              href="/create-post"
              className="mt-6 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              Create Post
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20"
              >
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/blog/${post.id}`}
                    className="block text-base font-semibold text-white transition hover:text-indigo-300 truncate"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-1 text-xs text-white/30">{formatDate(post.created_at)}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Link href={`/edit-post/${post.id}`}>
                    <Button variant="secondary">Edit</Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => setDeleteTarget(post)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Post"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This cannot be undone.`}
        confirmText={deleting ? "Deleting…" : "Delete"}
        confirmVariant="danger"
      />
    </>
  );
}
