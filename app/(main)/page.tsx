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

