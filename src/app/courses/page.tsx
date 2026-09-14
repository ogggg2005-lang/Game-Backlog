import type { Metadata } from "next";
import { courses } from "@/data/courses";
import CourseExplorer from "@/components/CourseExplorer";

export const metadata: Metadata = {
  title: "รายวิชาทั้งหมด",
};

export default function CoursesPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
        รายวิชาทั้งหมด
      </h1>
      <CourseExplorer initialCourses={courses} />
    </main>
  );
}