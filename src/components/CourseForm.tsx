"use client"; 
 
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"; 
import type { Course } from "@/types/course";
 
export type CourseDraft = { 
  code: string; 
  name: string; 
  credit: string; 
  instructor: string; 
}; 
 
const emptyDraft: CourseDraft = { 
  code: "", 
  name: "", 
  credit: "", 
  instructor: "", 
}; 

type CourseFormProps = {
  initialCourse?: Course;
  onSave: (draft: CourseDraft) => void;
  onCancel: () => void;
};

function toDraft(course?: Course): CourseDraft {
  if (!course) {
    return emptyDraft;
  }

  return {
    code: course.code,
    name: course.name,
    credit: String(course.credit),
    instructor: course.instructor,
  };
};

type FormErrors = Partial<Record<keyof CourseDraft, string>>;

function validate(value: CourseDraft): FormErrors {
  const nextErrors: FormErrors = {};

  if (value.code.trim() === "") {
    nextErrors.code = "กรุณาระบุรหัสวิชา";
  }

  if (value.name.trim() === "") {
    nextErrors.name = "กรุณาระบุชื่อวิชา";
  }

  if (value.instructor.trim() === "") {
    nextErrors.instructor = "กรุณาระบุชื่อผู้สอน";
  }

  const credit = Number(value.credit);
  if (!Number.isInteger(credit) || credit < 1 || credit > 6) {
    nextErrors.credit = "หน่วยกิตต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 6";
  }

  return nextErrors;
}
 
export default function CourseForm({
  initialCourse,
  onSave,
  onCancel,
}: CourseFormProps) { 
  // เติม: Hook ที่ใช้ประกาศตัวแปรสถานะภายใน Component 
  const [draft, setDraft] = useState<CourseDraft>(toDraft(initialCourse)); 
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setDraft(toDraft(initialCourse));
    setErrors({});
  }, [initialCourse]);

  const isFormValid = Object.keys(validate(draft)).length === 0;
  const inputClassName =
    "h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }
 
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {initialCourse ? "แก้ไขรายวิชา" : "เพิ่มรายวิชาใหม่"}
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          กรอกข้อมูลรายวิชาให้ครบถ้วน
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="code" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            รหัสวิชา
          </label>
          <input
            id="code"
            name="code"
            type="text"
            value={draft.code}
            onChange={handleChange}
            className={inputClassName}
            aria-invalid={!!errors.code}
            aria-describedby={errors.code ? "code-error" : undefined}
          />
          {errors.code ? <p id="code-error" className="text-sm text-red-600">{errors.code}</p> : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="credit" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            หน่วยกิต
          </label>
          <input
            id="credit"
            name="credit"
            type="number"
            inputMode="numeric"
            min="1"
            max="6"
            value={draft.credit}
            onChange={handleChange}
            className={inputClassName}
            aria-invalid={!!errors.credit}
            aria-describedby={errors.credit ? "credit-error" : undefined}
          />
          {errors.credit ? <p id="credit-error" className="text-sm text-red-600">{errors.credit}</p> : null}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            ชื่อวิชา
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={draft.name}
            onChange={handleChange}
            className={inputClassName}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name ? <p id="name-error" className="text-sm text-red-600">{errors.name}</p> : null}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="instructor" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            ผู้สอน
          </label>
          <input
            id="instructor"
            name="instructor"
            type="text"
            value={draft.instructor}
            onChange={handleChange}
            className={inputClassName}
            aria-invalid={!!errors.instructor}
            aria-describedby={errors.instructor ? "instructor-error" : undefined}
          />
          {errors.instructor ? <p id="instructor-error" className="text-sm text-red-600">{errors.instructor}</p> : null}
        </div>
      </div>

      <div className="flex flex-col-reverse justify-end gap-3 border-t border-zinc-100 pt-4 sm:flex-row dark:border-zinc-800">
        {initialCourse ? (
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-lg border border-zinc-300 px-5 py-2.5 font-medium text-zinc-700 transition hover:bg-zinc-100 sm:w-auto dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            ยกเลิก
          </button>
        ) : null}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full rounded-lg px-5 py-2.5 font-medium text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto ${
            isFormValid
              ? "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
              : "cursor-not-allowed bg-red-600 focus:ring-red-500"
          }`}
        >
          บันทึก
        </button>
      </div>
    </form>
  );
}