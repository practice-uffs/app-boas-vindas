export class Content{
    constructor(app) {
        this.app = app;
        this.app.content = this;
    }

    async filter(page, contents) {
        var data = [];
        for (let content of contents) {
            if (content.item_menu == page) {
                data.push(content);
            }
        }

        return data;
    }

    async contentsTreatment(contents) {
        var treatedContent = [];
        for await(let content of contents) {
            switch (content.tipo) {
                case "texto":
                    treatedContent.push(await this.text(content));
                    break;
                case "mapa":
                    treatedContent.push(await this.map(content));
                    break;
                case "link":
                    treatedContent.push(await this.link(content));
                    break;
                default:
                    treatedContent.push(content.conteudo);
                    break;
            }
        }

        return treatedContent;
    }

    async text(data) {
        let item = `<div class="card">
            <div class="card-content card-content-padding">
                ${data.conteudo}
            </div>
        </div>`;

        return item;
    }

    async map(data) {
        let item = `<div class="card">
            <div class="card-content card-content-padding">
                <iframe src="${data.conteudo}" width="100%" height="100%" style="border:0;" allowfullscreen="true" loading="lazy"></iframe>
            </div>
        </div>`;

        return item;
    }

    async link(data) {
        let item = `<div class="card">
            <div class="card-content card-content-padding">
                <a href="${data.extra}">${data.conteudo}</a>
            </div>
        </div>`;

        return item;
    }
}