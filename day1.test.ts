import { assertEquals } from "jsr:@std/assert";
import {part1, part2} from "./day1.ts";

Deno.test("part1 - test input", async () => {
    const data = await Deno.readTextFile('./day1.test.txt');
    const result = part1(data)


    assertEquals(result, 11);
});

Deno.test("part1 - input", async () => {
    const data = await Deno.readTextFile('./day1.txt');
    const result = part1(data)


    assertEquals(result, 2430334);
});

Deno.test("part2 - test input", async () => {
    const data = await Deno.readTextFile('./day1.test.txt');
    const result = part2(data)


    assertEquals(result, 31);
});

Deno.test("part2 - input", async () => {
    const data = await Deno.readTextFile('./day1.txt');
    const result = part2(data)


    assertEquals(result, 28786472);
});
