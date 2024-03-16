import axios from "axios";
import { useState, useMemo } from "react";
import { useAuth } from "../../contexts/Auth";
import { Alert } from "../../utils/Alert";
import { Spinner } from "../../utils/Spinner";

const PackagesGrid = () => {
  const [items, setItems] = useState([]);

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

  useMemo(() => {
    const getPackages = async () => {
      const packages = await axios.get("http://localhost:5000/api/v1/packages");
      const reversePackages = packages.data.allPackages.reverse();
      setItems(reversePackages);
    };
    getPackages();
  }, []);

  const openPackage = (id) => {
    console.log(id);
  };

  const deletePackage = async (e, id) => {
    e.preventDefault();
    try {
      const value = confirm("Do you want to delete Destination?");

      if (value) {
        setLoading(true);
        const url = `http://localhost:5000/api/v1/packages/${id}`;
        const mytoken = "Bearer " + token;

        const response = await axios.delete(url, {
          headers: {
            Authorization: mytoken,
          },
        });

        console.log(response);

        if (
          response.data.status == 200 ||
          response.data.status == 201 ||
          response.data.status == "Successful"
        ) {
          displayMessage("success", response.data.message);
          setTimeout(() => {
            handleReload();
          }, 1000);
        }
      } else {
        displayMessage("danger", response.data.message);
        return;
      }
    } catch (error) {
      displayMessage("danger", "Internal Error Occured.");
    } finally {
      setLoading(false);
    }
  };


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
                className="relative mx-2 my-4 bg-slate-100 rounded-md w-64 hover:shadow-xl transition-shadow cursor-pointer"
                key={item._id}
                onClick={() => {
                  openPackage(item._id);
                }}
              >
                <p className="absolute text-xs bg-slate-900 text-slate-100 px-2 py-1 m-2 right-0 rounded-md">
                  {item.category.length != 0 ? item.category : "Category"}
                </p>
                <img
                  className="rounded-t-md"
                  src={"http://localhost:5000/" + item.thumbnail}
                  alt=""
                />
                <div className="discription py-2 px-4">
                  <h1 className="text-base">
                    <b>{item.title}</b>
                  </h1>
                  <p className="text-lg">Rs.{item.price}</p>
                  {item.destinations.length != 0 ? (
                    <p>Destinations: {item.destinations.length}</p>
                  ) : (
                    ""
                  )}
                  <p>Time: {item.time}</p>
                  <button
                    className="absolute top-0 text-xs py-1 px-2 my-2 rounded-md bg-red-800 hover:bg-red-700 text-slate-100"
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
