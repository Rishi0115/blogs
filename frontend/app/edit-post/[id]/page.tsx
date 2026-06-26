"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getPost, updatePost } from "@/services/posts";
import { Post } from "@/types";
import PostForm from "@/components/blog/PostForm";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
      return;
    }
    if (!authLoading) {
      getPost(Number(id))
        .then((data) => {
          if (!user) return;
          const canEdit = user.id === data.author.id || user.is_admin;
          if (!canEdit) {
            router.replace("/blog");
            return;
          }
          setPost(data);
        })
        .catch(() => router.replace("/blog"))
        .finally(() => setFetching(false));
    }
  }, [id, user, authLoading, router]);

  async function handleSubmit(title: string, content: string) {
    if (!post) return;
    setError("");
    setSubmitting(true);
    try {
      await updatePost(post.id, title, content);
      router.push(`/blog/${post.id}`);
    } catch {
      setError("Failed to update post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (authLoading || fetching || !post) {
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
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Edit Post</h1>
        <p className="mt-1 text-sm text-white/40">Update your post content</p>
      </div>

      {error && (
        <p className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <PostForm
          initialTitle={post.title}
          initialContent={post.content}
          onSubmit={handleSubmit}
          loading={submitting}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
