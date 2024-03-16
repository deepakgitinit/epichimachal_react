import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./App.css";
import Root from "./routes/root";
import ErrorPage from "./utils/Error-page";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Auth } from './contexts/Auth'
import { About } from "./components/About";
import { DestinationsPage } from "./components/Destinations";
import { PackagesPage } from "./components/Packages";
import { Profile } from "./components/Users/Profile";
import { Dashboard } from "./components/Users/Dashboard";
import { Admin } from "./components/Users/Admin";
import Package from "./components/Packages/Package";
import { Destination } from "./components/Destinations/Destination";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/destinations",
        element: <DestinationsPage />
      },
      {
        path: "/packages",
        element: <PackagesPage />
      },
      {
        path: "/packages/:id",
        element: <Package />
      },
      {
        path: "/destinations/:id",
        element: <Destination />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin",
        element: <Admin/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/signup",
        element: <Signup/>
      },
      {
        path: "/about",
        element: <About />
      },
      
    ]
  },
]);

export default function App (){
  return (
    <>
      <Auth>
        <RouterProvider router={router} />
      </Auth>
    </>
  );
};
