# Ignite Constellation — Option C Production Scaffold

> Next.js 15 (App Router) • TailwindCSS • Prisma • Supabase (Postgres + Realtime) • NextAuth (Google + TikTok + Credentials) • Stripe (points checkout + webhook) • Mapbox (country→city) • Three.js (constellation stub) • TikTok Share Kit.
>
> ⚠️ Replace all `YOUR_*` placeholders. Start by copying `.env.example` → `.env.local`.

---

## 0) Directory Layout

```
ignite-constellation/
├─ app/
│  ├─ (auth)/
│  │  ├─ login/page.tsx
│  │  └─ signup/page.tsx
│  ├─ (main)/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx                      # landing
│  │  ├─ ignite/page.tsx               # choose city/name → CTA to Stripe
│  │  ├─ success/page.tsx              # post-checkout → capsule form
│  │  ├─ constellation/page.tsx        # 3D sky (Three.js stub)
│  │  ├─ leaderboard/page.tsx          # city + points rankings
│  │  ├─ messages/page.tsx             # global public capsules feed
│  │  ├─ feed/page.tsx                 # following feed
│  │  ├─ points/page.tsx               # balance + history + buy
│  │  ├─ invite/page.tsx               # referral link
│  │  └─ user/[username]/page.tsx      # public profile
│  ├─ account/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx                      # dashboard
│  │  ├─ settings/page.tsx
│  │  └─ password/page.tsx
│  ├─ api/
│  │  ├─ auth/[...nextauth]/route.ts
│  │  ├─ checkout/route.ts
│  │  ├─ stripe-webhook/route.ts
│  │  ├─ share/route.ts
│  │  ├─ stars/route.ts
│  │  ├─ follow/route.ts
│  │  ├─ like/route.ts
│  │  ├─ comment/route.ts
│  │  ├─ points/add/route.ts
│  │  ├─ points/history/route.ts
│  │  ├─ referral/route.ts
│  │  └─ citystats/recalc/route.ts      # secure cron endpoint
├─ components/
│  ├─ Navbar.tsx
│  ├─ Footer.tsx
│  ├─ Hero.tsx
│  ├─ CityForm.tsx
│  ├─ CapsuleForm.tsx
│  ├─ ShareToTikTok.tsx
│  ├─ FollowButton.tsx
│  ├─ LikeButton.tsx
│  ├─ CommentList.tsx
│  ├─ CommentForm.tsx
│  ├─ LeaderboardTable.tsx
│  ├─ FeedList.tsx
│  ├─ ProfileCard.tsx
│  ├─ StarSky.tsx                      # R3F stub
│  └─ MapboxCountry.tsx               # country→city map stub
├─ lib/
│  ├─ prisma.ts
│  ├─ auth.ts
│  ├─ points.ts
│  ├─ colors.ts
│  ├─ map.ts
│  └─ utils.ts
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.ts
├─ public/
│  ├─ logo.svg
│  └─ sounds/ignite.mp3
├─ styles/globals.css
├─ tailwind.config.ts
├─ postcss.config.js
├─ tsconfig.json
├─ next.config.ts
├─ package.json
└─ .env.example
```

---

## 1) package.json
```json
{
  "name": "ignite-constellation",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "prisma:push": "prisma db push",
    "prisma:studio": "prisma studio",
    "seed": "tsx prisma/seed.ts"
  },
  "dependencies": {
    "@auth/prisma-adapter": "^1.0.12",
    "@mapbox/mapbox-gl-geocoder": "^5.0.1",
    "@react-three/drei": "^9.105.0",
    "@react-three/fiber": "^8.15.17",
    "@supabase/supabase-js": "^2.45.4",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.452.0",
    "mapbox-gl": "^3.4.0",
    "next": "15.0.0",
    "next-auth": "^5.0.0",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-hook-form": "^7.53.0",
    "stripe": "^16.0.0",
    "three": "^0.160.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/mapbox-gl": "^2.7.20",
    "@types/node": "^20.11.30",
    "@types/react": "^18.2.73",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.0",
    "eslint-config-next": "15.0.0",
    "postcss": "^8.4.35",
    "prisma": "^5.19.0",
    "tailwindcss": "^3.4.10",
    "tsx": "^4.16.2",
    "typescript": "^5.6.2"
  }
}
```

---

