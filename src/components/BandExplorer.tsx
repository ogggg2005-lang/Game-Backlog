"use client";

import { useState, type ChangeEvent } from "react";
import type { Band } from "@/types/band";
import BandCard from "./BandCard";

type BandExplorerProps = {
  bands: Band[];
};

export default function BandExplorer({ bands }: BandExplorerProps) {
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "foundedYear">("name");
  const [followedBandIds, setFollowedBandIds] = useState<Set<number>>(
    new Set(),
  );
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
  const searchText = keyword.trim().toLowerCase();
  const visibleBands = bands.filter((band) =>
    band.name.toLowerCase().includes(searchText),
  );
  const sortedBands = [...visibleBands].sort((firstBand, secondBand) =>
    sortBy === "name"
      ? firstBand.name.localeCompare(secondBand.name)
      : firstBand.foundedYear - secondBand.foundedYear,
  );
  const hasActiveFilters = keyword.trim() !== "" || sortBy !== "name";

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleSortChange(event: ChangeEvent<HTMLSelectElement>) {
    setSortBy(event.target.value as "name" | "foundedYear");
  }

  function handleReset() {
    setKeyword("");
    setSortBy("name");
  }

  function handleToggleFollow(bandId: number) {
    setFollowedBandIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (nextIds.has(bandId)) {
        nextIds.delete(bandId);
      } else {
        nextIds.add(bandId);
      }

      return nextIds;
    });
  }

  function handleLike(bandId: number) {
    setLikeCounts((currentCounts) => ({
      ...currentCounts,
      [bandId]: (currentCounts[bandId] ?? 0) + 1,
    }));
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-end">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            เรียงตาม
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="cursor-pointer rounded-md border border-zinc-300 bg-white px-2.5 py-2 text-sm text-zinc-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            >
              <option value="name">ชื่อวง</option>
              <option value="foundedYear">ปีที่ก่อตั้ง</option>
            </select>
          </label>
        </div>
        <div className="flex flex-wrap items-start gap-3">
          <input
            type="search"
            aria-label="ค้นหาวงดนตรี"
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="ค้นหาชื่อวงดนตรี"
            className="h-12 min-w-[16rem] flex-1 rounded-lg border border-zinc-300 bg-white px-4 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
          <button
            type="button"
            onClick={handleReset}
            className={`h-12 rounded-lg px-4 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
              hasActiveFilters
                ? "border border-red-500 bg-red-500 text-white hover:bg-red-600"
                : "border border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            }`}
          >
            รีเซ็ต
          </button>
        </div>
      </div>

      <p className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-800 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-200">
        ติดตามอยู่ {followedBandIds.size} วง
      </p>

      {sortedBands.length > 0 ? (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedBands.map((band) => (
            <BandCard
              key={band.id}
              band={band}
              isFollowing={followedBandIds.has(band.id)}
              likeCount={likeCounts[band.id] ?? 0}
              onToggleFollow={handleToggleFollow}
              onLike={handleLike}
            />
          ))}
        </section>
      ) : (
        <p className="py-8 text-center text-zinc-600 dark:text-zinc-400">
          ไม่พบวงดนตรีที่ค้นหา
        </p>
      )}
    </div>
  );
}
