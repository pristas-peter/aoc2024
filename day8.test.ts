import { assertEquals } from "jsr:@std/assert";
import { part1, part2 } from "./day8.ts";

Deno.test("part1 - test input", async () => {
  const data = await Deno.readTextFile("./day8.test.txt");
  const result = part1(data);

  assertEquals(result, 14);
});

Deno.test("part1 - input", async () => {
  const data = await Deno.readTextFile("./day8.txt");
  const result = part1(data);

  assertEquals(result, 390);
});

Deno.test("part2 - test input", async () => {
  const data = await Deno.readTextFile("./day8.test.txt");
  const result = part2(data);

  assertEquals(result, 34);
});

Deno.test("part2 - input", async () => {
  const data = await Deno.readTextFile("./day8.txt");

  const result = part2(data);

  assertEquals(result, 1246);
});
