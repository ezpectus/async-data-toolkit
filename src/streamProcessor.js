import fs from "fs";
import readline from "readline";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function processFileStream(path) {
    const stream = fs.createReadStream(path);

    const reader = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    });

    let lineCount = 0;
    let wordCount = 0;

    for await (const line of reader) {
        if (line.trim() === "") {
            continue;
        }

        console.log("Line:", line);

        lineCount++;

        const words = line.split(" ");

        wordCount += words.length;

        await sleep(200);
    }

    console.log("Total lines:", lineCount);
    console.log("Total words:", wordCount);
}