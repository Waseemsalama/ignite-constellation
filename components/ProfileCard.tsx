"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import FollowButton from "./FollowButton";

interface ProfileCardProps {
  username: string;
}

export default function ProfileCard({ username }: ProfileCardProps) {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  if (loading) return <div className="text-gray-400">Loading profile...</div>;
  if (!user) return <div className="text-gray-400">User not found</div>;

  const isOwnProfile = session && (session.user as any).id === user.id;

  return (
    <div className="space-y-6">
      <div className="p-6 bg-[#0f141b] rounded-lg">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-2xl">
            {user.image ? (
              <img src={user.image} alt={user.name} className="w-full h-full rounded-full" />
            ) : (
              <span>{user.name[0]}</span>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            {user.bio && <p className="text-gray-300 mt-2">{user.bio}</p>}
            {user.city && <p className="text-gray-400 mt-2">📍 {user.city}</p>}
            <div className="flex items-center gap-6 mt-4">
              <div>
                <p className="text-2xl font-bold text-primary">{user.points} ⚡</p>
                <p className="text-sm text-gray-400">Points</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{user._count?.crystals || 0}</p>
                <p className="text-sm text-gray-400">Stars</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{user._count?.followers || 0}</p>
                <p className="text-sm text-gray-400">Followers</p>
              </div>
            </div>
            {!isOwnProfile && (
              <div className="mt-4">
                <FollowButton userId={user.id} isFollowing={user.isFollowing || false} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Stars</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {user.crystals?.map((star: any) => (
            <div key={star.id} className="p-4 bg-[#0f141b] rounded-lg">
              <p className="font-semibold">{star.name || "Unnamed Star"}</p>
              <p className="text-sm text-gray-400">{star.city}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

