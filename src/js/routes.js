import InitialPage from "../pages/initial.f7.html";
import HomePage from "../pages/home.f7.html";
import RightPanelPage from "../pages/right-panel.f7.html";

import MenuPage from "../pages/menu.f7.html";
import ProceduresGuidesPage from "../pages/procedures.f7.html";
 
import AboutPage from "../pages/about.f7.html";
import NotFoundPage from "../pages/404.f7.html";
import ContentPage from "../pages/content-page.f7.html";

import FreshmanGuidePage from "../pages/freshman-guide-page.f7.html";
import AuraPage from "../pages/bemestar.f7.html";
import LoginPage from "../pages/login.f7.html";

import MeditationPage from '../pages/meditation.f7.html';
import SeekHelpPage from '../pages/seek-help.f7.html';
import DiaryPage from '../pages/diary.f7.html';
import MyStatisticsPage from '../pages/my-statistics.f7.html';

import IsEnabled from "./isenabled";

//routes from template-apps-f7

const homePageRoute = function () {
	let route = {
		path: "/",
		component: HomePage,
	};
	let tabs = [];

	if (IsEnabled.menuPage) {
		tabs.push({
			path: "/",
			id: "menu",
			component: MenuPage,
		});
	}
	if (IsEnabled.auraPage) {
		tabs.push({
			path: "/aura/",
			id: "aura",
			component: AuraPage,
		})
	}

	route.tabs = tabs;
	return route;
};

const proceduresGuidesPage = function () {
  return {
    path: '/procedures/',
    component: ProceduresGuidesPage,
  };
}

const rightPanelRoute = function () {
	let route = {
		path: "/right-panel/",
		panel: {
			component: RightPanelPage,
		},
	};

	if (IsEnabled.rightPanel) return route;
};

const aboutPageRoute = function () {
	let route = {
		path: "/about/",
		component: AboutPage,
	};

	if (IsEnabled.aboutPage) return route;
};

const loginPageRoute = function () {
	let route = {
		path: "/login/",
		component: LoginPage,
	};

	if (IsEnabled.loginPage) return route;
};


const initialPageRoute = function () {
	return {
		path: "/initial/",
		component: InitialPage
	};
};


const notFoundPageRoute = function () {
	return {
		path: "(.*)",
		component: NotFoundPage,
	};
};

//new routes
const contentPageRoute = function () {
	return {
		path: '/content/:name',
		component: ContentPage,
	};
}

const freshmanGuidePageRoute = function () {
  let route = {
    path: "/guia_calouros/",
    component: FreshmanGuidePage,
  };

  return route;
};

const meditationPage = function () {
	let route = {
	  path: "/meditation/",
	  component: MeditationPage,
	};
  
	return route;
  };

const diaryPage = function () {
	let route = {
	  path: "/diary/",
	  component: DiaryPage,
	};
  
	return route;
  };

const seekHelpPage = function () {
	let route = {
	  path: "/seekhelp/",
	  component: SeekHelpPage,
	};
  
	return route;
  };
  

var routes = [

  homePageRoute(),
  rightPanelRoute(),
  aboutPageRoute(),
  loginPageRoute(),
  
  //new routes
  contentPageRoute(),
  proceduresGuidesPage(),
  freshmanGuidePageRoute(),

  initialPageRoute(),
  notFoundPageRoute(),

  meditationPage(),
  seekHelpPage(),
  diaryPage(),
];

// Removing undefined routes
var routes = routes.filter(function (el) {
	return el != null;
});

export default routes;