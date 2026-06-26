"use client";

import Link from "next/link";
import { Post } from "@/types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PostCard({ post }: { post: Post }) {
  const preview =
    post.content.length > 150
      ? post.content.slice(0, 150) + "…"
      : post.content;

  return (
    <Link href={`/blog/${post.id}`} className="group block">
      <article className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition duration-200 hover:border-indigo-500/40 hover:bg-white/8 hover:shadow-indigo-500/10 hover:shadow-lg">
        <h2 className="text-lg font-semibold text-white transition group-hover:text-indigo-300 line-clamp-2">
          {post.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/50 line-clamp-3">
          {preview}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-white/30">
          <span className="font-medium text-white/50">@{post.author.username}</span>
          <span>{formatDate(post.created_at)}</span>
        </div>
      </article>
    </Link>
  );
}
