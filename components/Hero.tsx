"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto p-12 text-center">
      <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Ignite Constellation
      </h1>
      <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Create your star in the sky. Share your story. Light up the world.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/ignite" className="btn text-lg px-8 py-3">
          Ignite Your Star
        </Link>
        <Link href="/constellation" className="btn text-lg px-8 py-3 bg-transparent border-2 border-primary">
          View Constellation
        </Link>
      </div>
    </section>
  );
}

