import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Game } from "@/types/game";

const gamesSlice = createSlice({
  name: "games",
  initialState: [] as Game[],
  reducers: {
    initialized: (_state, action: PayloadAction<Game[]>) => action.payload,
    created: (state, action: PayloadAction<Game>) => {
      state.push(action.payload);
    },
    deleted: (state, action: PayloadAction<string>) =>
      state.filter((game) => game.id !== action.payload),
    updated: (state, action: PayloadAction<Game>) => {
      const index = state.findIndex((game) => game.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { initialized, created, deleted, updated } = gamesSlice.actions;
export default gamesSlice.reducer;
