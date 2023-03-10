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
		if (localStorage.getItem("darkTheme") == null) {
			return 'true';
		}
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

	async setDiaryText(data, text) {
		var diary_content = [];
		var index = -1;
		if (localStorage.getItem("diary_content")) {
			diary_content = JSON.parse(localStorage.getItem("diary_content"));
			/*/ var filteredObj = diary_content.find(function(item, i) {
				if (item.data == data){
				return i;
			  }
			});
			if (filteredObj) {
				var json = {"mensagem": text, "data": data};
				diary_content[filteredObj].mensagem = JSON.stringify(json);
			} /*/
			for (var i = 0; i < diary_content.length; i++) {
				if (diary_content[i]['data'] == data) {
					index = i;
				}
			}
			if (index != (-1)) {
				console.log(index);
				diary_content[index]['mensagem'] = text;
				localStorage.setItem('diary_content', JSON.stringify(diary_content));
			}
			else {
				diary_content.push({"mensagem":text, "data":data });
				localStorage.setItem('diary_content', JSON.stringify(diary_content));
			}
		}
		else {
			diary_content = [{"mensagem": text, "data": data}];
			localStorage.setItem("diary_content", JSON.stringify(diary_content));
		}
	}

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

	getCountdownLogin() {
		return localStorage.getItem("getCountdownLogin");
	}

	setCountdownLogin(value) {
		localStorage.setItem("getCountdownLogin", value);
	}

	getDiaryText(data) {
		var diary_content = JSON.parse(localStorage.getItem('diary_content'));

		for (var i = 0; i < diary_content.length; i++) {
			if (diary_content[i]['data'] == data) {
				return diary_content[i]['mensagem'];
			}
		} 
	}
}