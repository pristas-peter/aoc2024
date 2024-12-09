interface Point {
  x: number;
  y: number;
}

enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  RIGHT = "RIGHT",
  LEFT = "LEFT",
}

const DirectionToPoint = {
  [Direction.UP]: { x: 0, y: -1 },
  [Direction.DOWN]: { x: 0, y: 1 },
  [Direction.LEFT]: { x: -1, y: 0 },
  [Direction.RIGHT]: { x: 1, y: 0 },
};

const NextDirection = {
  [Direction.UP]: Direction.RIGHT,
  [Direction.DOWN]: Direction.LEFT,
  [Direction.LEFT]: Direction.UP,
  [Direction.RIGHT]: Direction.DOWN,
};

function parse(input: string) {
  let guardPosition: Point | null = null;
  let map: boolean[][] = [];
  let guardDirection: Direction | null = null;

  input.split("\n").forEach((line, y) => {
    line.split("").forEach((char, x) => {
      if (!map[y]) {
        map[y] = [];
      }

      map[y][x] = char === "#";

      if (char === "^") {
        guardDirection = Direction.UP;
        guardPosition = { x, y };
      }
    });
  });

  return {
    map,
    guardPosition: guardPosition!,
    guardDirection: guardDirection!,
  };
}

function getVisitedKey(toVisit: Point) {
  return `${toVisit.x},${toVisit.y}`;
}

function getVisited(
  initPosition: Point,
  initDirection: Direction,
  map: boolean[][],
) {
  let toVisit: Point | null = initPosition;
  let direction = initDirection;
  const visited: Record<string, boolean> = {};

  while (toVisit) {
    visited[getVisitedKey(toVisit)] = true;

    let nextPoint: Point = {
      x: toVisit.x + DirectionToPoint[direction].x,
      y: toVisit.y + DirectionToPoint[direction].y,
    };
    let nextMapPoint = map[nextPoint.y]?.[nextPoint.x];

    while (nextMapPoint === true) {
      direction = NextDirection[direction];
      nextPoint = {
        x: toVisit.x + DirectionToPoint[direction].x,
        y: toVisit.y + DirectionToPoint[direction].y,
      };
      nextMapPoint = map[nextPoint.y]?.[nextPoint.x];
    }

    toVisit = nextMapPoint !== undefined ? nextPoint : null;
  }
  return visited;
}

export function part1(input: string) {
  const { guardDirection: initDirection, guardPosition: initPosition, map } =
    parse(input);
  const visited = getVisited(initPosition, initDirection, map);

  return Object.keys(visited).length;
}

function hasLoop(
  map: boolean[][],
  initDirection: Direction,
  initPosition: Point,
) {
  let isLoop = false;

  let toVisit: Point | null = initPosition;
  let direction = initDirection;

  const visited: Record<string, boolean> = {};

  while (toVisit) {
    const key = `${direction},${toVisit.x},${toVisit.y}`;
    if (visited[key]) {
      isLoop = true;
      break;
    }

    visited[key] = true;

    let nextPoint: Point = {
      x: toVisit.x + DirectionToPoint[direction].x,
      y: toVisit.y + DirectionToPoint[direction].y,
    };
    let nextMapPoint = map[nextPoint.y]?.[nextPoint.x];

    while (nextMapPoint === true) {
      direction = NextDirection[direction];
      nextPoint = {
        x: toVisit.x + DirectionToPoint[direction].x,
        y: toVisit.y + DirectionToPoint[direction].y,
      };
      nextMapPoint = map[nextPoint.y]?.[nextPoint.x];
    }

    toVisit = nextMapPoint !== undefined ? nextPoint : null;
  }

  return isLoop;
}

export function part2(input: string) {
  const { guardDirection: initDirection, guardPosition: initPosition, map } =
    parse(input);

  const visited = getVisited(initPosition, initDirection, map);

  let loops = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (x === initPosition.x && y === initPosition.y) {
        continue;
      }

      if (map[y]?.[x] === true) {
        continue;
      }

      if (!visited[getVisitedKey({ x, y })]) {
        continue;
      }

      const prev = map[y][x];

      map[y][x] = true;

      if (hasLoop(map, initDirection, initPosition)) {
        loops++;
      }

      map[y][x] = prev;
    }
  }

  return loops;
}

Deno.bench("part1", async () => {
  const data = await Deno.readTextFile("./day6.txt");
  part1(data);
});

Deno.bench("part2", async () => {
  const data = await Deno.readTextFile("./day6.txt");
  part2(data);
});
