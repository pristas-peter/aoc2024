function parse(input: string) {
  return input.split("\n").map((line, y) => {
    return line.split("").map((char, x) => {
      return char;
    });
  });
}

class Point {
  static toInverted(point: Point) {
    return new Point(point.y, point.x);
  }

  static fromString(str: string) {
    const [x, y] = str.split(",").map(Number);
    return new Point(x, y);
  }

  constructor(public readonly x: number, public readonly y: number) {
  }

  get [Symbol.toStringTag]() {
    return `${this.x},${this.y}`;
  }
}

function getNeighbours(point: Point): Point[] {
  const left = new Point(point.x - 1, point.y);
  const right = new Point(point.x + 1, point.y);
  const top = new Point(point.x, point.y - 1);
  const bottom = new Point(point.x, point.y + 1);

  return [left, right, top, bottom];
}

function flood(map: string[][], from: Point, visited: Set<string>) {
  const region: Point[] = [];
  const char = map[from.y][from.x];

  const queue = [from];

  while (queue.length > 0) {
    const current = queue.shift()!;
    const key = current.toString();

    if (visited.has(key)) {
      continue;
    }

    region.push(current);
    visited.add(key);

    for (
      const neighbor of getNeighbours(current).filter((p) => !!map[p.y]?.[p.x])
    ) {
      if (map[neighbor.y][neighbor.x] === char) {
        queue.push(neighbor);
      }
    }
  }

  return { region, char };
}

function getAreas(map: string[][]) {
  const visited = new Set<string>();
  const areas: Point[][] = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const point = new Point(x, y);
      const key = point.toString();

      if (visited.has(key)) {
        continue;
      }

      const { region } = flood(map, point, visited);
      areas.push(region);
    }
  }

  return areas;
}

function getFences(area: Point[]) {
  let count = 0;

  const set = new Set<string>(area.map((p) => p.toString()));

  area.forEach((point) => {
    const neighbors = getNeighbours(point);

    neighbors.forEach((neighbor) => {
      if (!set.has(neighbor.toString())) {
        count++;
      }
    });
  });

  return count;
}

function getDirectionValue(point: Point, direction: Point) {
  if (direction.x === 0) {
    return point.x;
  }

  return point.y;
}

function getSides(area: Point[]) {
  const directions = getNeighbours(new Point(0, 0));

  const getEdges = (area: Point[], direction: Point) => {
    const set = new Set(area.map((p) => p.toString()));

    const pointsWithEdges = area.filter((point) =>
      !set.has(
        new Point(point.x + direction.x, point.y + direction.y).toString(),
      )
    );

    const grouped = Object.groupBy(
      pointsWithEdges,
      (point) => getDirectionValue(point, Point.toInverted(direction)),
    );

    return Object.values(grouped).reduce(
      (sum, points = []) => {
        const sorted = points.map((point) =>
          getDirectionValue(point, direction)
        ).sort((a, b) => a - b);

        let continuousCount = 1;
        let previous = sorted[0];

        for (let i = 1; i < sorted.length; i++) {
          const current = sorted[i];
          if (current !== previous + 1) {
            continuousCount++;
          }
          previous = current;
        }

        return sum + continuousCount;
      },
      0,
    );
  };

  return directions.reduce(
    (sum, direction) => sum + getEdges(area, direction),
    0,
  );
}

export function part1(input: string) {
  const map = parse(input);
  const areas = getAreas(map);

  return areas.reduce((sum, area) => {
    return sum + (area.length * getFences(area));
  }, 0);
}

export function part2(input: string) {
  const map = parse(input);
  const areas = getAreas(map);

  return areas.reduce((sum, area) => {
    return sum + (area.length * getSides(area));
  }, 0);
}

Deno.bench("part1", async () => {
  const data = await Deno.readTextFile("./day12.txt");
  part1(data);
});

Deno.bench("part2", async () => {
  const data = await Deno.readTextFile("./day12.txt");
  part2(data);
});
