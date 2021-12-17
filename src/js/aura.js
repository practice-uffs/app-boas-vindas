export class Aura{
    constructor(app) {
        this.app = app;
        this.app.aura = this;
    }

    async requestAnswer(input) {
        var self = this;
        var app = self.app;

        let encodeInput = encodeURI(input);
        return await app.request.promise.get("https://practice.uffs.edu.br/api/v0/" + "aura/nlp/qna/" + encodeInput)
        .then(async (res) => {
            let data = JSON.parse(res.data);
            return data.answer;
        }).catch(err => err);
    }

    setConsent(consent) {
        localStorage["auraConsent"] = JSON.stringify(consent);
    }
    
    getConsent() {
        let data  = localStorage.getItem("auraConsent");
        return JSON.parse(data);
    }

    addMessageToChat(message) {
        var self = this;
        var app = self.app;

        let chat = JSON.parse(localStorage.getItem("auraChat"));

        if (!chat) {
            chat = [];
        }
        if (chat.length >= 200) {
            chat.shift();
        }

        chat.push(message);

        localStorage["auraChat"] =  JSON.stringify(chat);
    }

    getChat() {
        let chat = JSON.parse(localStorage.getItem("auraChat"));
		return chat;
    }

    clearChat() {
        localStorage.removeItem("auraChat");
    }
}