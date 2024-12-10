import { assertEquals } from "jsr:@std/assert";
import { part1, part2 } from "./day9.ts";

Deno.test("part1 - test input", async () => {
  const data = await Deno.readTextFile("./day9.test.txt");
  const result = part1(data);

  assertEquals(result, 1928);
});

Deno.test("part1 - input", async () => {
  const data = await Deno.readTextFile("./day9.txt");
  const result = part1(data);

  assertEquals(result, 6283404590840);
});

Deno.test("part2 - test input", async () => {
  const data = await Deno.readTextFile("./day9.test.txt");
  const result = part2(data);

  assertEquals(result, 2858);
});

Deno.test("part2 - input", async () => {
  const data = await Deno.readTextFile("./day9.txt");

  const result = part2(data);

  assertEquals(result, 6304576012713);
});
