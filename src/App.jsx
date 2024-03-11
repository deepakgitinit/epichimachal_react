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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/signup",
        element: <Signup/>
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
