"use client";

import { useEffect, useState } from "react";
import { getAllPosts } from "@/services/posts";
import { Post } from "@/types";
import PostCard from "@/components/blog/PostCard";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">All Posts</h1>
        <p className="mt-1 text-sm text-white/40">Discover what others are writing</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <svg
            className="h-8 w-8 animate-spin text-indigo-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="text-2xl font-semibold text-white/30">No posts yet</p>
          <p className="mt-2 text-sm text-white/20">Be the first to write something.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
