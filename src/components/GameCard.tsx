import Link from "next/link";
import type { Game } from "@/types/game";

type GameCardProps = {
  game: Game;
  onEdit: () => void;
  onDelete: () => void;
};

const statusLabels = {
  "not-started": "ยังไม่เริ่ม",
  playing: "กำลังเล่น",
  completed: "เล่นจบแล้ว",
} as const;

export default function GameCard({ game, onEdit, onDelete }: GameCardProps) {
  return (
    <article className="flex min-w-0 flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div>
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            {statusLabels[game.status]}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">{game.platform}</span>
        </div>
        <h2 className="mt-4 break-words text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          <Link href={`/games/${game.id}`} className="hover:underline">{game.name}</Link>
        </h2>
      </div>
      <p className="mt-6 border-t border-zinc-100 pt-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        คาดว่าจะใช้เล่น {game.hours} ชั่วโมง
      </p>
      <div className="mt-4 flex flex-wrap justify-end gap-3">
        <button type="button" onClick={onEdit} className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50">แก้ไข</button>
        <button type="button" onClick={onDelete} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50">ลบ</button>
      </div>
    </article>
  );
}
