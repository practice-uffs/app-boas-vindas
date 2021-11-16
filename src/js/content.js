export class Content {
    constructor(app) {
        this.app = app;
        this.app.content = this;
    }

    async filter(page, contents) {

        var data = [];
        for (let content of contents) {
            if (content.aba == page) {
                data.push(content.data);
            }
        }
        return data;
    }

    async contentsTreatment(contents) {

        var treatedContent = [];
        for await (let content of contents) {
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
                case "video":
                    treatedContent.push(await this.video(content));
                    break;
                case "telefone":
                    treatedContent.push(await this.telefone(content));
                    break;
                case "email":
                    treatedContent.push(await this.email(content));
                    break;
                case "imagem":
                    treatedContent.push(await this.imagem(content));
                    break;
                case undefined:
                    treatedContent.push(await this.breakline(content));
                    break;
                case 'breakscreen':
                    treatedContent.push(await this.breakscreen(content));
                    break;
                default:
                    treatedContent.push(content.conteudo);
                    break;
            }
        }

        return treatedContent;
    }

    async text(data) {
        let item = `<span>${data.conteudo}</span>`;

        return item;
    }

    async map(data) {
        let item = `<iframe src="${data.conteudo}" width="100%" height="100%" style="border:0; aspect-ratio: 1;" allowfullscreen="true"></iframe>`;

        return item;
    }

    async link(data) {
        let item = `<a href="${data.conteudo}">${data.extra}</a>`;

        return item;
    }
    async video(data) {
        let item = `<p><strong>${data.extra}</strong></p><iframe frameborder="0" src="${data.conteudo}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" style="width: 100%; min-height: 250px;"></iframe>`;

        return item;
    }

    async telefone(data) {
        let item = `<a href="${data.conteudo}">${data.conteudo}</a>`;

        return item;
    }

    async email(data) {
        let item = `<a href="mailto:${data.conteudo}">${data.conteudo}</a>`;

        return item;
    }

    async imagem(data) {
        let url = data.conteudo;
        let found = url.match(/d\/([A-Za-z0-9\-]+)/);

        if (found) {
            let new_url = 'https://drive.google.com/uc?export=view&id=' + found[1];
            console.log(new_url)
            data.conteudo = new_url;
        };

        let item = `<img src="${data.conteudo}" alt="Imagem" width="100%"><p><em>${data.extra}</em></p>`;

        return item;
    }

    async breakline(data){
        let item = `<br>`;

        return item;
    }

    async breakscreen(data){
        let item = `</div></div><div class="card"><div class="card-content card-content-padding">`;

        return item;
    }


}