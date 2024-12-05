import { assertEquals } from "jsr:@std/assert";
import { part1, part2 } from "./day5.ts";

Deno.test("part1 - test input", async () => {
  const data = await Deno.readTextFile("./day5.test.txt");
  const result = part1(data);

  assertEquals(result, 143);
});

Deno.test("part1 - input", async () => {
  const data = await Deno.readTextFile("./day5.txt");
  const result = part1(data);

  assertEquals(result, 5955);
});

Deno.test("part2 - test input", async () => {
  const data = await Deno.readTextFile("./day5.test.txt");
  const result = part2(data);

  assertEquals(result, 123);
});

Deno.test("part2 - input", async () => {
  const data = await Deno.readTextFile("./day5.txt");

  const result = part2(data);

  assertEquals(result, 4030);
});
