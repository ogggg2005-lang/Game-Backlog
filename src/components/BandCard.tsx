import Image from "next/image";
import type { Band } from "../types/band";

type BandCardProps = {
  band: Band;
  isFollowing: boolean;
  likeCount: number;
  onToggleFollow: (bandId: number) => void;
  onLike: (bandId: number) => void;
};

export default function BandCard({
  band,
  isFollowing,
  likeCount,
  onToggleFollow,
  onLike,
}: BandCardProps) {
  return (
    <article className="border rounded-xl p-4 shadow-sm bg-white dark:bg-zinc-900 flex flex-col justify-between">
      <div>
        <div className="relative w-full h-48 mb-8 overflow-hidden rounded-lg">
          <Image
            src={band.image}
            alt={band.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </div>
        <h2 className="text-xl font-bold text-black dark:text-white">
          {band.name}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          แนวเพลง: {band.genre}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          ก่อตั้ง: {band.foundedYear}
        </p>
        {band.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {band.description}
          </p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-zinc-800">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          สมาชิก:
        </p>
        <ul className="mt-2 space-y-2">
          {band.members.map((member, index) => (
            <li key={index} className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="40px"
                />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {member.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-3 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => onToggleFollow(band.id)}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isFollowing
              ? "bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isFollowing ? "เลิกติดตาม" : "ติดตาม"}
        </button>
        <button
          type="button"
          onClick={() => onLike(band.id)}
          className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
        >
          Like {likeCount}
        </button>
      </div>
    </article>
  );
}