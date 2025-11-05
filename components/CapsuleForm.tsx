"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ShareToTikTok from "./ShareToTikTok";

interface CapsuleFormProps {
  city: string;
  starName: string;
}

export default function CapsuleForm({ city, starName }: CapsuleFormProps) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Create star and capsule
    // For now, just redirect
    router.push("/constellation");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-gray-400 mb-1">Message</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-2 bg-[#0f141b] rounded-lg text-white border border-gray-700 focus:border-primary focus:outline-none"
          rows={6}
          placeholder="What message do you want to leave in your time capsule?"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Video URL (optional)</label>
        <input
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full px-4 py-2 bg-[#0f141b] rounded-lg text-white border border-gray-700 focus:border-primary focus:outline-none"
          placeholder="https://..."
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="public"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="public" className="text-sm text-gray-400">
          Make this capsule public
        </label>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="btn flex-1">
          Create Capsule
        </button>
        <ShareToTikTok mediaUrl={videoUrl} caption={`Check out my star in ${city}! ${text}`} />
      </div>
    </form>
  );
}

