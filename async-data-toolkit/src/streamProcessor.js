import fs from "fs";
import readline from "readline";

export async function processFileStream(path) {
    const stream = fs.createReadStream(path);

    const reader = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    });

    let lineCount = 0;

    for await (const line of reader) {
        console.log("Line:", line);

        lineCount++;
    }

    console.log("Total lines:", lineCount);
}