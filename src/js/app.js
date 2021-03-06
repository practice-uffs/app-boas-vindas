import $$ from 'dom7';
import Framework7 from 'framework7/framework7.esm.bundle.js'

// Import F7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';
// Import Cordova APIs
import cordovaApp from './cordova-app.js';
// Import Routes
import routes from './routes.js';

import { Api } from './api';
import { Storage } from './storage.js';
import { Content } from './content';
import { Aura } from './aura.js';
import { ApiPractice } from './api_practice';
import { Abalytics } from './abalytics.js';

// Import main app component
import App from '../app.f7.html';

var handleExternalLinks = function () {
	$$(document).click(function (e) {
		var element = $$(e.target);
		if (element.hasClass("external")) {
			var url = $$(element).attr("href");
			if (url == "#") {
				url = $$(element).data("ext_href");
			}
			$$(element).attr("href", "#");
			$$(element).data("ext_href", url);
			window.open(url, "_system");
		}
	})
}

var app = new Framework7({
	root: '#app', // App root element
	component: App, // App main component
	id: 'cc.uffs.practice.uffs_virtual', // App bundle ID
	name: 'UFFS Virtual', // App name
	theme: 'auto', // Automatic theme detection

	// App routes
	routes: routes,

	// Register service worker
	serviceWorker: Framework7.device.cordova ? {} : {
		path: '/service-worker.js',
	},

	// Input settings
	input: {
		scrollIntoViewOnFocus: Framework7.device.cordova && !Framework7.device.electron,
		scrollIntoViewCentered: Framework7.device.cordova && !Framework7.device.electron,
	},

	// Cordova Statusbar settings
	statusbar: {
		iosOverlaysWebView: true,
		androidOverlaysWebView: false,
	},

	// Touch options
	touch: {
		tapHold: true,
	},

	on: {
		init: function () {
			var f7 = this;
			f7.$$ = $$;

			if (f7.device.cordova) {
				// Init cordova APIs (see cordova-app.js)
				cordovaApp.init(f7);
				window.open = cordova.InAppBrowser.open;

			} else {
				// Save context to allow 'Add to home screen'
				f7.deferredInstallPrompt = null;

				window.addEventListener('beforeinstallprompt', function (e) {
					// Stash the event so it can be triggered later.
					f7.deferredInstallPrompt = e;
					console.log('Saving beforeinstallprompt: ', e);
				})
			}

			window.screen.orientation.lock('portrait');

			if (typeof cordova !== 'undefined') {
				new Abalytics(f7);
			}

			new Storage(f7);
			new Api(f7);
			new Content(f7);
			new Aura(f7);
			new ApiPractice(f7);

			handleExternalLinks();
		},
	},
})