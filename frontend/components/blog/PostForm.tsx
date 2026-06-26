"use client";

import { useState } from "react";
import FormInput from "@/components/ui/FormInput";
import Button from "@/components/ui/Button";

interface PostFormProps {
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (title: string, content: string) => Promise<void>;
  loading: boolean;
  submitLabel?: string;
}

export default function PostForm({
  initialTitle = "",
  initialContent = "",
  onSubmit,
  loading,
  submitLabel = "Submit",
}: PostFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!content.trim()) newErrors.content = "Content is required.";
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    await onSubmit(title.trim(), content.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <FormInput
        id="post-title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title"
        error={errors.title}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="post-content" className="text-sm font-medium text-white/80">
          Content
        </label>
        <textarea
          id="post-content"
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content here..."
          className={`rounded-lg border bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:ring-2 focus:ring-indigo-500 resize-none ${
            errors.content ? "border-red-500" : "border-white/10 hover:border-white/20"
          }`}
        />
        {errors.content && (
          <p className="text-xs text-red-400">{errors.content}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
