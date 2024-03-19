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
import { Package } from "./components/Packages/Package";
import { Destination } from "./components/Destinations/Destination";
import { ForgotPassword } from "./utils/ForgotPassword";
import { ForgotPassVerification } from "./utils/ForgotPassVerification";
import { EmailVerification } from "./utils/VerficationEmail";
import { ResendVerification } from "./utils/ResendVerification";
import { Settings } from "./components/Users/Settings";
import { Blog } from "./components/Blog";
import { ContactPage } from "./components/ContactPage";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { PackageFormUpdate } from "./components/Users/AdminPackageUpdate";

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
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <ContactPage />
      },
      {
        path: "/blog",
        element: <Blog />
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />
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
        path: "/packages/update/:id",
        element: <PackageFormUpdate />
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
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/verification/:id",
        element: <EmailVerification />,
      },
      {
        path: "/resend/",
        element: <ResendVerification />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/resetpassword/:id",
        element: <ForgotPassVerification />,
      }
      
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
