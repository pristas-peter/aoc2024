import { assertEquals } from "jsr:@std/assert";
import { part1, part2 } from "./day11.ts";

Deno.test("part1 - test input", async () => {
  const data = await Deno.readTextFile("./day11.test.txt");
  const result = part1(data);

  assertEquals(result, 55312);
});

Deno.test("part1 - input", async () => {
  const data = await Deno.readTextFile("./day11.txt");
  const result = part1(data);

  assertEquals(result, 186175);
});

//Deno.test("part2 - test input", async () => {
//  const data = await Deno.readTextFile("./day11.test.txt");
//  const result = part2(data);
//
//  assertEquals(result, 1);
//});

Deno.test("part2 - input", async () => {
  const data = await Deno.readTextFile("./day11.txt");

  const result = part2(data);

  assertEquals(result, 220566831337810);
});
