"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface CommentFormProps {
  starId: string;
  onCommentAdded: (comment: any) => void;
}

export default function CommentForm({ starId, onCommentAdded }: CommentFormProps) {
  const { data: session } = useSession();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  if (!session) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ starId, text }),
      });
      const comment = await res.json();
      onCommentAdded(comment);
      setText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1 px-4 py-2 bg-[#0f141b] rounded-lg text-white border border-gray-700 focus:border-primary focus:outline-none"
      />
      <button type="submit" disabled={loading} className="btn">
        {loading ? "..." : "Post"}
      </button>
    </form>
  );
}

