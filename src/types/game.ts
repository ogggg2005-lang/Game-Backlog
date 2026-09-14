export type GameStatus = "not-started" | "playing" | "completed";

export type Game = {
  id: string;
  name: string;
  platform: string;
  hours: number;
  status: GameStatus;
};
