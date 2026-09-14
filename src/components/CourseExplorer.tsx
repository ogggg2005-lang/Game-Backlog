"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { Course } from "@/types/course";
import CourseCard from "@/components/CourseCard";
import CourseForm, { type CourseDraft } from "@/components/CourseForm";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";
import { created, deleted, initialized, updated } from "@/lib/coursesSlice";

type CourseExplorerProps = {
    initialCourses: Course[];
};

export default function CourseExplorer({
    initialCourses,
}: CourseExplorerProps) {
    const store = useAppStore();
    const isInitialized = useRef(false);
    const courses = useAppSelector((state) => state.courses);
    const dispatch = useAppDispatch();
    const [keyword, setKeyword] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        if (!isInitialized.current) {
            store.dispatch(initialized(initialCourses));
            isInitialized.current = true;
        }
    }, [initialCourses, store]);

    useEffect(() => {
        if (editingId === null) {
            return;
        }

        document.getElementById("course-form")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [editingId]);

    function toCourse(id: string, draft: CourseDraft): Course {
        return {
            id,
            code: draft.code.trim(),
            name: draft.name.trim(),
            credit: Number(draft.credit),
            instructor: draft.instructor.trim(),
        };
    }

    function handleSave(draft: CourseDraft) {
        if (editingId === null) {
            dispatch(created(toCourse(crypto.randomUUID(), draft)));
            return;
        }

        dispatch(updated(toCourse(editingId, draft)));
        setEditingId(null);
    }

    function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
        setKeyword(event.target.value);
    }

    const searchText = keyword.trim().toLowerCase();
    const editingCourse = courses.find((course) => course.id === editingId);
    const visibleCourses = courses.filter(
        (course) =>
            course.name.toLowerCase().includes(searchText) ||
            course.code.toLowerCase().includes(searchText),
    );

    return (
        <div className="space-y-6">
            <div id="course-form" className="scroll-mt-6">
                <CourseForm
                    key={editingId ?? "new"}
                    initialCourse={editingCourse}
                    onSave={handleSave}
                    onCancel={() => setEditingId(null)}
                />
            </div>

            <input
                type="search"
                aria-label="ค้นหารายวิชา"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา"
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            />

            {visibleCourses.length > 0 ? (
                <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {visibleCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            onEdit={() => setEditingId(course.id)}
                            onDelete={() => {
                                dispatch(deleted(course.id));
                                if (editingId === course.id) {
                                    setEditingId(null);
                                }
                            }}
                        />
                    ))}
                </section>
            ) : (
                <p className="py-8 text-center text-zinc-600 dark:text-zinc-400">
                    ไม่พบรายวิชาที่ค้นหา
                </p>
            )}
        </div>
    );
} 