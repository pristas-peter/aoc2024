interface Point {
  x: number;
  y: number;
}

function parse(input: string) {
  const ant: Record<string, Point[]> = {};
  const map: string[][] = [];

  input.split("\n").forEach((line, y) => {
    line.split("").forEach((char, x) => {
      if (!map[y]) {
        map[y] = [];
      }

      map[y][x] = char;

      if (char !== ".") {
        if (!ant[char]) {
          ant[char] = [];
        }

        ant[char].push({ x, y });
      }
    });
  });

  return {
    ant: ant,
    map,
  };
}

function hashPoint(point: Point) {
  return `x${point.x},y${point.y}`;
}

function getItem(
  map: string[][],
  point: { x: number; y: number },
): string | undefined {
  return map[point.y]?.[point.x];
}

function getAntinodes(
  ant: Record<string, Point[]>,
  map: string[][],
  scale = false,
) {
  const antinodes: Record<string, Point> = {};

  Object.values(ant).forEach((points) => {
    for (let i = 0; i < points.length; i++) {
      if (points.length > 1 && scale) {
        antinodes[hashPoint(points[i])] = points[i];
      }

      for (let j = i + 1; j < points.length; j++) {
        const a = points[i];
        const b = points[j];

        const xDiff = b.x - a.x;
        const yDiff = b.y - a.y;

        let factor = 1;

        while (factor) {
          const a1 = {
            x: a.x - xDiff * factor,
            y: a.y - yDiff * factor,
          };

          const a2 = {
            x: b.x + xDiff * factor,
            y: b.y + yDiff * factor,
          };

          let found = false;

          if (getItem(map, a1)) {
            antinodes[hashPoint(a1)] = a1;
            found = true;
          }
          if (getItem(map, a2)) {
            antinodes[hashPoint(a2)] = a2;
            found = true;
          }

          if (!scale || !found) {
            break;
          }

          factor += 1;
        }
      }
    }
  });

  return Object.values(antinodes);
}

export function part1(input: string) {
  const { ant, map } = parse(input);
  return (getAntinodes(ant, map)).length;
}

export function part2(input: string) {
  const { ant, map } = parse(input);
  return (getAntinodes(ant, map, true)).length;
}

Deno.bench("part1", async () => {
  const data = await Deno.readTextFile("./day8.txt");
  part1(data);
});

Deno.bench("part2", async () => {
  const data = await Deno.readTextFile("./day8.txt");
  part2(data);
});
