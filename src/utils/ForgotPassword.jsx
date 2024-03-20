import { useState, useRef } from "react";
import { useAuth } from "../contexts/Auth";
import { Alert } from "../utils/Alert";
import { Spinner } from "../utils/Spinner";
import axios from "axios";

function ForgotPassword() {
  const { handleReload } = useAuth();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const email = useRef();

  const displayMessage = (type, message) => {
    setShowAlert(true);
    setAlert({ type: type, message: message });
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_USER_FORGOTPASSWORD}`;
      const myemail = email.current.value;

      const myresponse = await axios.post(url, {
        email: myemail,
    });

      if (myresponse.data.message.status == "Successful") {
        displayMessage("success", myresponse.data.message);
      } else {
        displayMessage("danger", myresponse.data.message);
        return;
      }

      setTimeout(() => {
        handleReload();
      }, 1500);

    } catch (error) {
      let customError = error.response.data.message;
      console.log("Internal Error: ", error);
      displayMessage("danger", customError);

    } finally {
      setLoading(false);
    }
  };

    if (loading) {
      return <Spinner />;
    } else {
      return (
        <>
          {showAlert && <Alert alert={alert} />}
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <Link to={"/"}><img
                className="mx-auto h-10 w-auto invert"
                src="/Logo.png"
                alt="Epic Himachal"
              /></Link>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Forgot Password
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleForgotPassword}>
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
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      );
    }
  }

export { ForgotPassword };
