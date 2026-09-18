import Link from "next/link";
import { CircleCheckBig, CircleDashed, PlayCircle, Trash2, type LucideIcon } from "lucide-react";
import type { Game, GameStatus } from "@/types/game";

type GameCardProps = {
  game: Game;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: GameStatus) => void;
};

const statusClassNames = {
  "not-started": "border-zinc-300 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  playing: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
  completed: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300",
} as const;

const statusOptions: Array<{ value: GameStatus; label: string; Icon: LucideIcon }> = [
  { value: "not-started", label: "ยังไม่เริ่มเล่น", Icon: CircleDashed },
  { value: "playing", label: "กำลังเล่น", Icon: PlayCircle },
  { value: "completed", label: "เล่นจบแล้ว", Icon: CircleCheckBig },
];

export default function GameCard({
  game,
  onEdit,
  onDelete,
  onStatusChange,
}: GameCardProps) {
  return (
    <article className="flex min-w-0 flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            สถานะ
            <div className="flex gap-1" role="group" aria-label={`สถานะของ ${game.name}`}>
              {statusOptions.map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onStatusChange(value)}
                  aria-label={label}
                  title={label}
                  aria-pressed={game.status === value}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition ${game.status === value ? statusClassNames[value] : "border-zinc-200 bg-white text-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800"}`}
                >
                  <Icon size={16} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">{game.platform}</span>
        </div>
        <h2 className="mt-4 break-words text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          <Link href={`/games/${game.id}`} className="hover:underline">{game.name}</Link>
        </h2>
      </div>
      <p className="mt-6 border-t border-zinc-100 pt-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        {game.status === "playing"
          ? `ดำเนินการเล่นอยู่ ${game.hours} ชั่วโมง`
          : game.status === "completed"
            ? `ใช้เวลาไปทั้งหมด ${game.hours} ชั่วโมง`
          : `คาดว่าจะใช้เล่น ${game.hours} ชั่วโมง`}
      </p>
      <div className="mt-4 flex flex-wrap justify-end gap-3">
        <Link href={`/games/${game.id}`} className="inline-flex h-10 items-center rounded-lg border border-zinc-300 px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">รายละเอียด</Link>
        <button type="button" onClick={onEdit} className={`inline-flex h-10 cursor-pointer items-center rounded-lg border px-4 text-sm font-medium transition-opacity hover:opacity-80 ${statusClassNames[game.status]}`}>แก้ไข</button>
        <button type="button" onClick={onDelete} aria-label={`ลบ ${game.name}`} title="ลบเกม" className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-red-200 p-0 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/50">
          <Trash2 size={18} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
