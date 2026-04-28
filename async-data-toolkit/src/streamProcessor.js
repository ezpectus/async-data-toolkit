import fs from "fs";
import readline from "readline";

export async function processFileStream(path) {
    const stream = fs.createReadStream(path);

    const reader = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    });

    let lineCount = 0;
    let wordCount = 0;

    for await (const line of reader) {
        console.log("Line:", line);

        lineCount++;

        const words = line.split(" ");

        wordCount += words.length;
    }

    console.log("Total lines:", lineCount);
    console.log("Total words:", wordCount);
}