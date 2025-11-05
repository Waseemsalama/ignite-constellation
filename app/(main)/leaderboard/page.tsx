import LeaderboardTable from "@/components/LeaderboardTable";

export default function LeaderboardPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Leaderboard</h1>
      <p className="text-gray-300 mb-6">Top cities and users by points.</p>
      <LeaderboardTable />
    </div>
  );
}

