import { useState, useEffect } from "react";
import { useAuth } from "../contexts/Auth";
import { Alert } from "../utils/Alert";
import { Spinner } from "../utils/Spinner";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function EmailVerification() {
  const { handleReload } = useAuth();
  const { id } = useParams();

  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const displayMessage = (type, message) => {
    setShowAlert(true);
    setAlert({ type: type, message: message });
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };

  const handleVerification = async () => {
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_USERS}/${id}`;
      const myresponse = await axios.get(url);

      setResult(myresponse.data.message);

      if (myresponse.data.status == "Successful") {
        displayMessage("success", myresponse.data.message);

        setTimeout(() => {
          handleReload();
        }, 1500);
        
        return;

      } else {
        displayMessage("danger", myresponse.data.message);
        return;
      }

    } catch (error) {
      let customError = error.response.data.message.message;
      console.log("Internal Error: ", error, customError);
      setResult(customError);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleVerification();
  }, [id]);

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
              Email Verification
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-center">
            {result && result ? result : "Loading..."}
          </div>
          <div className="flex justify-center items-center">
            <Link
              to={"/resend"}
              className="mt-10 text-center text-sm font-bold leading-9 tracking-tight text-slate-100 bg-slate-900 hover:bg-slate-800 rounded-md w-fit px-3"
            >
              resend verification
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export { EmailVerification };
