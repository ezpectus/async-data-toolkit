export class AuthProxy {
    constructor(apiKey, limit = 5) {
        this.apiKey = apiKey;

        this.limit = limit;
        this.requestCount = 0;
    }

    async request(url) {
        if (this.requestCount >= this.limit) {
            throw new Error("Rate limit exceeded");
        }

        this.requestCount++;

        console.log("Sending request to:", url);

        const options = {
            headers: {
                Authorization: this.apiKey
            }
        };

        const response = await fetch(url, options);

        return response.json();
    }
}