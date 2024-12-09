function parse(input: string) {
  return input.split("\n").map((line) => {
    const [result, numbers] = line.split(": ");

    return {
      result: Number(result),
      numbers: numbers.split(" ").map((s) => Number(s)),
    };
  });
}

export function part1(input: string) {
  const data = parse(input);
  let count = 0;

  data.forEach(({ result, numbers }) => {
    const a = numbers.shift()!;
    const b = numbers.shift()!;

    const toCompute = [a + b, a * b];

    while (toCompute.length) {
      const copy = [...toCompute];
      toCompute.length = 0;

      const nextNumber = numbers.shift();

      for (let i = 0; i < copy.length; i++) {
        if (nextNumber === undefined) {
          if (copy[i] === result) {
            count += result;
            break;
          }
          continue;
        }

        const add = copy[i] + nextNumber;
        const mul = copy[i] * nextNumber;

        if (add <= result) {
          toCompute.push(add);
        }

        if (mul <= result) {
          toCompute.push(mul);
        }
      }
    }
  });

  return count;
}

export function part2(input: string) {
  const data = parse(input);
  let count = 0;
  data.forEach(({ result, numbers }) => {
    const a = numbers.shift()!;
    const b = numbers.shift()!;

    const toCompute = [a + b, a * b, Number(`${a}${b}`)];

    while (toCompute.length) {
      const copy = [...toCompute];
      toCompute.length = 0;

      const nextNumber = numbers.shift();

      for (let i = 0; i < copy.length; i++) {
        if (nextNumber === undefined) {
          if (copy[i] === result) {
            count += result;
            break;
          }
          continue;
        }

        const add = copy[i] + nextNumber;
        const mul = copy[i] * nextNumber;
        const cont = Number(`${copy[i]}${nextNumber}`);

        if (cont <= result) {
          toCompute.push(cont);
        }

        if (add <= result) {
          toCompute.push(add);
        }

        if (mul <= result) {
          toCompute.push(mul);
        }
      }
    }
  });

  return count;
}

Deno.bench("part1", async () => {
  const data = await Deno.readTextFile("./day7.txt");
  part1(data);
});

Deno.bench("part2", async () => {
  const data = await Deno.readTextFile("./day7.txt");
  part2(data);
});
