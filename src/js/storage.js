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

	// User Storage
	setUserData(userData) {
		localStorage["userData"] = JSON.stringify(userData);
	};

	async getUserData() {
		var self = this;
		var app = self.app;

		let userData = localStorage["userData"];

		if (!userData) {
			return await app.api_practice.requestUserFromMural();
		} 
		return JSON.parse(userData);
	};

	async getUserCredentials() {
		var self = this;
		var app = self.app;

		let userCredentials = localStorage["userCredentials"];

		if (userCredentials) {
			userCredentials = JSON.parse(userCredentials);
			app.request.setup({
				headers: {
					Authorization: "Bearer " + userCredentials.passport,
				},
			});
			return userCredentials;
		} else {
			app.request.setup({
				headers: {
					Authorization: "",
				},
			});
			await app.api_practice.requestLogout();
			return false;
		}
	};

	setUserCredentials(userCredentials) {
		localStorage["userCredentials"] = JSON.stringify(userCredentials);
	};

	removeAllButUserData() {
		const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));
		const userData = JSON.parse(localStorage.getItem("userData"));

		localStorage.clear();

		this.setUserCredentials(userCredentials);
		this.setUserData(userData);
	};

	clearUserCredentials() {
		localStorage.removeItem("userCredentials");
		localStorage.removeItem("userData");
	};
}