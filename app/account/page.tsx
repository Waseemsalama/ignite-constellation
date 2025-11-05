import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const userId = (session.user as any).id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      crystals: { take: 5, orderBy: { createdAt: "desc" } },
      _count: { select: { crystals: true, followers: true, following: true } },
    },
  });

  if (!user) return null;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-sm text-gray-400">Points</p>
          <p className="text-3xl font-bold text-primary">{user.points} ⚡</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-400">Stars</p>
          <p className="text-3xl font-bold">{user._count.crystals}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-400">Followers</p>
          <p className="text-3xl font-bold">{user._count.followers}</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Stars</h2>
        <div className="space-y-2">
          {user.crystals.map((star) => (
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

