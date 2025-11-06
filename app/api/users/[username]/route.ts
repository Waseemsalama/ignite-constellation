// app/api/users/[username]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params;

  return NextResponse.json({
    username,
    message: `Hello ${username}, your API route is working!`,
  });
}