## 2) `.env.example`
```bash
# Database (Supabase Postgres direct URL)
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@YOUR_HOST:5432/postgres

# Supabase (for client JS + service role server-side)
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE

# NextAuth core
NEXTAUTH_SECRET=YOUR_RANDOM_SECRET
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
TIKTOK_CLIENT_KEY=YOUR_TIKTOK_CLIENT_KEY
TIKTOK_CLIENT_SECRET=YOUR_TIKTOK_CLIENT_SECRET

# Stripe
STRIPE_SECRET_KEY=sk_test_123
STRIPE_WEBHOOK_SECRET=whsec_123

# Mapbox
MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoiYOUR_MAPBOX_TOKEN"

# App
SITE_URL=http://localhost:3000
```

---

## 3) `prisma/schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// NextAuth base models
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? 
  access_token      String? 
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  @@id([identifier, token])
}

// App models
model User {
  id            String    @id @default(cuid())
  name          String
  email         String?   @unique
  password      String?
  image         String?
  city          String?
  bio           String?
  googleId      String?   @unique
  points        Int       @default(0)
  invitedBy     String?
  referralCode  String?   @unique
  createdAt     DateTime  @default(now())

  accounts      Account[]
  sessions      Session[]
  crystals      Star[]
  comments      Comment[]
  likes         Like[]
  reshares      Reshare[]
  followers     Follow[]  @relation("Followers")
  following     Follow[]  @relation("Following")
  notifications Notification[]
  pointTx       PointTransaction[]
}

model Star {
  id          String   @id @default(cuid())
  userId      String?
  user        User?    @relation(fields: [userId], references: [id])
  city        String
  name        String?
  color       String   @default("#FFD76B")
  brightness  Float    @default(1.0)
  pointsTier  Int      @default(0)
  ra          Float
  dec         Float
  z           Float
  magnitude   Float    @default(1.0)
  createdAt   DateTime @default(now())
  capsule     Capsule?
  comments    Comment[]
  likes       Like[]
  reshares    Reshare[]
}

model Capsule {
  id        String   @id @default(cuid())
  starId    String   @unique
  text      String?
  isPublic  Boolean  @default(true)
  videoUrl  String?
  createdAt DateTime @default(now())
  Star      Star     @relation(fields: [starId], references: [id], onDelete: Cascade)
}

model Comment {
  id        String   @id @default(cuid())
  text      String
  userId    String
  starId    String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  star      Star     @relation(fields: [starId], references: [id])
  likes     Like[]
}

model Like {
  id        String   @id @default(cuid())
  userId    String
  starId    String?
  commentId String?
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  star      Star?    @relation(fields: [starId], references: [id])
  comment   Comment? @relation(fields: [commentId], references: [id])
}

model Reshare {
  id        String   @id @default(cuid())
  userId    String
  starId    String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  star      Star     @relation(fields: [starId], references: [id])
}

model Follow {
  id          String   @id @default(cuid())
  followerId  String
  followingId String
  createdAt   DateTime @default(now())
  follower    User     @relation("Following", fields: [followerId], references: [id])
  following   User     @relation("Followers", fields: [followingId], references: [id])
  @@unique([followerId, followingId])
}

model Notification {
  id        String   @id @default(cuid())
  userId    String
  fromUserId String?
  type      String   // like | comment | reshare | follow | points
  starId    String?
  message   String?
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  fromUser  User?    @relation("Notifier", fields: [fromUserId], references: [id])
}

model PointTransaction {
  id        String   @id @default(cuid())
  userId    String
  type      String   // share | invite | purchase | bonus
  points    Int
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
}

model CityStat {
  city         String   @id
  country      String
  starsCount   Int      @default(0)
  totalPoints  Int      @default(0)
  brightness   Float    @default(0)
  monthWins    Int      @default(0)
  yearWins     Int      @default(0)
  updatedAt    DateTime @updatedAt
}
```

---

## 4) `lib/prisma.ts`
```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

## 5) `lib/auth.ts` (NextAuth options)
```ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import TikTokProvider from "next-auth/providers/tiktok";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";
import { compare } from "bcryptjs"; // if you hash passwords

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    TikTokProvider({
      clientId: process.env.TIKTOK_CLIENT_KEY!,
      clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Email & Password",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user || !user.password) return null;
        const ok = await compare(credentials.password, user.password);
        return ok ? user : null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) (session.user as any).id = token.sub;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
```

