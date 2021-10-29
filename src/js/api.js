export class Api{
    constructor(app) {
        this.app = app;
        this.app.api = this;
        this.url = 'https://opensheet.vercel.app/1sN1gbMambszu_ZDA3vEX1hMlB2dgmExyNYMrc3KThNs/Campi'
    }

    async getCampus() {
        return await (await fetch(this.url)).json();
    }

    async getCampusContent(url) {
        return await (await fetch(url)).json();
    }
}