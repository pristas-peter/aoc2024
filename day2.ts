function parse(input: string): number[][] {
  return input.split("\n").map((line) => line.split(" ").map((s) => Number(s)));
}

enum Direction {
  ASC = "ASC",
  DESC = "DESC",
}

function getDirection(a: number, b: number) {
  if (a < b) {
    return Direction.ASC;
  }

  if (a > b) {
    return Direction.DESC;
  }

  return null;
}

function isReportSafe(report: number[]) {
  let direction: Direction | null = null;
  let isSafe = true;

  for (let i = 0; i < report.length; i++) {
    const current = report[i]!;
    const next = report[i + 1];

    if (next === undefined) {
      continue;
    }

    const currentDirection = getDirection(current, next);

    if (!currentDirection) {
      isSafe = false;
      break;
    }

    if (direction && (direction !== currentDirection)) {
      isSafe = false;
      break;
    }

    const level = Math.abs(current - next);

    if (level > 3 || level < 1) {
      isSafe = false;
      break;
    }

    if (!direction) {
      direction = currentDirection;
    }
  }

  return isSafe;
}

export function part1(input: string) {
  const reports = parse(input);
  return reports.filter(isReportSafe).length;
}

export function part2(input: string) {
  const reports = parse(input);
  let safeReports = 0;

  for (const report of reports) {
    if (isReportSafe(report)) {
      safeReports++;
      continue
    }

    if (report.some((_, i) =>
        isReportSafe(report.filter((_, index) => index !== i))
    )) {
      safeReports++;
    }
  }

  return safeReports;
}

Deno.bench("part1", async () => {
  const data = await Deno.readTextFile("./day2.txt");
  part1(data);
});

Deno.bench("part2", async () => {
  const data = await Deno.readTextFile("./day2.txt");
  part2(data);
});