import { Chessboard } from "react-chessboard";
export default function Landing() {
  return (
    <main className="bg-zinc-950 text-zinc-100">

      {/* HERO */}
      <section className="border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-20 items-center">

          <div>
            <p className="text-sm text-indigo-400 font-medium">
              Multiplayer Chess with Live Voice
            </p>

            <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-tight">
              Real-time chess,
              <span className="block text-zinc-300">
                built for communication
              </span>
            </h1>

            <p className="mt-6 text-lg text-zinc-400 max-w-xl">
              A professional-grade multiplayer chess platform with integrated
              voice calling. Designed for focus, speed, and clarity.
            </p>

            <div className="mt-10 flex gap-4">
              <button className="px-7 py-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-medium">
                Start playing
              </button>
              <button className="px-7 py-4 rounded-lg border border-zinc-800 hover:bg-zinc-900 transition">
                View demo
              </button>
            </div>
          </div>

          {/* PRODUCT PREVIEW */}
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800  flex items-center justify-center text-zinc-500">
            <Chessboard />
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-12">
        {[
          {
            title: "Real-time multiplayer",
            desc: "Moves are synchronized instantly using WebSocket-based state replication."
          },
          {
            title: "Integrated voice calling",
            desc: "Low-latency, peer-to-peer voice communication built directly into matches."
          },
          {
            title: "Private and public rooms",
            desc: "Create private games or join public matches with structured matchmaking."
          }
        ].map((f) => (
          <div
            key={f.title}
            className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/60"
          >
            <h3 className="text-lg font-medium">{f.title}</h3>
            <p className="mt-3 text-zinc-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* VOICE SECTION */}
      <section className="border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 py-28 text-center">
          <h2 className="text-4xl font-semibold tracking-tight">
            Voice, without friction
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Communication is part of competitive play.
            Voice calling is built into every game — no setup required.
          </p>

          <div className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-full border border-zinc-800 bg-zinc-900">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Voice connected
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-16 text-center">
        {[
          ["Create a room", "Start a private or public match"],
          ["Connect", "Match with an opponent instantly"],
          ["Play and communicate", "Move pieces and talk in real time"]
        ].map(([title, desc], i) => (
          <div key={i}>
            <div className="text-indigo-500 font-medium mb-4">
              Step {i + 1}
            </div>
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="mt-2 text-zinc-400">{desc}</p>
          </div>
        ))}
      </section>

      {/* TECH STACK */}
      <section className="border-t border-zinc-900 py-16 text-center">
        <p className="text-sm text-zinc-400">
          Built with Next.js, Tailwind CSS, WebSockets, WebRTC
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-28 text-center">
        <h2 className="text-4xl font-semibold tracking-tight">
          Start your first match
        </h2>
        <p className="mt-4 text-zinc-400">
          Experience chess designed for real-time communication.
        </p>

        <button className="mt-10 px-8 py-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-medium">
          Get started
        </button>
      </section>

    </main>
  );
}
