export async function readInput(path: string) {
  const rawInput = await Bun.file(path).text();
  return rawInput.split(/\r?\n/);
}

export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}
