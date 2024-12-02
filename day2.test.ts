import { assertEquals } from "jsr:@std/assert";
import { part1, part2 } from "./day2.ts";

Deno.test("part1 - test input", async () => {
  const data = await Deno.readTextFile("./day2.test.txt");
  const result = part1(data);

  assertEquals(result, 2);
});

Deno.test("part1 - input", async () => {
  const data = await Deno.readTextFile("./day2.txt");
  const result = part1(data);

  assertEquals(result, 332);
});

Deno.test("part2 - test input", async () => {
  const data = await Deno.readTextFile("./day2.test.txt");
  const result = part2(data);

  assertEquals(result, 4);
});

Deno.test("part2 - input", async () => {
  const data = await Deno.readTextFile("./day2.txt");

  const result = part2(data);

  assertEquals(result, 398);
});
