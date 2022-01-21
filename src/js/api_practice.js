export class ApiPractice {
	constructor(app) {
		this.app = app;
		this.app.api_practice = this;
		this.url = 'https://practice.uffs.edu.br/api/v0/';
	}

	async requestLogin(username, password) {
		var self = this;
		var app = self.app;

		return await app.request.promise.post(self.url + "auth", {
			"user": username,
			"password": password,
			"app_id": "1"
		}).then(async (res) => {
			let data = JSON.parse(res.data);
			app.storage.setUserData(data.user);
			if (data.passport) {
				app.storage.setUserCredentials(data);
				app.request.setup({
					headers: {
						Authorization: "Bearer " + data.passport,
					},
				});
				return true;
			} else {
				return false;
			}
		}).catch((err) => {
			return false;
		});
	};

	async requestLogout() {
		var self = this;
		var app = self.app;

		app.aura.clearChat();
		app.storage.clearUserCredentials();
		app.request.setup({
			headers: {
				Authorization: "",
			},
		});
		return true;
	};

	async requestUser() {
		var self = this;
		var app = self.app;

		return await app.request.promise.get(self.url + "user").then(async (res) => {
			let data = JSON.parse(res.data);
			if (data.error) {
				await this.requestLogout();
				return;
			}
			const userData = JSON.parse(res.data);
			app.storage.setUserData(userData);
			return data.user;
		});
	}

	async ping() {
		var self = this;
		var app = self.app;

		return await app.request.promise.get(self.url + "ping").then(async (res) => {
			let data = JSON.parse(res.data);
			if (data.error) {
				return false;
			}
			return true;
		});
	}
}