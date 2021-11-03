import InitialPage from "../pages/initial.f7.html";
import HomePage from "../pages/home.f7.html";
import RightPanelPage from "../pages/right-panel.f7.html";

import ServicesPage from "../pages/services.f7.html";

import AboutPage from "../pages/about.f7.html";
import NotFoundPage from "../pages/404.f7.html";
import ContentPage from "../pages/content-page.f7.html";

import IsEnabled from "./isenabled";

//routes from template-apps-f7

const homePageRoute = function () {
  let route = {
    path: "/",
    component: HomePage,
  };
  let tabs = [];

  tabs.push({
    path: "/",
    id: "services",
    component: ServicesPage,
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
