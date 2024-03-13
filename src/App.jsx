import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./App.css";
import Root from "./routes/root";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Auth } from './contexts/Auth'
import { About } from "./components/About";
import { DestinationsPage } from "./components/Destinations";
import ErrorPage from "./utils/Error-page";
import { PackagesPage } from "./components/Packages";
import { Profile } from "./components/Users/Profile";
import { Dashboard } from "./components/Users/Dashboard";

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
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
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
