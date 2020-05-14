#!/usr/bin/env node

import es from "event-stream";
import fs from "fs";

let [, , ...path] = process.argv;

console.time("readfileandsave");

let totalLines = 0;

async function readFiles(path: string, callback: Function) {
  const dir = await fs.promises.opendir(path);
  const fileArray: string[] = new Array();
  for await (const dirent of dir) {
    fileArray.push(`${dir.path}/${dirent.name}`);
  }
  callback(fileArray);
}

const merge = function (input: string[]) {
  const streams: any = input.map((element) => fs.createReadStream(element));

  es.merge(streams)
    .pipe(es.split())
    .pipe(es.mapSync(lineParser))
    .on("error", function (err) {
      console.log("Error while reading file.", err);
    })
    .on("end", function () {
      console.log(`Total lines in the array: ${totalLines}`);
      fs.writeFileSync("output.json", JSON.stringify(linesArray, null, 4));
      console.timeEnd("readfileandsave");
    });
};

let linesArray: any[] = [];

function lineParser(line: any) {
  totalLines++;
  const email = JSON.parse(line.split(",")[0]);
  if (email !== "") {
    linesArray.push(email);
  }
}

if (path.length < 1) {
  readFiles("./", merge).catch((e) =>
    console.error("there was an error with your path input."),
  );
} else if (path.length === 1) {
  readFiles(path[0], merge).catch((e) =>
    console.error("there was an error with your path input."),
  );
} else {
  path.forEach((p) => {
    readFiles(p, merge).catch((e) =>
      console.error("there was an error with your path input."),
    );
  });
}
