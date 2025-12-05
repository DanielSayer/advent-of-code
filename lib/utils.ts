export async function readInput(path: string) {
  const rawInput = await Bun.file(path).text();
  return rawInput.split(/\r?\n/);
}

export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export function time<T>(id: string, fn: () => T) {
  console.time(id);
  const result = fn();
  console.timeEnd(id);
  console.log(id, result);
}
