interface Block {
  type: "space" | "file";
  length: number;
  id?: number;
}

function parse(input: string): Block[] {
  let id = 0;

  return input.split("").map((char, index) => {
    const length = Number(char);
    const type = index % 2 === 0 ? "file" : "space";

    const block: Block = {
      id: type === "file" ? id : undefined,
      length,
      type,
    };

    if (type === "file") {
      id++;
    }

    return block;
  });
}

function getChecksum(data: Block[]) {
  let index = 0;

  return data.reduce((sum, block) => {
    if (!block.id) {
      index += block.length;
      return sum;
    }

    let checksum = 0;

    for (let i = index; i < index + block.length; i++) {
      checksum += i * block.id!;
    }

    index += block.length;
    return sum + checksum;
  }, 0);
}

export function part1(input: string) {
  const data = parse(input);

  for (let i = 0; i < data.length; i++) {
    const block = data[i];

    if (block.type === "file") {
      continue;
    }

    if (block.type === "space") {
      for (let j = data.length - 1; j > i; j = j - 1) {
        const endBlock = data[j];

        if (!endBlock.length) {
          continue;
        }

        if (endBlock.type === "file") {
          if (endBlock.length === block.length) {
            data[i] = endBlock;
            data[j] = block;
            break;
          }

          if (endBlock.length < block.length) {
            block.length -= endBlock.length;
            data.splice(i, 0, endBlock);
            data.splice(j + 1, 1);
            break;
          }

          if (endBlock.length > block.length) {
            endBlock.length -= block.length;
            data.splice(i, 1, {
              ...endBlock,
              length: block.length,
            });
            break;
          }
        }
      }
    }
  }

  return getChecksum(data);
}

export function part2(input: string) {
  const data = parse(input);

  const attempts = new Set<number>();

  for (let i = 0; i < data.length; i++) {
    const block = data[i];

    if (block.type === "file") {
      continue;
    }

    if (block.type === "space") {
      for (let j = data.length - 1; j > i; j = j - 1) {
        const endBlock = data[j];

        if (endBlock.type === "file") {
          if (block.id && attempts.has(block.id)) {
            continue;
          }

          if (endBlock.length === block.length) {
            data[i] = endBlock;
            data[j] = block;
            break;
          }

          if (endBlock.length < block.length) {
            block.length -= endBlock.length;
            data.splice(i, 0, endBlock);
            data.splice(j + 1, 1, {
              ...block,
              length: endBlock.length,
            });

            break;
          }

          if (block.id) {
            attempts.add(block.id);
          }
        }
      }
    }
  }
  return getChecksum(data);
}

Deno.bench("part1", async () => {
  const data = await Deno.readTextFile("./day9.txt");
  part1(data);
});

Deno.bench("part2", async () => {
  const data = await Deno.readTextFile("./day9.txt");
  part2(data);
});
