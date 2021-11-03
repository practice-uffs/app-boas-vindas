import InitialPage from "../pages/initial.f7.html";
import HomePage from "../pages/home.f7.html";
import RightPanelPage from "../pages/right-panel.f7.html";

import EnvPage from "../pages/env.f7.html";
import ServicesPage from "../pages/services.f7.html";

import NotificationsPage from "../pages/notifications.f7.html";
import SettingsPage from "../pages/settings.f7.html";
import AboutPage from "../pages/about.f7.html";
import NotFoundPage from "../pages/404.f7.html";
import ContentPage from "../pages/content-page.f7.html";


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
const contentPageRoute = function () {
  return {
    path: '/content/:name',
    component: ContentPage,
  };
}

var routes = [
  homePageRoute(),
  rightPanelRoute(),
  notificationsPageRoute(),
  settingsPageRoute(),
  aboutPageRoute(),
  
  //new routes
  contentPageRoute(),

  initialPageRoute(),
  notFoundPageRoute(),
];

// Removing undefined routes
var routes = routes.filter(function (el) {
  return el != null;
});

export default routes;
