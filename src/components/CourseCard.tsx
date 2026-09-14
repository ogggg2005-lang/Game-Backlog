import type { Course } from "../types/course";
import Link from "next/link";
import CounterDemo from "./CounterDemo";

type CourseCardProps = {
  course: Course;
  description?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function CourseCard({
  course,
  description,
  onEdit,
  onDelete,
}: CourseCardProps) {
  return (
    <article className="flex min-w-0 flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div>
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {course.code}
          </span>
        </div>

        <h2 className="mt-4 break-words text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          <Link href={`/courses/${course.id}`} className="hover:underline">
            {course.name}
          </Link>
        </h2>

        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {course.instructor}
        </p>

        {description && (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <span>หน่วยกิต</span>
        <span className="font-medium text-zinc-900 dark:text-zinc-100">
          {course.credit} หน่วยกิต
        </span>
      </div>

      <div className="mt-4 flex flex-wrap justify-end gap-3">
        <CounterDemo />
        {onEdit ? (
          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            แก้ไข
          </button>
        ) : null}
        {onDelete ? (
          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            ลบ
          </button>
        ) : null}
      </div>
    </article>
  );
}