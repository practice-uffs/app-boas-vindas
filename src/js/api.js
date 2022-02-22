export class Api{
    constructor(app) {
        this.app = app;
        this.app.api = this;
		this.url = 'https://opensheet.elk.sh/1U0tVzmz0h1aeIE-4QEvrEnUvwLitmA2nUykO1j-vA2w/Campi';
    }

    async getCampus() {
        //console.log((await fetch(this.url)).json());
        return await (await fetch(this.url)).json();
    }

    async getCampusContent(url) {
        //console.log((await fetch(url)).json());
        return await (await fetch(url)).json();
    }
}