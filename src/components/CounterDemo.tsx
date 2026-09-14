"use client";

import { useState } from "react";

export default function CounterDemo() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount((prevCount) => prevCount + 1);
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-400"
        >
            คลิกแล้ว {count} ครั้ง
        </button>
    );
} 