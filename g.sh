#!/usr/bin/env zsh

set -e

day=""

# Parse options
while getopts "d:" opt; do
  case $opt in
    d)
      if [[ $OPTARG =~ ^[0-9]+$ ]]; then
        day=$OPTARG
      else
        echo "Error: -d (day) must be followed by a number." >&2
        exit 1
      fi
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done

if [[ -z $day ]]; then
  echo "No -d (day) option provided."
  exit 1
fi

ts="day$day.ts"
test="day$day.test.ts"
txt="day$day.txt"
test_txt="day$day.test.txt"

if [[ ! -f "$ts" ]]; then

  cat <<EOF > "$ts"

function parse(input: string) {
}

export function part1(input: string) {
  const data = parse(input);
  return 0
}

export function part2(input: string) {
  const data = parse(input);
  return 0
}

Deno.bench("part1", async () => {
  const data = await Deno.readTextFile("./$txt");
  part1(data);
});

Deno.bench("part2", async () => {
  const data = await Deno.readTextFile("./$txt");
  part2(data);
});
EOF
fi

if [[ ! -f "$test" ]]; then

  cat <<EOF > "$test"
import { assertEquals } from "jsr:@std/assert";
import { part1, part2 } from "./$ts";

Deno.test("part1 - test input", async () => {
  const data = await Deno.readTextFile("./$test_txt");
  const result = part1(data);

  assertEquals(result, 1);
});

//Deno.test("part1 - input", async () => {
//  const data = await Deno.readTextFile("./$txt");
//  const result = part1(data);
//
//  assertEquals(result, 1);
//});

//Deno.test("part2 - test input", async () => {
//  const data = await Deno.readTextFile("./$test_txt");
//  const result = part2(data);
//
//  assertEquals(result, 1);
//});

//Deno.test("part2 - input", async () => {
//  const data = await Deno.readTextFile("./$txt");
//
//  const result = part2(data);
//
//  assertEquals(result, 1);
//});

EOF

fi

touch "$txt"
touch "$test_txt"