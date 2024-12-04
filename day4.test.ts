import { assertEquals } from "jsr:@std/assert";
import { part1, part2 } from "./day4.ts";

Deno.test("part1 - test input", async () => {
  const data = await Deno.readTextFile("./day4.test.txt");
  const result = part1(data);

  assertEquals(result, 18);
});

Deno.test("part1 - input", async () => {
  const data = await Deno.readTextFile("./day4.txt");
  const result = part1(data);

  assertEquals(result, 2390);
});
//
Deno.test("part2 - test input", async () => {
  const data = await Deno.readTextFile("./day4.test.txt");
  const result = part2(data);

  assertEquals(result, 9);
});

Deno.test("part2 - input", async () => {
  const data = await Deno.readTextFile("./day4.txt");

  const result = part2(data);

  assertEquals(result, 1809);
});
