import type { Game } from "@/types/game";

export const games: Game[] = [
  {
    id: "elden-ring",
    name: "Elden Ring",
    platform: "PC",
    hours: 80,
    status: "not-started",
  },
  {
    id: "the-witcher-3",
    name: "The Witcher 3: Wild Hunt",
    platform: "PlayStation 5",
    hours: 100,
    status: "playing",
  },
  {
    id: "hades",
    name: "Hades",
    platform: "Nintendo Switch",
    hours: 25,
    status: "completed",
  },
  {
    id: "baldurs-gate-3",
    name: "Baldur's Gate 3",
    platform: "PC",
    hours: 120,
    status: "not-started",
  },
  {
    id: "astro-bot",
    name: "Astro Bot",
    platform: "PlayStation 5",
    hours: 15,
    status: "not-started",
  },
];
