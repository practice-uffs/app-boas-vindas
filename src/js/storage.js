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

	async setCampusContent(campus, content) {
		localStorage[campus] = JSON.stringify(content);
	}

	async getCampusContent(campus) {
		let content = localStorage.getItem(campus);
		return JSON.parse(content);
	}
}