## 6) API Routes (essential)

### `app/api/auth/[...nextauth]/route.ts`
```ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### `app/api/checkout/route.ts` (Stripe points checkout)
```ts
import Stripe from "stripe";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });
  const { priceId, points, userId, successUrl, cancelUrl } = await req.json();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { userId, points: String(points) },
  });
  return Response.json({ id: session.id, url: session.url });
}
```

### `app/api/stripe-webhook/route.ts`
```ts
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const sig = headers().get("stripe-signature")!;
  const raw = await req.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId!;
    const points = parseInt(session.metadata?.points || "0", 10);
    if (userId && points > 0) {
      await prisma.pointTransaction.create({ data: { userId, type: "purchase", points } });
      await prisma.user.update({ where: { id: userId }, data: { points: { increment: points } } });
    }
  }
  return new Response("ok");
}
```

### `app/api/share/route.ts` (reward after TikTok share)
```ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new Response("Unauthorized", { status: 401 });
  const { platform } = await req.json();
  const reward = platform === "tiktok" ? 20 : 10;
  await prisma.pointTransaction.create({ data: { userId: (session.user as any).id, type: platform, points: reward } });
  await prisma.user.update({ where: { id: (session.user as any).id }, data: { points: { increment: reward } } });
  return Response.json({ success: true, points: reward });
}
```

### `app/api/stars/route.ts` (read-only list for map/Three.js)
```ts
import { prisma } from "@/lib/prisma";
export async function GET() {
  const stars = await prisma.star.findMany({
    select: { id: true, city: true, color: true, brightness: true, ra: true, dec: true, z: true }
  });
  return Response.json(stars);
}
```

*(Similar small handlers can be added for follow, like, comment — omitted for brevity.)*

---

## 7) Layout + Global Scripts

### `app/(main)/layout.tsx`
```tsx
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* TikTok Share SDKs */}
        <Script src="https://www.tiktok.com/embed.js" strategy="afterInteractive" />
        <Script src="https://www.tiktok.com/share/embed/sharekit.js" strategy="afterInteractive" />
        {/* Mapbox GL CSS */}
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css" rel="stylesheet" />
      </head>
      <body className="bg-[#0A0E18] text-white min-h-screen">
        <Navbar />
        <main className="min-h-[80vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

---

## 8) Example Pages (stubs)

### Landing `app/(main)/page.tsx`
```tsx
import Hero from "@/components/Hero";
export default function HomePage() {
  return (
    <div>
      <Hero />
      <section className="max-w-5xl mx-auto p-6 grid md:grid-cols-3 gap-6">
        <a className="card" href="/ignite">Ignite</a>
        <a className="card" href="/constellation">Constellation</a>
        <a className="card" href="/leaderboard">Leaderboard</a>
      </section>
    </div>
  );
}
```

### Constellation `app/(main)/constellation/page.tsx`
```tsx
"use client";
import StarSky from "@/components/StarSky";
export default function ConstellationPage() {
  return <StarSky />;
}
```

### Points `app/(main)/points/page.tsx`
```tsx
import Link from "next/link";
export default function PointsPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Your Points</h1>
      <p className="text-gray-300 mt-2">Earn by sharing or buy packs to boost your glow.</p>
      <div className="mt-6 flex gap-3">
        <Link className="btn" href="/invite">Invite Friends</Link>
        <Link className="btn" href="#" onClick={(e)=>e.preventDefault()}>Buy 500 pts (wire to /api/checkout)</Link>
      </div>
    </div>
  );
}
```

---

## 9) Components (selected)

### `components/ShareToTikTok.tsx`
```tsx
"use client";
export default function ShareToTikTok({ mediaUrl, caption }: { mediaUrl: string; caption: string }) {
  const share = async () => {
    // @ts-ignore — ShareKit injected by script
    if (window.TikTokShare) {
      // Open TikTok composer with media + text
      // Fallback: open new window with instructions
      // @ts-ignore
      window.TikTokShare.open({ mediaType: "video", mediaUrl, text: caption });
      await fetch("/api/share", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ platform: "tiktok" }) });
      alert("Shared! You earned points ✨");
    } else {
      alert("TikTok ShareKit not loaded. Try again.");
    }
  };
  return (
    <button onClick={share} className="px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-400">Share on TikTok</button>
  );
}
```

