import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { games } from "@/data/games";

type GamePageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { id } = await params;
  const game = games.find((item) => item.id === id);
  return { title: game ? game.name : "ไม่พบเกม" };
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params;
  const game = games.find((item) => item.id === id);
  if (!game) notFound();

  const statusLabels = { "not-started": "ยังไม่เริ่ม", playing: "กำลังเล่น", completed: "เล่นจบแล้ว" } as const;
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <article className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{game.name}</h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">แพลตฟอร์ม: {game.platform}</p>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">เวลาที่คาดว่าจะเล่น: {game.hours} ชั่วโมง</p>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">สถานะ: {statusLabels[game.status]}</p>
      </article>
    </main>
  );
}
