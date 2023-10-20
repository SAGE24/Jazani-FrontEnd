import { createBrowserRouter, type RouteObject } from "react-router-dom";

import { PrivateOutlet, PublicOutlet } from "@/core/router/CheckPageNavigation";

import Admin from "../layouts/Admin";
import Home from "../../home";
import PersonalTypeSearch from "../../generals/person-types/views/searchs";
import MineralTypeSearch from "../../generals/mineral-types/views/searchs";
// import MineralSearch from '../../generals/minerals/views/searchs';

import Auth from "../../core/layouts/Auth";
import Login from "../../auth/login/views";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <PrivateOutlet>
        <Admin />
      </PrivateOutlet>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/personal-types",
        element: (
          <PrivateOutlet>
            <PersonalTypeSearch />
          </PrivateOutlet>
        ),
      },
      {
        path: "/mineral-types",
        element: (
          <PrivateOutlet>
            <MineralTypeSearch />
          </PrivateOutlet>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicOutlet>
        <Auth />
      </PublicOutlet>
    ),
    children: [
      {
        index: true,
        element: (
          <PublicOutlet>
            <Login />
          </PublicOutlet>
        ),
      },
    ],
  },
];

export default createBrowserRouter(routes);
