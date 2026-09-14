"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { Game, GameStatus } from "@/types/game";

export type GameDraft = {
  name: string;
  platform: string;
  hours: string;
  status: GameStatus;
};

type GameFormProps = {
  initialGame?: Game;
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

type FormErrors = Partial<Record<keyof GameDraft, string>>;

const emptyDraft: GameDraft = {
  name: "",
  platform: "",
  hours: "",
  status: "not-started",
};

const statusOptions: Array<{ value: GameStatus; label: string }> = [
  { value: "not-started", label: "ยังไม่เริ่ม" },
  { value: "playing", label: "กำลังเล่น" },
  { value: "completed", label: "เล่นจบแล้ว" },
];

function toDraft(game?: Game): GameDraft {
  return game
    ? {
        name: game.name,
        platform: game.platform,
        hours: String(game.hours),
        status: game.status,
      }
    : emptyDraft;
}

function validate(draft: GameDraft): FormErrors {
  const errors: FormErrors = {};
  const hours = Number(draft.hours);

  if (draft.name.trim() === "") {
    errors.name = "กรุณาระบุชื่อเกม";
  }
  if (draft.platform === "") {
    errors.platform = "กรุณาเลือกแพลตฟอร์ม";
  }
  if (!Number.isInteger(hours) || hours <= 0) {
    errors.hours = "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก";
  }

  return errors;
}

export default function GameForm({
  initialGame,
  onSave,
  onCancel,
}: GameFormProps) {
  const [draft, setDraft] = useState<GameDraft>(toDraft(initialGame));
  const [errors, setErrors] = useState<FormErrors>({});
  const isValid = Object.keys(validate(draft)).length === 0;
  const inputClassName =
    "h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-zinc-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

  useEffect(() => {
    setDraft(toDraft(initialGame));
    setErrors({});
  }, [initialGame]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {initialGame ? "แก้ไขเกม" : "เพิ่มเกมใหม่"}
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          บันทึกเกมที่ตั้งใจจะเล่น
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 sm:col-span-2">
          <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">ชื่อเกม</span>
          <input name="name" value={draft.name} onChange={handleChange} className={inputClassName} aria-invalid={!!errors.name} />
          {errors.name ? <span className="block text-sm text-red-600">{errors.name}</span> : null}
        </label>

        <label className="space-y-2">
          <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">แพลตฟอร์ม</span>
          <select name="platform" value={draft.platform} onChange={handleChange} className={inputClassName} aria-invalid={!!errors.platform}>
            <option value="">เลือกแพลตฟอร์ม</option>
            <option value="PC">PC</option>
            <option value="PlayStation 5">PlayStation 5</option>
            <option value="Xbox Series X|S">Xbox Series X|S</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="Mobile phone">Mobile phone</option>
          </select>
          {errors.platform ? <span className="block text-sm text-red-600">{errors.platform}</span> : null}
        </label>

        <label className="space-y-2">
          <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">ชั่วโมงที่คาดว่าจะเล่น</span>
          <input name="hours" type="number" min="1" step="1" inputMode="numeric" value={draft.hours} onChange={handleChange} className={inputClassName} aria-invalid={!!errors.hours} />
          {errors.hours ? <span className="block text-sm text-red-600">{errors.hours}</span> : null}
        </label>

        <label className="space-y-2 sm:col-span-2">
          <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">สถานะ</span>
          <select name="status" value={draft.status} onChange={handleChange} className={inputClassName}>
            {statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
      </div>

      <div className="flex flex-col-reverse justify-end gap-3 border-t border-zinc-100 pt-4 sm:flex-row dark:border-zinc-800">
        {initialGame ? <button type="button" onClick={onCancel} className="rounded-lg border border-zinc-300 px-5 py-2.5 font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">ยกเลิก</button> : null}
        <button type="submit" disabled={!isValid} className={`rounded-lg px-5 py-2.5 font-medium text-white ${isValid ? "bg-emerald-600 hover:bg-emerald-700" : "cursor-not-allowed bg-red-600"}`}>บันทึก</button>
      </div>
    </form>
  );
}
