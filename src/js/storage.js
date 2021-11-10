export class Storage{
	constructor(app) {
		this.app = app;
		this.app.storage = this;
	}

	async setSelectedCampus(campus) {
		localStorage["selectedCampus"] = JSON.stringify(campus);
	}

	async getSelectedCampus() {
		let campus = localStorage.getItem("selectedCampus");
		return JSON.parse(campus);
	}

	async setPageContent(id, content) {
		localStorage.setItem(id, JSON.stringify(content));
	}

	async getPageContent(page) {
		return JSON.parse(localStorage.getItem(page));
	}
}