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

    async text(data) {
        let item = `<div class="card">
            <div class="card-content card-content-padding">
                ${data}
            </div>
        </div>`;

        return item;
    }
}