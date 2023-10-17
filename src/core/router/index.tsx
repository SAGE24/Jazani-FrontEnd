import { createBrowserRouter, type RouteObject } from "react-router-dom";

import Admin from "../layouts/Admin";
import Home from "../../home";
import PersonalTypeSearch from "../../generals/person-types/views/searchs";
// import MineralTypeSearch from '../../generals/mineral-types/views/searchs';
// import MineralSearch from '../../generals/minerals/views/searchs';

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Admin />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/personal-types",
        element: <PersonalTypeSearch />,
      },
    ],
  },
];

export default createBrowserRouter(routes);
