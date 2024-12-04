interface Point {
  x: number;
  y: number;
  char: string;
}

function parse(input: string) {
  return input.split("\n").map((line, y) => {
    return line.split("").map((char, x) => {
      return {
        x,
        y,
        char,
      };
    });
  });
}

function getStrings(data: Point[][], { x, y }: Point) {
  const pick = (x: number, y: number) => {
    return data[y]?.[x]?.char ?? "";
  };

  let horizontal = "";
  let horizontalRev = "";
  let vertical = "";
  let verticalRev = "";
  let topLeftDiagonal = "";
  let bottomLeftDiagonal = "";
  let topRightDiagonal = "";
  let bottomRightDiagonal = "";

  for (let c = 0; c < 4; c++) {
    horizontal += pick(x + c, y);
    horizontalRev += pick(x - c, y);
    vertical += pick(x, y + c);
    verticalRev += pick(x, y - c);

    topLeftDiagonal += pick(x - c, y - c);
    bottomLeftDiagonal += pick(x - c, y + c);
    topRightDiagonal += pick(x + c, y - c);
    bottomRightDiagonal += pick(x + c, y + c);
  }

  return [
    horizontal,
    horizontalRev,
    vertical,
    verticalRev,
    topLeftDiagonal,
    bottomLeftDiagonal,
    topRightDiagonal,
    bottomRightDiagonal,
  ];
}

function getDiagonal(data: Point[][], { x, y }: Point) {
  const pick = (x: number, y: number) => data[y]?.[x]?.char ?? "";

  const leftDiagonal = pick(x - 1, y - 1) + pick(x, y) + pick(x + 1, y + 1);
  const rightDiagonal = pick(x + 1, y - 1) + pick(x, y) + pick(x - 1, y + 1);

  return [leftDiagonal, rightDiagonal];
}
export function part1(input: string) {
  const data = parse(input);

  let result = 0;

  for (const line of data) {
    for (const point of line) {
      const strings = getStrings(data, point);
      result += strings.filter((s) => s === "XMAS" || s === "SAMX").length / 2;
    }
  }

  return result;
}

export function part2(input: string) {
  const data = parse(input);

  let result = 0;

  for (const line of data) {
    for (const point of line) {
      const strings = getDiagonal(data, point);
      if (strings.filter((s) => s === "MAS" || s === "SAM").length === 2) {
        result++;
      }
    }
  }

  return result;
}

Deno.bench("part1", async () => {
  const data = await Deno.readTextFile("./day4.txt");
  part1(data);
});

Deno.bench("part2", async () => {
  const data = await Deno.readTextFile("./day4.txt");
  part2(data);
});
