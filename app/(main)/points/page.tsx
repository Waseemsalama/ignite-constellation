"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function PointsPage() {
  const [points, setPoints] = useState(0);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    // TODO: Fetch user points and history
    fetch("/api/points/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch(() => {});
  }, []);

  const handleBuyPoints = async (points: number, priceId: string) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId,
        points,
        userId: "current-user-id", // TODO: Get from session
        successUrl: `${window.location.origin}/points?success=true`,
        cancelUrl: `${window.location.origin}/points?canceled=true`,
      }),
    });
    const { url } = await res.json();
    if (url) window.location.href = url;
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Your Points</h1>
      <p className="text-gray-300 mt-2">Earn by sharing or buy packs to boost your glow.</p>
      <div className="mt-6 p-4 bg-[#0f141b] rounded-lg">
        <p className="text-2xl font-bold text-primary">{points} ⚡</p>
      </div>
      <div className="mt-6 flex gap-3">
        <Link className="btn" href="/invite">Invite Friends</Link>
        <button
          className="btn"
          onClick={() => handleBuyPoints(500, "price_123")}
        >
          Buy 500 pts
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">History</h2>
        <div className="space-y-2">
          {history.map((tx) => (
            <div key={tx.id} className="p-3 bg-[#0f141b] rounded">
              <p className="text-sm text-gray-400">{tx.type}</p>
              <p className="text-lg">{tx.points > 0 ? "+" : ""}{tx.points} ⚡</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

