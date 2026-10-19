/** Case, spacing and punctuation never count against a typed answer. */
export function normalizeWord(s: string) {
  return s.toLowerCase().replace(/[^a-z]/g, '');
}

/** True if one inserted, deleted or changed letter turns `a` into `b`. */
function withinOneEdit(a: string, b: string) {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (b.length > a.length) j++;
    else {
      i++;
      j++;
    }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

/**
 * The target `given` names, if any. A plural ("frogs", "tomatoes") still counts, and so does one typo
 * in a long word: we're testing memory, not spelling ("obsequous" for "obsequious").
 */
export function matchWord(given: string, targets: string[]): string | null {
  const g = normalizeWord(given);
  if (!g) return null;
  const exact = targets.find((t) => {
    const n = normalizeWord(t);
    return g === n || g === `${n}s` || g === `${n}es`;
  });
  if (exact) return exact;
  return (
    targets.find((t) => {
      const n = normalizeWord(t);
      return n.length >= 7 && withinOneEdit(g, n);
    }) ?? null
  );
}
