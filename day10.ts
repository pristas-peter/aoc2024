interface Point {
  x: number;
  y: number;
}

function parse(input: string) {
  const start: Point[] = [];

  const map = input.split("\n").map((line, y) => {
    return line.split("").map((char, x) => {
      const n = Number(char);

      if (n === 0) {
        start.push({ x, y });
      }

      return n;
    });
  });

  return { map, start };
}

function left({ x, y }: Point) {
  return { x: x - 1, y };
}
function right({ x, y }: Point) {
  return { x: x + 1, y };
}
function top({ x, y }: Point) {
  return { x: x, y: y - 1 };
}
function down({ x, y }: Point) {
  return { x, y: y + 1 };
}

export function part1(input: string) {
  const { map, start } = parse(input);

  let score = 0;

  start.forEach((point) => {
    const visited = new Set<string>();

    function visit(y: number, x: number) {
      const key = `x${x}y${y}`;
      if (visited.has(key)) {
        return;
      }

      visited.add(key);

      const level = Number(map[y][x]);

      if (level === 9) {
        score++;
        return;
      }

      const nextLevel = level + 1;

      [left, right, top, down].forEach((fn) => {
        const nextPoint = fn({ x, y });

        if (map[nextPoint.y]?.[nextPoint.x] === nextLevel) {
          visit(nextPoint.y, nextPoint.x);
        }
      });
    }
    visit(point.y, point.x);
  });

  return score;
}

export function part2(input: string) {
  const { map, start } = parse(input);

  const visited: Record<string, number> = {};

  start.forEach((point) => {
    function visit(y: number, x: number) {
      const key = `x${x}y${y}`;

      const level = Number(map[y][x]);

      if (level === 9) {
        visited[key] = (visited[key] ?? 0) + 1;
        return;
      }

      const nextLevel = level + 1;

      [left, right, top, down].forEach((fn) => {
        const nextPoint = fn({ x, y });

        if (map[nextPoint.y]?.[nextPoint.x] === nextLevel) {
          visit(nextPoint.y, nextPoint.x);
        }
      });
    }
    visit(point.y, point.x);
  });

  return Object.values(visited).reduce((sum, n) => sum + n, 0);
}

Deno.bench("part1", async () => {
  const data = await Deno.readTextFile("./day10.txt");
  part1(data);
});

Deno.bench("part2", async () => {
  const data = await Deno.readTextFile("./day10.txt");
  part2(data);
});
