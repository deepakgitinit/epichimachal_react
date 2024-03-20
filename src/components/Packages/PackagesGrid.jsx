import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/Auth";
import { Alert } from "../../utils/Alert";
import { Spinner } from "../../utils/Spinner";
import { useNavigate } from "react-router-dom";

const PackagesGrid = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const { token, handleReload } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [myalert, setAlert] = useState({
    type: "",
    message: "",
  });

  const displayMessage = (type, message) => {
    setShowAlert(true);
    setAlert({ type: type, message: message });
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  useEffect(() => {
    const getPackages = async () => {
      const packages = await axios.get(`${import.meta.env.VITE_PACKAGES}`);
      const reversePackages = packages.data.allPackages.reverse();
      setItems(reversePackages);
    };
    getPackages();
  }, []);

  const deletePackage = async (e, id) => {
    e.preventDefault();
    try {
      const value = confirm("Do you want to delete Destination?");

      if (value) {
        setLoading(true);
        const url = `${import.meta.env.VITE_PACKAGES}/${id}`;
        const mytoken = "Bearer " + token;

        const response = await axios.delete(url, {
          headers: {
            Authorization: mytoken,
          },
        });

        if (
          response.data.status == "Successful"
        ) {
          displayMessage("success", response.data.message);
          setTimeout(() => {
            handleReload();
          }, 1500);
        }

      } else {
        displayMessage("danger", "Cancelled by User");
      }
    } catch (error) {
      displayMessage("danger", "Internal Error Occured.");
    } finally {
      setLoading(false);
    }
  };

  const gotoPackage = (id) =>{
    navigate(`/packages/${id}`)
  }
  const gotoPackageUpdate = (id) =>{
    navigate(`/packages/update/${id}`)
  }


  if (loading) {
    return <Spinner />;
  } else {
  return (
    <>
    {showAlert && <Alert alert={myalert} />}
      <div className="flex flex-col mx-2 text-center justify-center items-center mt-16 w-full">
        <h1 className="text-3xl my-2">
          <b>Packages</b>
        </h1>
        <hr className="mb-8 w-1/3" />
      </div>
      <div className="lg:mx-16 md:mx-8 text-sm flex items-center justify-center">
        <div className="flex flex-wrap place-items-center">
          {items.map((item) => {
            return (
              <div
                className="relative mx-2 my-4 bg-slate-100 rounded-md w-64 hover:shadow-xl transition-shadow"
                key={item._id}
              >
                <p className="absolute text-xs bg-slate-900 text-slate-100 px-2 py-1 m-2 right-0 rounded-md">
                  {item.category.length != 0 ? item.category : "Category"}
                </p>
                <img
                  className="rounded-t-md"
                  src={`${import.meta.env.VITE_LOCALHOST}/` + item.thumbnail}
                  alt=""
                />
                <div className="discription py-2 px-4" >
                  <h1 className="text-base">
                    <b>{item.title}</b>
                  </h1>
                  <p className="text-base">Rs.{item.price}</p>
                  <p className="">Passengers.{item.passengers}</p>
                  {item.destinations.length != 0 ? (
                    <p>Destinations: {item.destinations.length}</p>
                  ) : (
                    ""
                  )}
                  <p>Time: {item.time}</p>
                  
                  <button
                    className="text-xs py-1 px-2 my-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-100"
                    onClick={() => {
                      gotoPackage(item._id);
                    }}
                  >
                    Open
                  </button>


                  <button
                    className="text-xs mx-2 py-1 px-2 my-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-100"
                    onClick={() => {
                      gotoPackageUpdate(item._id);
                    }}
                  >
                    Update
                  </button>

                  <button
                    className="absolute top-0 left-2 text-xs py-1 px-2 my-2 rounded-md bg-red-800 hover:bg-red-700 text-slate-100"
                    onClick={(e) => {
                      deletePackage(e, item._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
}

export { PackagesGrid };
