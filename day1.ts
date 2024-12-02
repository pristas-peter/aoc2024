function parse(input: string) {
  const a: number[] = [];
  const b: number[] = [];

  input.split("\n").forEach((line) => {
    const match = line.match(/^(\d+) +(\d+)$/);

    a.push(Number(match![1]));
    b.push(Number(match![2]));
  });

  return [a, b];
}

export function part1(input: string) {
  const [a, b] = parse(input);

  const aSorted = a.toSorted();
  const bSorted = b.toSorted();

  const distances: number[] = [];

  for (let i = 0; i < aSorted.length; i++) {
    distances.push(Math.abs(aSorted[i] - bSorted[i]));
  }

  return distances.reduce((sum, i) => {
    return sum + i;
  }, 0);
}

export function part2(input: string) {
  const [a, b] = parse(input);

  const similarity: number[] = [];

  const bCounts: Record<number, number> = {};

  b.forEach((num) => {
    bCounts[num] = (bCounts[num] ?? 0) + 1;
  });

  a.forEach((num, index) => {
    similarity[index] = (bCounts[num] ?? 0) * num;
  });

  return similarity.reduce((sum, i) => {
    return sum + i;
  }, 0);
}

Deno.bench("part1", async () => {
  const data = await Deno.readTextFile("./day1.txt");
  part1(data);
});

Deno.bench("part2", async () => {
  const data = await Deno.readTextFile("./day1.txt");
  part2(data);
});
