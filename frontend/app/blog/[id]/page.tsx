"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getPost, deletePost } from "@/services/posts";
import { useAuth } from "@/context/AuthContext";
import { Post } from "@/types";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);

  useEffect(() => {
    getPost(Number(id))
      .then(setPost)
      .finally(() => setLoading(false));
  }, [id]);

  const isOwnerOrAdmin =
    user && post && (user.id === post.author.id || user.is_admin);

  function handleEditClick() {
    if (!isOwnerOrAdmin) {
      setShowUnauthorizedModal(true);
      return;
    }
    router.push(`/blog/${id}/edit`);
  }

  function handleDeleteClick() {
    if (!isOwnerOrAdmin) {
      setShowUnauthorizedModal(true);
      return;
    }
    setShowDeleteModal(true);
  }

  async function confirmDelete() {
    if (!post) return;
    setDeleting(true);
    try {
      await deletePost(post.id);
      router.push("/blog");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <svg className="h-8 w-8 animate-spin text-indigo-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-xl font-semibold text-white/40">Post not found.</p>
        <Link href="/blog" className="mt-4 text-sm text-indigo-400 hover:text-indigo-300">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Link href="/blog" className="text-sm text-white/40 transition hover:text-white">
          ← Back to Blog
        </Link>

        <article className="mt-6">
          <h1 className="text-4xl font-bold leading-tight text-white">{post.title}</h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-white/40">
            <span>
              by{" "}
              <span className="font-medium text-white/60">@{post.author.username}</span>
            </span>
            <span>·</span>
            <span>{formatDate(post.created_at)}</span>
          </div>

          {user && (
            <div className="mt-6 flex gap-3">
              <Button
                variant="secondary"
                onClick={handleEditClick}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                loading={deleting}
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
            </div>
          )}

          <div className="mt-8 border-t border-white/10 pt-8">
            <p className="whitespace-pre-wrap text-base leading-8 text-white/80">
              {post.content}
            </p>
          </div>
        </article>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        confirmVariant="danger"
      />

      <Modal
        isOpen={showUnauthorizedModal}
        onClose={() => setShowUnauthorizedModal(false)}
        title="Access Denied"
        message="Sorry, you are not an admin and cannot perform this action."
        confirmText=""
      />
    </>
  );
}