### `components/StarSky.tsx` (Three.js stub)
```tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

export default function StarSky() {
  return (
    <div className="h-[calc(100vh-96px)] w-full">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <color attach="background" args={["#02040A"]} />
        <ambientLight intensity={0.6} />
        <Stars radius={120} depth={50} count={3000} factor={4} fade />
        <OrbitControls enableZoom enablePan />
      </Canvas>
    </div>
  );
}
```

### `components/MapboxCountry.tsx` (country→city stub)
```tsx
"use client";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || process.env.MAPBOX_ACCESS_TOKEN!;

export default function MapboxCountry() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const map = new mapboxgl.Map({ container: ref.current, style: "mapbox://styles/mapbox/dark-v11", center: [-98, 39], zoom: 3 });
    // TODO: add city glow circles from /api/citystats
    return () => map.remove();
  }, []);
  return <div ref={ref} className="h-[500px] w-full rounded-xl overflow-hidden" />;
}
```

---

## 10) Tailwind & Styles

### `tailwind.config.ts`
```ts
import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { primary: "#FFD76B", accent: "#6C63FF", bg: "#0A0E18" },
      boxShadow: { glow: "0 0 24px rgba(255,215,107,.35)" }
    }
  },
  plugins: []
} satisfies Config;
```

### `styles/globals.css`
```css
@tailwind base;@tailwind components;@tailwind utilities;

.card{ @apply bg-[#0f141b] rounded-2xl p-6 shadow-glow hover:scale-[1.01] transition; }
.btn{ @apply px-4 py-2 rounded-lg bg-primary text-black font-semibold shadow-glow; }
```

---

## 11) Auth Pages (stubs)

### `app/(auth)/login/page.tsx`
```tsx
"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <div className="mt-6 flex flex-col gap-3">
        <button className="btn" onClick={() => signIn("google")}>Continue with Google</button>
        <button className="btn bg-pink-500" onClick={() => signIn("tiktok")}>Continue with TikTok</button>
      </div>
    </div>
  );
}
```

### `app/(auth)/signup/page.tsx`
```tsx
import Link from "next/link";
export default function SignupPage(){
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold">Create account</h1>
      <p className="text-gray-400 mt-2">Prefer Google or TikTok? <Link className="underline" href="/login">Sign in</Link>.</p>
      {/* Implement credentials form later if desired */}
    </div>
  );
}
```

---

## 12) Navbar (with points indicator)

### `components/Navbar.tsx`
```tsx
import Link from "next/link";

export default function Navbar(){
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/30">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-bold text-primary">✨ Constellation</Link>
        <div className="flex items-center gap-4">
          <Link href="/constellation">Constellation</Link>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/points" className="text-primary font-semibold">⚡ Points</Link>
          <Link href="/login" className="btn">Login</Link>
        </div>
      </nav>
    </header>
  );
}
```

---

## 13) Seed Script (optional)

### `prisma/seed.ts`
```ts
import { prisma } from "@/lib/prisma";

async function main(){
  await prisma.cityStat.upsert({ where: { city: "Fresno" }, update: {}, create: { city: "Fresno", country: "USA" } });
  for(let i=0;i<50;i++){
    await prisma.star.create({ data: { city: "Fresno", color: "#FFD76B", brightness: 1+Math.random(), ra: Math.random()*360, dec: Math.random()*180-90, z: Math.random() } });
  }
  console.log("Seeded Fresno stars");
}
main().finally(()=>process.exit());
```

---

## 14) Next Steps
1. `cp .env.example .env.local` → paste real keys.
2. `npm i` → `npm run prisma:push` → `npm run dev`.
3. Confirm: `/login` (Google/TikTok), `/constellation`, `/points`.
4. Connect Stripe product price IDs to `/api/checkout` payload.
5. Replace StarSky with real points-driven visuals (colors/brightness shader).
6. Wire Mapbox city glow using `/api/citystats` aggregation.

---

### Notes
- TikTok ShareKit availability varies by region/app approval.
- For production, secure cron routes (citystats recalc, monthly winner) via Vercel Cron + secret header.
- Add moderation + rate limiting to comments/likes.
- Consider Supabase Realtime to broadcast new stars and point updates live.

Happy building! 🌌
