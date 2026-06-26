"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createPost } from "@/services/posts";
import PostForm from "@/components/blog/PostForm";

export default function CreatePostPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [user, authLoading, router]);

  async function handleSubmit(title: string, content: string) {
    setError("");
    setSubmitting(true);
    try {
      await createPost(title, content);
      router.push("/blog");
    } catch {
      setError("Failed to create post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (authLoading || !user) return null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Create Post</h1>
        <p className="mt-1 text-sm text-white/40">Share your thoughts with the world</p>
      </div>

      {error && (
        <p className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <PostForm
          onSubmit={handleSubmit}
          loading={submitting}
          submitLabel="Publish Post"
        />
      </div>
    </div>
  );
}
