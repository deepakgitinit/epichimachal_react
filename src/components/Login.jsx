import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { Alert } from "../utils/Alert";
import { Spinner } from "../utils/Spinner";

function Login() {
  const { login, isAuthenticated, handleReload } = useAuth();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const email = useRef();
  const password = useRef();

  const displayMessage = (type, message) => {
    setShowAlert(true);
    setAlert({ type: type, message: message });
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      const myemail = email.current.value;
      const mypassword = password.current.value;

      const myresponse = await login(myemail, mypassword);
      if (
        myresponse.data.status == 200 ||
        myresponse.data.status == 201 ||
        myresponse.data.status == "Successful"
      ) {
        displayMessage("success", "Login Successful");
      } else {
        displayMessage("danger", myresponse.data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setTimeout(() => {
        handleReload();
      }, 2000);
      
    } catch (error) {
      console.log("Internal Error: ", error);
      displayMessage("danger", "Internal Error Occured");
      setLoading(false);
    }
  };

  if (isAuthenticated()) {
    {
      window.location.replace("http://localhost:5173/");
    }
  } else {
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <>
          {showAlert && <Alert alert={alert} />}
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto invert"
                src="src/assets/Logo.png"
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Log in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      ref={email}
                      value={formData.email || ""}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 p-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <Link
                        to="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      ref={password}
                      value={formData.password || ""}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 p-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Log in
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Do not have an account yet! {"  "}
                <Link
                  to="/signup"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Create an account!
                </Link>
              </p>
            </div>
          </div>
        </>
      );
    }
  }
}

export { Login };
