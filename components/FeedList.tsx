"use client";
import { useEffect, useState } from "react";
import LikeButton from "./LikeButton";
import CommentList from "./CommentList";

interface FeedListProps {
  publicOnly: boolean;
}

interface Capsule {
  id: string;
  text: string;
  videoUrl: string | null;
  createdAt: string;
  Star: {
    id: string;
    name: string | null;
    city: string;
    color: string;
    user: { id: string; name: string; image: string | null } | null;
    likes: { id: string }[];
  };
}

export default function FeedList({ publicOnly }: FeedListProps) {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = publicOnly ? "/api/capsules/public" : "/api/capsules/feed";
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setCapsules(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [publicOnly]);

  if (loading) return <div className="text-gray-400">Loading feed...</div>;

  return (
    <div className="space-y-6">
      {capsules.map((capsule) => (
        <div key={capsule.id} className="p-6 bg-[#0f141b] rounded-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
              {capsule.Star.user?.image ? (
                <img
                  src={capsule.Star.user.image}
                  alt={capsule.Star.user.name}
                  className="w-full h-full rounded-full"
                />
              ) : (
                <span>{capsule.Star.user?.name[0] || "?"}</span>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <p className="font-semibold">{capsule.Star.user?.name || "Anonymous"}</p>
                <span className="text-gray-400">•</span>
                <p className="text-sm text-gray-400">{capsule.Star.city}</p>
              </div>
              {capsule.Star.name && (
                <p className="text-primary font-semibold mb-2">✨ {capsule.Star.name}</p>
              )}
              {capsule.text && <p className="text-gray-300 mb-3">{capsule.text}</p>}
              {capsule.videoUrl && (
                <div className="mb-3">
                  <video src={capsule.videoUrl} controls className="max-w-full rounded" />
                </div>
              )}
              <div className="flex items-center gap-4 mb-4">
                <LikeButton
                  starId={capsule.Star.id}
                  initialLiked={false}
                  likeCount={capsule.Star.likes.length}
                />
              </div>
              <CommentList starId={capsule.Star.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

