export class AuthProxy {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async request(url) {
        console.log("Sending request to:", url);

        const response = await fetch(url, {
            headers: {
                Authorization: this.apiKey
            }
        });

        return response.json();
    }
}