"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { Game } from "@/types/game";
import { created, deleted, initialized, updated } from "@/lib/gamesSlice";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";
import GameCard from "@/components/GameCard";
import GameForm, { type GameDraft } from "@/components/GameForm";

type GameExplorerProps = { initialGames: Game[] };

export default function GameExplorer({ initialGames }: GameExplorerProps) {
  const store = useAppStore();
  const initializedRef = useRef(false);
  const dispatch = useAppDispatch();
  const games = useAppSelector((state) => state.games);
  const [keyword, setKeyword] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!initializedRef.current) {
      store.dispatch(initialized(initialGames));
      initializedRef.current = true;
    }
  }, [initialGames, store]);

  const editingGame = games.find((game) => game.id === editingId);
  const searchText = keyword.trim().toLowerCase();
  const visibleGames = games.filter((game) =>
    `${game.name} ${game.platform}`.toLowerCase().includes(searchText),
  );

  function toGame(id: string, draft: GameDraft): Game {
    return { id, name: draft.name.trim(), platform: draft.platform, hours: Number(draft.hours), status: draft.status };
  }

  function handleSave(draft: GameDraft) {
    if (editingId === null) {
      dispatch(created(toGame(crypto.randomUUID(), draft)));
      return;
    }
    dispatch(updated(toGame(editingId, draft)));
    setEditingId(null);
  }

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  return (
    <div className="space-y-6">
      <div id="game-form" className="scroll-mt-6">
        <GameForm key={editingId ?? "new"} initialGame={editingGame} onSave={handleSave} onCancel={() => setEditingId(null)} />
      </div>
      <input type="search" aria-label="ค้นหาเกม" value={keyword} onChange={handleKeywordChange} placeholder="ค้นหาชื่อเกมหรือแพลตฟอร์ม" className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" />
      {visibleGames.length === 0 ? <p className="py-8 text-center text-zinc-600 dark:text-zinc-400">ไม่พบเกมที่ตรงกับคำค้น</p> : <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">{visibleGames.map((game) => <GameCard key={game.id} game={game} onEdit={() => setEditingId(game.id)} onDelete={() => { dispatch(deleted(game.id)); if (editingId === game.id) setEditingId(null); }} />)}</section>}
    </div>
  );
}
