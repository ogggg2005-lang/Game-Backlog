import Link from "next/link";
import { games } from "@/data/games";

const statusLabels = {
  "not-started": "ยังไม่เริ่ม",
  playing: "กำลังเล่น",
  completed: "เล่นจบแล้ว",
} as const;

export default function GameShowcase() {
  return (
    <section className="w-full max-w-5xl px-6 pb-16 sm:px-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-600">โชว์เกม</p>
          <h2 className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">เกมในรายการของคุณ</h2>
        </div>
        <Link href="/games" className="text-sm font-semibold text-cyan-700 hover:underline dark:text-cyan-300">
          ดูทั้งหมด
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {games.slice(0, 3).map((game) => (
          <Link
            key={game.id}
            href={`/games/${game.id}`}
            className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-400 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-center justify-between gap-3 text-xs font-semibold">
              <span className="text-cyan-700 dark:text-cyan-300">{statusLabels[game.status]}</span>
              <span className="text-zinc-500 dark:text-zinc-400">{game.platform}</span>
            </div>
            <h3 className="mt-5 break-words text-lg font-bold text-zinc-900 dark:text-zinc-50">{game.name}</h3>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">ประมาณ {game.hours} ชั่วโมง</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
