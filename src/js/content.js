export class Content {
    constructor(app) {
        this.app = app;
        this.app.content = this;
    }

    async contentsTreatment(contents) {

        var treatedContent = [];
        var openCard = false;
        for await (let content of contents) {

           

            switch (content.tipo) {
                case "texto":
                    treatedContent.push(await this.text(content));
                    break;
                case "mapa":
                    treatedContent.push(await this.map(content));
                    break;
                case "link":
                    if(openCard){
                        treatedContent.push(await this.closeCard());
                    }
                    treatedContent.push(await this.openCard());
                    treatedContent.push(await this.link(content));
                    treatedContent.push(await this.closeCard());
                    openCard = false;

                    break;
                case "video":
                    treatedContent.push(await this.video(content));
                    break;
                case "telefone":
                    if(openCard){
                        treatedContent.push(await this.closeCard());
                    }
                    treatedContent.push(await this.openCard());
                    treatedContent.push(await this.telefone(content));
                    treatedContent.push(await this.closeCard());
                    openCard = false;
                    break;
                case "email":
                    if(openCard){
                        treatedContent.push(await this.closeCard());
                    }
                    treatedContent.push(await this.openCard());
                    treatedContent.push(await this.email(content));
                    treatedContent.push(await this.closeCard());
                    openCard = false;
                    break;
                case "imagem":
                    treatedContent.push(await this.imagem(content));
                    break;
                case undefined:
                    treatedContent.push(await this.breakline(content));
                    break;
                case "swiper":
                    treatedContent.push(await this.swiper(content));
                    break;
                case 'novo bloco':
                    if(openCard){
                        treatedContent.push(await this.closeCard());
                    }
                    treatedContent.push(await this.openCard(content));
                    openCard = true;
                    break;
                default:
                    treatedContent.push(content.conteudo);
                    break;
            }
        }

        return treatedContent;
    }

    async text(data) {
        let item = '';
        switch(data.estilo){
            case "grande":
                item = `<div class="custom-text-large">${data.conteudo}</div>`;
                break;
            case "médio":
                item = `<div class="custom-text-medium">${data.conteudo}</div>`;
                break;
            case "pequeno":
                item = `<div class="custom-text-small">${data.conteudo}</div>`;
                break;
            case undefined:
                item = `<div>${data.conteudo}</div>`;
        }
        
        return item;
    }

    async map(data) {
        let item = '';
        switch(data.estilo){
            case "grande":
                item = `<iframe class="custom-map-large" src="${data.conteudo}" width="100%" height="100%" style="border:0; aspect-ratio: 1;" allowfullscreen="true"></iframe>`;
                break;
            case "médio":
                item = `<iframe class="custom-map-medium" src="${data.conteudo}" width="100%" height="100%" style="border:0; aspect-ratio: 1;" allowfullscreen="true"></iframe>`;
                break;
            case "pequeno":
                item = `<iframe class="custom-map-small" src="${data.conteudo}" width="100%" height="100%" style="border:0; aspect-ratio: 1;" allowfullscreen="true"></iframe>`;
                break;
            case undefined:
                item = `<iframe src="${data.conteudo}" width="100%" height="100%" style="border:0; aspect-ratio: 1;" allowfullscreen="true"></iframe>`;
        }
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


    async openCard(data){
        let item = `<div class="card"><div class="card-content card-content-padding">`;

        return item;
    }

    async closeCard(){
        let item = `</div></div>`;

        return item;
    }



    async link(data) {
        let site = data.extra;

        if (site == undefined) {
            data.extra = 'Link';
        };

        let item = `
            <div style='display: flex; align-items: center; justify-content: space-between; width:100%;'>
                <div class="item-media"><i class="f7-icons">globe</i></div>
                <p style='text-align: center;'>${data.extra}</p>
                <a href="${data.conteudo}" class="external" target="_blank">Acessar</a>
            </div>`;

        return item;
    }

    async video(data) {
        if (data.extra == undefined) {
            data.extra = ' ';
        }

        function getId(url) {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);

            if (match && match[2].length == 11) {
                return match[2];
            } else {
                return 'error';
            }
        }

        var videoId = getId(data.conteudo);

        let item = `
                <p><strong>${data.extra}</strong></p>
                <iframe frameborder="0" src="//www.youtube.com/embed/${videoId}" style="width: 100%; min-height: 250px;"></iframe>`;

        return item;
    }

    async telefone(data) {
        if (data.extra == undefined) {
            data.extra = 'Telefone';
        };

        let item = `<div  style='display: flex; align-items: center; justify-content: space-between; width:100%;'>
                <div class="item-media"><i class="f7-icons">phone</i></div>
                <p style='max-width: 40%; text-align: center;'>${data.extra}</p>
                <a class="external" href="tel:+${data.conteudo}">${data.conteudo}</a>
            </div>`;

        return item;
    }

    async email(data) {
        if (data.extra == undefined) {
            data.extra = 'Email';
        };

        let item = `<div style='display: flex; align-items: center; justify-content: space-between; width:100%;'>
                        <div class="item-media"><i class="f7-icons">rectangle_paperclip</i></div>
                        <p style='max-width: 40%; text-align: center;'>${data.extra}</p>
                        <a class="external" href="mailto:${data.conteudo}">${data.conteudo}</a>
                    </div>`;

        return item;
    }

    async imagem(data) {
        let url = data.conteudo;
        let found = url.match(/d\/([A-Za-z0-9\-_]+)/);
        let item = '';

        if (found) {
            let new_url = 'https://drive.google.com/uc?export=view&id=' + found[1];
            console.log(new_url)
            data.conteudo = new_url;
        };
        if (data.extra == undefined) {
            data.extra = ' ';
        }


        switch(data.estilo){
            case "grande":
                item = `<img class="custom-image-large" src="${data.conteudo}" alt="Imagem" width="100%"/>${(((data.extra != undefined) && (data.extra != '')) ? '<p><em>'+data.extra+'</em></p>' : '')}`;
                break;
            case "médio":
                item = `<img class="custom-image-medium" src="${data.conteudo}" alt="Imagem" width="100%"/>${(((data.extra != undefined) && (data.extra != '')) ? '<p><em>'+data.extra+'</em></p>' : '')}`;
                break;
            case "pequeno":
                item = `<img class="custom-image-small" src="${data.conteudo}" alt="Imagem" width="100%"/>${(((data.extra != undefined) && (data.extra != '')) ? '<p><em>'+data.extra+'</em></p>' : '')}`;
                break;
            case undefined:
                item = `<img src="${data.conteudo}" alt="Imagem" width="100%"/>${(((data.extra != undefined) && (data.extra != '')) ? '<p><em>'+data.extra+'</em></p>' : '')}`;
                break;
        }
        return item;
    }









    

}