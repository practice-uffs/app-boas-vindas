export class Content {
    constructor(app) {
        this.app = app;
        this.app.content = this;
    }

    async contentsTreatment(contents) {

        var treatedContent = [`<div class="card"><div class="card-content card-content-padding">`];
        var newbloc = `</div></div><div class="card"><div class="card-content card-content-padding">`;
        for await (let content of contents) {
            switch (content.tipo) {
                case "texto":      treatedContent.push(await this.text(content));       break;
                case "mapa":       treatedContent.push(await this.map(content));        break;
                case "video":      treatedContent.push(await this.video(content));      break;
                case "imagem":     treatedContent.push(await this.imagem(content));     break;
                case "link":       treatedContent.push(await this.littleCard(content)); break;
                case "telefone":   treatedContent.push(await this.littleCard(content)); break;
                case "email":      treatedContent.push(await this.littleCard(content)); break;
                case "novo bloco": treatedContent.push(newbloc);                        break;
                case undefined:    treatedContent.push('<br>');                         break;
                default:           treatedContent.push(content.conteudo);               break;
            }
        }
        return treatedContent;
    }

    async text(data) {
        return `<div class="${style_video_image_text(data)}">${data.conteudo}</div>`
    }

    async map(data) {
        return data.conteudo.replace(
            /width.*[0-9];"/g, 'width="100%" height="100%" style="aspect-ratio: 1; border: 0;"');
    }

    async video(data) {
        function getId(url) {
            var match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
            if (match && match[2].length == 11) return match[2];
            else return 'error';
        }
        var videoId = getId(data.conteudo);

        return `<iframe class="width-100 ${style_video_image_text(data)}" frameborder="0" src="//www.youtube.com/embed/${videoId}"></iframe>`;
    }

    async imagem(data) {
        let found = data.conteudo.match(/d\/([A-Za-z0-9\-_]+)/);
        if (found) data.conteudo = 'https://drive.google.com/uc?export=view&id=' + found[1];

        return `<img class="${style_video_image_text(data)}" src="${data.conteudo}" alt="Imagem" width="100%"/>`;
    }

    async littleCard(data){
        if (data.extra == undefined) {
            data.extra = data.tipo == "email" ? "E-mail" : (data.tipo == "telefone" ? "Telefone" : undefined);
        }
        
        return `<div style='display: flex; align-items: center; justify-content: space-between; width:100%; margin: 7px 0 7px 0'>
                    <div class="item-media" style="padding-right:8px;"><i class="f7-icons">${data.tipo == "email" ? "rectangle_paperclip" : (data.tipo == "telefone" ? "phone" : "globe")}</i></div>
                    <div style='display: flex; align-items: center; justify-content: ${data.extra == undefined ? "flex-end" : "space-between"}; width:100%;'>
                        ${data.extra == undefined ? "" : "<p style='max-width: 50%; text-align: center;'>" + data.extra.substr(0, 25) + "</p>"}
                        <a class="external" href="${data.tipo == "email" ? "mailto:" : (data.tipo == "telefone" ? "tel:+" : "")}${data.conteudo}">${data.extra != undefined ? "Acessar" : data.conteudo.substr(0, 50)}</a>
                    </div>
                </div>`;    
    } 
}

function style_video_image_text(data) {
    switch (data.estilo) {
        case "pequeno": 
            return data.tipo == "imagem" ? "custom-image-small"  :  
                   data.tipo == "texto"  ? "custom-text-font-legend"   : "custom-video-small";  
        case "medio":   
            return data.tipo == "imagem" ? "custom-image-medium" : 
                   data.tipo == "texto"  ? "custom-text-subtitle"  : "custom-video-medium";
        case "grande": 
            return data.tipo == "imagem" ? "custom-image-large"  :  
                   data.tipo == "texto"  ? "custom-text-title"   : "custom-video-large"; 
        default:
            return data.tipo == "imagem" ? "custom-image-large"  :  
                   data.tipo == "texto"  ? "custom-text-default"   : "custom-video-large";
    }
}