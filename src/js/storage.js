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
		if (campus && campus != "undefined") {
			return JSON.parse(campus);
		}
	}

	async setDarkTheme(state) {
		localStorage.setItem("darkTheme", state);
	}

	async getDarkTheme() {
		return localStorage.getItem("darkTheme");
	}

	async setSpreadsheetContent(content) {
		localStorage.setItem("spreadsheetContent", JSON.stringify(content));
	}

	async getSpreadsheetContent() {
		return JSON.parse(localStorage.getItem("spreadsheetContent"));
	}

	async setCampusInformation(information) {
		localStorage.setItem("campusInformation", JSON.stringify(information));
	}

	async getCampusInformation() {
		return JSON.parse(localStorage.getItem("campusInformation"));
	}
	

	async setPageContent(pageContent) {
		localStorage.setItem("pageContent", JSON.stringify(pageContent));
	}

	async getPageContent(page) {
		return JSON.parse(localStorage.getItem("pageContent"))[page];
	}

	async removePageContent() {
		delete localStorage.pageContent;
	}

	setUserData(userData) {
		localStorage["userData"] = JSON.stringify(userData);
	};

	async getUserData() {
		var self = this;
		var app = self.app;

		let userData = localStorage["userData"];

		if (!userData) {
			return await app.api_practice.requestUser();
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

	clearUserCredentials() {
		localStorage.removeItem("userCredentials");
		localStorage.removeItem("userData");
	};

	addCountTryLogin() {
		if (localStorage.getItem("countTryLogin")) {
			var count = parseInt(localStorage.getItem("countTryLogin"))
			localStorage.setItem("countTryLogin", count + 1);
		} else {
			localStorage.setItem("countTryLogin", 1);
		}
	}

	getCountTryLogin() {
		return localStorage.getItem("countTryLogin");
	}

	resetCountTryLogin() {
		localStorage.setItem("countTryLogin", 0);
	}
}