import InitialPage from "../pages/initial.f7.html";
import HomePage from "../pages/home.f7.html";
import RightPanelPage from "../pages/right-panel.f7.html";

import EnvPage from "../pages/env.f7.html";
import ServicesPage from "../pages/services.f7.html";

import NotificationsPage from "../pages/notifications.f7.html";
import SettingsPage from "../pages/settings.f7.html";
import AboutPage from "../pages/about.f7.html";
import NotFoundPage from "../pages/404.f7.html";
import AboutMorePage from "../pages/about-more.f7.html";
import LocalClimatePage from "../pages/local-climate.f7.html";
import StudentAidPage from "../pages/student-aid.f7.html";
import LeisurePage from "../pages/leisure.f7.html";
import GroupsPage from "../pages/groups.f7.html";
import ChannelsPage from "../pages/channels.f7.html";

import { storage } from "../js/storage.js";
import IsEnabled from "./isenabled";
import App from '../js/app.js';

//routes from template-apps-f7

const homePageRoute = function () {
  let route = {
    path: "/",
    component: HomePage,
  };
  

  let tabs = [];

  if (IsEnabled.servicesPage)
    tabs.push({
      path: "/",
      id: "services",
      component: ServicesPage,
    });

  if (IsEnabled.envPage)
    tabs.push({
      path: "/env/",
      id: "env",
      component: EnvPage,
    });

  route.tabs = tabs;
  return route;
};

const rightPanelRoute = function () {
  let route = {
    path: "/right-panel/",
    panel: {
      component: RightPanelPage,
    },
  };

  if (IsEnabled.rightPanel) return route;
};

const notificationsPageRoute = function () {
  let route = {
    path: "/notifications/",
    component: NotificationsPage,
  };

  if (IsEnabled.notificationsPage) return route;
};

const settingsPageRoute = function () {
  let route = {
    path: "/settings/",
    component: SettingsPage,
  };

  if (IsEnabled.settingsPage) return route;
};

const aboutPageRoute = function () {
  let route = {
    path: "/about/",
    component: AboutPage,
  };

  if (IsEnabled.aboutPage) return route;
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

const aboutMorePageRoute = function () {
  let route = {
    path: '/about-more/',
    component: AboutMorePage,
    on: {
      // pageInit: storage.fetchContentAboutMorePage, //carrega conteúdo do json pra tela
    }
  };

  if (IsEnabled.aboutMorePage) return route;
}

const localClimatePageRoute = function () {
  let route = {
    path: '/local-climate/',
    component: LocalClimatePage,
  };

  if (IsEnabled.localClimatePage) return route;
}

const studentAidPageRoute = function () {
  let route = {
    path: '/student-aid/',
    component: StudentAidPage,
  };

  if (IsEnabled.studentAidPage) return route;
}

const leisurePageRoute = function () {
  let route = {
    path: '/leisure/',
    component: LeisurePage,
  };

  if (IsEnabled.leisurePage) return route;
}

const groupsPageRoute = function () {
  let route = {
    path: '/groups/',
    component: GroupsPage,
  };

  if (IsEnabled.groupsPage) return route;
}

const channelsPageRoute = function () {
  let route = {
    path: '/channels/',
    component: ChannelsPage,
  };

  if (IsEnabled.channelsPage) return route;
}





var routes = [
  homePageRoute(),
  rightPanelRoute(),
  notificationsPageRoute(),
  settingsPageRoute(),
  aboutPageRoute(),
  
  //new routes
  aboutMorePageRoute(),
  localClimatePageRoute(),
  studentAidPageRoute(),
  leisurePageRoute(),
  groupsPageRoute(),
  channelsPageRoute(),

  initialPageRoute(),
  notFoundPageRoute(),
];

// Removing undefined routes
var routes = routes.filter(function (el) {
  return el != null;
});

export default routes;
