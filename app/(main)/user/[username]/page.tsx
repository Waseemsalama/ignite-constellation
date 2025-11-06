// app/(main)/user/[username]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma"; // optional if you use Prisma

// ✅ Notice that params is now wrapped in a Promise
export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  // Unwrap the params Promise
  const { username } = await params;

  // Optional: load user data from database
  // const user = await prisma.user.findUnique({ where: { username } });
  // if (!user) return notFound();

  return (
    <main className="p-8 text-center">
      <h1 className="text-3xl font-bold text-white">
        User Profile: {username}
      </h1>
      <p className="text-gray-400 mt-4">
        This is {username}'s public page.
      </p>
    </main>
  );
}
