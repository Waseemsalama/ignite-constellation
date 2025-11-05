// app/(main)/user/[username]/page.tsx
import { prisma } from "@/lib/prisma"; // optional, only if you use Prisma
import { notFound } from "next/navigation";

interface UserPageProps {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = params;

  // Example: load user data if using Prisma
  // const user = await prisma.user.findUnique({ where: { username } });
  // if (!user) return notFound();

  return (
    <main className="p-8 text-center">
      <h1 className="text-3xl font-bold text-white">
        User Profile: {username}
      </h1>
      <p className="text-gray-400 mt-4">This is {username}'s public page.</p>
    </main>
  );
}
