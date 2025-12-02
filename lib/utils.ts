export async function readInput(path: string) {
  const rawInput = await Bun.file(path).text();
  return rawInput.split(/\r?\n/);
}

export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export function time<T>(fn: () => T) {
  const start = Date.now();
  const result = fn();
  const end = Date.now();

  return {
    result,
    timeMs: end - start,
  };
}
