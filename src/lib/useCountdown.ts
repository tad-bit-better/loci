import { useEffect, useState } from 'react';

/** Seconds left from `total`, ticking once per second. */
export function useCountdown(total: number, running = true) {
  const [left, setLeft] = useState(total);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [running]);
  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, '0');
  return { left, label: `${mm}:${ss}`, done: left === 0 };
}
