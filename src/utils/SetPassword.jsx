import { useState, useRef } from "react";
import { useAuth } from "../contexts/Auth";
import { Alert } from "../utils/Alert";
import { Spinner } from "../utils/Spinner";
import axios from "axios";

function SetPassword() {
  const { token,  handleReload } = useAuth();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const password = useRef();

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

  const handleResetPassword = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const mytoken = "Bearer " + token;
      const url = `http://localhost:5000/api/v1/users/setpassword`;
      const mypassword = password.current.value;

      if (mypassword.length<5) {
        displayMessage("danger", "Set Password more than 5 Characters.")
        return;
      }

      const myresponse = await axios.post(url, {password: mypassword},{
        headers: {
            Authorization: mytoken,
        }
      }
      );

      console.log(myresponse.data);
      if (myresponse.data.status == "Successful") {
        displayMessage("success", myresponse.data.message);
      } else {
        displayMessage("danger", myresponse.data.message) ;
        return;
      }

    setTimeout(() => {
        handleReload();
    }, 1500);

    } catch (error) {
      let customError = error.response.data.message;
    //   console.log("Internal Error: ", error);
      if (customError.message== "jwt expired") {
          displayMessage("danger", "Token is Expired. Please resend password reset token.");
      }else{
        displayMessage("danger", customError)
      }

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
            <img
              className="mx-auto h-10 w-auto invert"
              src="/src/assets/Logo.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Reset Password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleResetPassword}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Passowrd
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="text"
                    autoComplete="password"
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

export { SetPassword };
