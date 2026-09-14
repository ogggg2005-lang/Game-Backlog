import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "@/lib/coursesSlice";
import gamesReducer from "@/lib/gamesSlice";
import type { Course } from "@/types/course";

export const makeStore = (initialCourses: Course[] = []) => {
	return configureStore({
		reducer: {
			courses: coursesReducer,
			games: gamesReducer,
		},
		preloadedState: { courses: initialCourses },
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export type StoreProviderProps = {
	initialCourses: Course[];
	children: React.ReactNode;
};
