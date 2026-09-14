import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Course } from "@/types/course";

const initialState: Course[] = [];

export const coursesSlice = createSlice({
	name: "courses",
	initialState,
	reducers: {
		initialized: (_state, action: PayloadAction<Course[]>) =>
			action.payload,
		created: (state, action: PayloadAction<Course>) => {
			state.push(action.payload);
		},
		deleted: (state, action: PayloadAction<string>) =>
			state.filter((course) => course.id !== action.payload),
		updated: (state, action: PayloadAction<Course>) => {
			const index = state.findIndex((course) => course.id === action.payload.id);

			if (index !== -1) {
				state[index] = action.payload;
			}
		},
	},
});

export const { initialized, created, deleted, updated } = coursesSlice.actions;
export type CoursesAction =
	| ReturnType<typeof created>
	| ReturnType<typeof deleted>
	| ReturnType<typeof updated>;
export default coursesSlice.reducer;
