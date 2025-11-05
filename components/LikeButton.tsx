"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface LikeButtonProps {
  starId?: string;
  commentId?: string;
  initialLiked: boolean;
  likeCount: number;
}

export default function LikeButton({
  starId,
  commentId,
  initialLiked,
  likeCount: initialLikeCount,
}: LikeButtonProps) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [loading, setLoading] = useState(false);

  if (!session) return null;

  const handleClick = async () => {
    setLoading(true);
    try {
      if (liked) {
        await fetch("/api/like", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ starId, commentId }),
        });
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        await fetch("/api/like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ starId, commentId }),
        });
        setLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
        liked ? "text-red-500" : "text-gray-400"
      } hover:bg-gray-800`}
    >
      <span>{liked ? "❤️" : "🤍"}</span>
      <span>{likeCount}</span>
    </button>
  );
}

