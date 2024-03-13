import { useRouteError } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <div className="flex flex-col justify-evenly min-h-screen">
        <Navbar />
        <div className="mb-auto">
          <div
            id="error-page"
            className="flex flex-col mx-16 items-center justify-center mt-16"
          >
            <h1 className="text-5xl my-4">Oops! Not Found.</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
