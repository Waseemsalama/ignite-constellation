// app/api/users/[username]/route.ts
import { NextResponse } from "next/server";

// ✅ Safe default handler for Next.js 15
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  return NextResponse.json({
    username,
    message: `API active: ${username}`,
  });
}
