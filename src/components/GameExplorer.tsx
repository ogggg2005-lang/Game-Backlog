"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { Game, GameStatus } from "@/types/game";
import {
  created,
  deleted,
  initialized,
  statusUpdated,
  updated,
} from "@/lib/gamesSlice";
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
  const [statusFilter, setStatusFilter] = useState<GameStatus | "all">("all");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (!initializedRef.current) {
      store.dispatch(initialized(initialGames));
      initializedRef.current = true;
    }
  }, [initialGames, store]);

  useEffect(() => {
    if (editingId !== null) {
      document.getElementById("game-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [editingId]);

  const editingGame = games.find((game) => game.id === editingId);
  const searchText = keyword.trim().toLowerCase();
  const visibleGames = games.filter(
    (game) =>
      `${game.name} ${game.platform}`.toLowerCase().includes(searchText) &&
      (statusFilter === "all" || game.status === statusFilter),
  );
  const notStartedHours = games
    .filter((game) => game.status === "not-started")
    .reduce((total, game) => total + game.hours, 0);
  const pendingDeleteGame = games.find((game) => game.id === pendingDeleteId);

  function toGame(id: string, draft: GameDraft): Game {
    return { id, name: draft.name.trim(), platform: draft.platform, hours: Number(draft.hours), status: draft.status };
  }

  function handleSave(draft: GameDraft) {
    if (editingId === null) {
      const newId = typeof crypto.randomUUID === "function" 
        ? crypto.randomUUID() 
        : Date.now().toString(36) + Math.random().toString(36).substring(2);
        
      dispatch(created(toGame(newId, draft)));
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          สถานะ
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as GameStatus | "all")}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          >
            <option value="all">ทั้งหมด</option>
            <option value="not-started">ยังไม่เริ่มเล่น</option>
            <option value="playing">กำลังเล่น</option>
            <option value="completed">เล่นจบแล้ว</option>
          </select>
        </label>
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          เกมที่ยังไม่เริ่มเล่นรวม {notStartedHours} ชั่วโมง
        </p>
      </div>
      {visibleGames.length === 0 ? <p className="py-8 text-center text-zinc-600 dark:text-zinc-400">ไม่พบเกมที่ตรงกับคำค้น</p> : <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">{visibleGames.map((game) => <GameCard key={game.id} game={game} onEdit={() => setEditingId(game.id)} onStatusChange={(status) => dispatch(statusUpdated({ id: game.id, status }))} onDelete={() => setPendingDeleteId(game.id)} />)}</section>}
      {pendingDeleteGame ? (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl dark:bg-zinc-900">
            <h2 className="text-lg font-semibold">ยืนยันการลบเกม</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              ต้องการลบ {pendingDeleteGame.name} ใช่หรือไม่
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button type="button" onClick={() => setPendingDeleteId(null)} className="rounded-lg border border-zinc-300 px-4 py-2">ยกเลิก</button>
              <button type="button" onClick={() => { dispatch(deleted(pendingDeleteGame.id)); setPendingDeleteId(null); }} className="rounded-lg bg-red-600 px-4 py-2 text-white">ยืนยันลบ</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
