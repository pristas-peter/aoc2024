function parse(input: string) {
  const pageOrderingRules: Record<number, number[]> = {};
  const updates: number[][] = [];

  for (const line of input.split("\n")) {
    if (line.includes("|")) {
      const [a, b] = line.split("|");

      let page = Number(a);
      let dep = Number(b);

      if (!pageOrderingRules[page]) {
        pageOrderingRules[page] = [];
      }

      pageOrderingRules[page].push(dep);
      continue;
    }

    const split = line.split(",");

    if (split[0] === "") {
      continue;
    }

    updates.push(split.map((s) => Number(s)));
  }

  return {
    pageOrderingRules,
    updates,
  };
}

function isUpdateCorrect(
  update: number[],
  pageOrderingRules: Record<number, number[]>,
) {
  let isCorrect = true;

  const pages: Record<number, true> = {};

  for (const page of update) {
    for (const dep of pageOrderingRules[page] ?? []) {
      if (pages[dep]) {
        isCorrect = false;
        break;
      }
    }

    if (!isCorrect) {
      break;
    }

    pages[page] = true;
  }

  return isCorrect;
}

export function part1(input: string) {
  const { updates, pageOrderingRules } = parse(input);

  const correctUpdates: number[][] = updates.filter((update) => {
    return isUpdateCorrect(update, pageOrderingRules);
  });

  return correctUpdates.reduce((sum, update) => {
    const middle = update[Math.floor(update.length / 2)];
    return sum + middle;
  }, 0);
}

export function part2(input: string) {
  const { updates, pageOrderingRules } = parse(input);
  const updated: number[][] = [];

  for (const update of updates) {
    if (isUpdateCorrect(update, pageOrderingRules)) {
      continue;
    }

    while (!isUpdateCorrect(update, pageOrderingRules)) {
      const pages: Record<number, number> = {};

      for (let index = 0; index < update.length; index++) {
        const page = update[index];

        let didBreak = false;

        for (const dep of pageOrderingRules[page] ?? []) {
          if (pages[dep] !== undefined) {
            const item = update.splice(index, 1)[0];
            update.splice(pages[dep], 0, item);
            didBreak = true;
            break;
          }
        }

        if (didBreak) {
          continue;
        }

        pages[page] = index;
      }
    }

    updated.push(update);
  }

  return updated.reduce((sum, update) => {
    const middle = update[Math.floor(update.length / 2)];
    return sum + middle;
  }, 0);
}

Deno.bench("part1", async () => {
  const data = await Deno.readTextFile("./day5.txt");
  part1(data);
});

Deno.bench("part2", async () => {
  const data = await Deno.readTextFile("./day5.txt");
  part2(data);
});
