"use client";
import { useEffect, useState } from "react";

export default function LeaderboardTable() {
  const [cityStats, setCityStats] = useState<any[]>([]);
  const [topUsers, setTopUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch city stats and top users
    Promise.all([
      fetch("/api/citystats").then((res) => res.json()).catch(() => []),
      fetch("/api/users/top").then((res) => res.json()).catch(() => []),
    ]).then(([cities, users]) => {
      setCityStats(cities);
      setTopUsers(users);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-gray-400">Loading leaderboard...</div>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Top Cities</h2>
        <div className="space-y-2">
          {cityStats.slice(0, 10).map((city, idx) => (
            <div key={city.city} className="p-4 bg-[#0f141b] rounded-lg flex items-center justify-between">
              <div>
                <p className="font-semibold">#{idx + 1} {city.city}</p>
                <p className="text-sm text-gray-400">{city.starsCount} stars • {city.totalPoints} points</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Top Users</h2>
        <div className="space-y-2">
          {topUsers.slice(0, 10).map((user, idx) => (
            <div key={user.id} className="p-4 bg-[#0f141b] rounded-lg flex items-center justify-between">
              <div>
                <p className="font-semibold">#{idx + 1} {user.name}</p>
                <p className="text-sm text-gray-400">{user.points} ⚡</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

