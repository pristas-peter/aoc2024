export function part1(input: string) {
  const matches = input.match(/mul\((\d{1,3}),(\d{1,3}\))/g);

  return matches!.reduce((sum, mul) => {
    const [a, b] = mul.replace("mul(", "").replace(")", "").split(",").map(
      (s) => Number(s),
    );

    return sum + (a * b);
  }, 0);
}

export function part2(input: string) {
  const newInput = input.replaceAll("\n", "").replaceAll(
    /don't\(\).*?do\(\)/g,
    "",
  ).replace(/don't\(\).*$/g, "");

  return part1(newInput);
}

Deno.bench("part1", async () => {
  const data = await Deno.readTextFile("./day3.txt");
  part1(data);
});

Deno.bench("part2", async () => {
  const data = await Deno.readTextFile("./day3.txt");
  part2(data);
});
