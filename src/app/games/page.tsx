import type { Metadata } from "next";
import { games } from "@/data/games";
import GameExplorer from "@/components/GameExplorer";

export const metadata: Metadata = { title: "Game" };

export default function GamesPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">Game</h1>
      <GameExplorer initialGames={games} />
    </main>
  );
}
