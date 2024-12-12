import { assertEquals } from "jsr:@std/assert";
import { part1, part2 } from "./day12.ts";

Deno.test("part1 - test input", async () => {
  const data = await Deno.readTextFile("./day12.test.txt");
  const result = part1(data);

  assertEquals(result, 1930);
});

Deno.test("part1 - input", async () => {
  const data = await Deno.readTextFile("./day12.txt");
  const result = part1(data);

  assertEquals(result, 1375574);
});

Deno.test("part2 - test input", async () => {
  const data = await Deno.readTextFile("./day12.test.txt");
  const result = part2(data);

  assertEquals(result, 1206);
});

Deno.test("part2 - input", async () => {
  const data = await Deno.readTextFile("./day12.txt");

  const result = part2(data);

  assertEquals(result, 830566);
});
