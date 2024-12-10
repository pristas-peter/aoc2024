import { assertEquals } from "jsr:@std/assert";
import { part1, part2 } from "./day10.ts";

Deno.test("part1 - test input", async () => {
  const data = await Deno.readTextFile("./day10.test.txt");
  const result = part1(data);

  assertEquals(result, 36);
});

Deno.test("part1 - input", async () => {
  const data = await Deno.readTextFile("./day10.txt");
  const result = part1(data);

  assertEquals(result, 501);
});

Deno.test("part2 - test input", async () => {
  const data = await Deno.readTextFile("./day10.test.txt");
  const result = part2(data);

  assertEquals(result, 81);
});

Deno.test("part2 - input", async () => {
  const data = await Deno.readTextFile("./day10.txt");

  const result = part2(data);

  assertEquals(result, 1017);
});
