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
import { Destinations } from "./components/Destinations";
import ErrorPage from "./components/Error-page";
import { Packages } from "./components/Packages";

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
        element: <Destinations />
      },
      {
        path: "/packages",
        element: <Packages />
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
