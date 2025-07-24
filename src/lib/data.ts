import { Buffer } from "node:buffer";
import { createReadStream } from "node:fs";
import JSONbig from "json-bigint";
import type { Result } from "./types";

let results: Result[];

export async function getResults(): Promise<Result[]> {
  if (results) {
    return results;
  }

  const stream = createReadStream(`${process.cwd()}/src/app/result.json`, {
    encoding: "utf-8",
  });
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }

  const parsed = JSONbig.parse(Buffer.concat(chunks).toString());
  results = JSON.parse(JSON.stringify(parsed));
  return results;
}

export async function getGroupedResults() {
  const results = await getResults();
  const grouped = results.reduce(
    (acc, result) => {
      const { site } = result;
      if (!acc[site]) {
        acc[site] = [];
      }
      acc[site].push(result);
      return acc;
    },
    {} as Record<string, Result[]>,
  );
  return grouped;
}
