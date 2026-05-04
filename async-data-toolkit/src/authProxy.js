export class AuthProxy {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async request(url) {
        const response = await fetch(url, {
            headers: {
                Authorization: this.apiKey
            }
        });

        return response.json();
    }
}