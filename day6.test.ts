import { assertEquals } from "jsr:@std/assert";
import { part1, part2 } from "./day6.ts";

Deno.test("part1 - test input", async () => {
  const data = await Deno.readTextFile("./day6.test.txt");
  const result = await part1(data);

  assertEquals(result, 41);
});

Deno.test("part1 - input", async () => {
  const data = await Deno.readTextFile("./day6.txt");
  const result = await part1(data);

  assertEquals(result, 5145);
});

Deno.test("part2 - test input", async () => {
  const data = await Deno.readTextFile("./day6.test.txt");
  const result = part2(data);

  assertEquals(result, 6);
});

Deno.test("part2 - input", async () => {
  const data = await Deno.readTextFile("./day6.txt");

  const result = part2(data);

  assertEquals(result, 1523);
});
