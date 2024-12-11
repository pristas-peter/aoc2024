function getCount(stones: number[], blinks: number) {
  let state = new Map(stones.map((n) => [n, 1]));

  for (let i = 0; i < blinks; i++) {
    const newState = new Map<number, number>();

    state.forEach((count, prevStone) => {
      if (prevStone === 0) {
        newState.set(1, (newState.get(1) ?? 0) + count);
        return;
      }

      const digits = `${prevStone}`;

      if (digits.length % 2 === 0) {
        const middle = digits.length / 2;

        const left = parseInt(digits.slice(0, middle), 10);
        const right = parseInt(digits.slice(middle), 10);

        newState.set(left, (newState.get(left) ?? 0) + count);
        newState.set(right, (newState.get(right) ?? 0) + count);
        return;
      }

      const stone = prevStone * 2024;
      newState.set(stone, (newState.get(stone) ?? 0) + count);
    });

    state = newState;
  }

  return state.values().reduce((sum, n) => sum + n, 0);
}

export function part1(input: string) {
  const stones = input.split(" ").map(Number);
  return getCount(stones, 25);
}

export function part2(input: string) {
  const stones = input.split(" ").map(Number);
  return getCount(stones, 75);
}

Deno.bench("part1", async () => {
  const data = await Deno.readTextFile("./day11.txt");
  part1(data);
});

Deno.bench("part2", async () => {
  const data = await Deno.readTextFile("./day11.txt");
  part2(data);
});
