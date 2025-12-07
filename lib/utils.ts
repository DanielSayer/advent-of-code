export async function readInput(path: string) {
  const rawInput = await Bun.file(path).text();
  return rawInput.split(/\r?\n/);
}

export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export function time<T>(id: string, fn: () => T) {
  const t0 = Bun.nanoseconds();
  const result = fn();
  const t1 = Bun.nanoseconds();
  console.log({
    id,
    result,
    timeMs: ((t1 - t0) / 1_000_000).toFixed(3),
  });
}
