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
                case undefined:    treatedContent.push('<p></p>');                      break;
				case "separador": treatedContent.push('<hr class="margin-vertical">');  break;
				case "item":      treatedContent.push(`<li>${content.conteudo}</li>`);  break;
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
            /width.*[0-9];"/g, `width="100%" height="100%" style="aspect-ratio: 1; border: 0; border-radius: 5px;"`
        )+`${data.extra ? '<button class="col button button-fill button-round"><a style="color:white;" class="link external"  href="'+data.extra+'">Abrir no google maps</a></button>' : ''}`;
    }

    async video(data) {
        function getId(url) {
            var match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
            if (match && match[2].length == 11) return match[2];
            else return 'error';
        }
        var videoId = getId(data.conteudo);

        return `<iframe class="embed-responsive-item width-100 ${style_video_image_text(data)}" frameborder="0" src="https://www.youtube.com/embed/${videoId}?autohide=1&playsinline=1&showinfo=0" frameborder="0" allowfullscreen></iframe>`;
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

		let icon = data.tipo == "email" ? "envelope" : data.tipo == "telefone" ? "phone" : "globe";
		let title = data.extra;
		let url = (data.tipo == "email" ? "mailto:" : data.tipo == "telefone" ? "tel:+" : "") + data.conteudo;

		return `<div class="custom-item-link padding-vertical">
					<div class="padding-horizontal"><i class="f7-icons">${icon}</i></div>
					<div class="custom-item-link-content">
						<div>${title}</div>
						<div class="padding-horizontal">
							<a class="link external" href="${url}">Acessar</a>
						</div>
					</div>
				</div>`
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