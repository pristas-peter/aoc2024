import { assertEquals } from "jsr:@std/assert";
import { part1, part2 } from "./day7.ts";

Deno.test("part1 - test input", async () => {
  const data = await Deno.readTextFile("./day7.test.txt");
  const result = part1(data);

  assertEquals(result, 3749);
});

Deno.test("part1 - input", async () => {
  const data = await Deno.readTextFile("./day7.txt");
  const result = part1(data);

  assertEquals(result, 14711933466277);
});

Deno.test("part2 - test input", async () => {
  const data = await Deno.readTextFile("./day7.test.txt");
  const result = part2(data);

  assertEquals(result, 11387);
});

Deno.test("part2 - input", async () => {
  const data = await Deno.readTextFile("./day7.txt");

  const result = part2(data);

  assertEquals(result, 286580387663654);
});
