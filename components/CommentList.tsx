"use client";
import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import LikeButton from "./LikeButton";

interface CommentListProps {
  starId: string;
}

interface Comment {
  id: string;
  text: string;
  createdAt: string;
  user: { id: string; name: string; image: string | null };
  likes: { id: string }[];
}

export default function CommentList({ starId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/comment?starId=${starId}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [starId]);

  const addComment = (comment: Comment) => {
    setComments([comment, ...comments]);
  };

  if (loading) return <div className="text-gray-400">Loading comments...</div>;

  return (
    <div className="space-y-4">
      <CommentForm starId={starId} onCommentAdded={addComment} />
      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 bg-[#0f141b] rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                {comment.user.image ? (
                  <img src={comment.user.image} alt={comment.user.name} className="w-full h-full rounded-full" />
                ) : (
                  <span>{comment.user.name[0]}</span>
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{comment.user.name}</p>
                <p className="text-gray-300 mt-1">{comment.text}</p>
                <div className="mt-2">
                  <LikeButton commentId={comment.id} initialLiked={false} likeCount={comment.likes.length} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

