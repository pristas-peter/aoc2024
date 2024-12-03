import { assertEquals } from "jsr:@std/assert";
import { part1, part2 } from "./day3.ts";

Deno.test("part1 - test input", async () => {
  const data = await Deno.readTextFile("./day3.test.txt");
  const result = part1(data);

  assertEquals(result, 161);
});

Deno.test("part1 - input", async () => {
  const data = await Deno.readTextFile("./day3.txt");
  const result = part1(data);

  assertEquals(result, 156388521);
});

Deno.test("part2 - test input", async () => {
  const data = await Deno.readTextFile("./day3b.test.txt");
  const result = part2(data);

  assertEquals(result, 48);
});

Deno.test("part2 - input", async () => {
  const data = await Deno.readTextFile("./day3.txt");

  const result = part2(data);

  assertEquals(result, 75920122);
});
