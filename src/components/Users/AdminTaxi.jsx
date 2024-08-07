import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/Auth";
import { Alert } from "../../utils/Alert";

const AdminTaxi = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    number: "",
    image: null,
  });

  const { token, handleReload, logout, validateToken } = useAuth();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_TAXI}`;
      const mytoken = "Bearer " + token;

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: mytoken,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status == "Successful") {
        displayMessage("success", response.data.message);
        setFormData({
          name: "",
          type: "",
          number: "",
          image: null,
        });
        setTimeout(() => {
          handleReload();
        }, 1500);
      } else {
        displayMessage("danger", response.data.message);
      }
    } catch (error) {
      displayMessage("danger", "Error Occured");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const deleteTaxi = async (id) => {
    setLoading(true)
    try {
      const url = `${import.meta.env.VITE_TAXI}/${id}`;
      const mytoken = "Bearer " + token;

      const value = confirm("You sure want to delete Taxi.");

      if (value) {
        const response = await axios.delete(url, {
          headers: {
            Authorization: mytoken,
          },
        });
        if (response.data.status == "Successful") {
          displayMessage("success", response.data.message);
          setTimeout(() => {
            handleReload();
          }, 1500);
          return;
        }
        displayMessage("danger", "Internal Error Occured");
      } else {
        displayMessage("success", "Not confirmed from User.");
      }
    } catch (error) {
      displayMessage("danger", "Error Occured");
    } finally {
      setLoading(false)
    }
  };

  const handleError = (e) =>{
    e.target.src = "\\public\\Loading_Image.png";
  };

  useEffect(() => {
    const getTaxi = async () => {
      if(!validateToken()){
        logout();
      }
      const taxi = await axios.get(`${import.meta.env.VITE_TAXI}`);
      setItems(taxi.data.message);
    };
    getTaxi();
  }, []);


  return (
    <>
      {showAlert && <Alert alert={alert} />}

      <div className="flex flex-wrap justify-center items-center">
        {items &&
          items.length > 0 &&
          items.map((car, index) => (
            <div
              key={index}
              className={`flex flex-col relative justify-center items-center w-64 my-2 mx-2 `}
            >
              <div
                className="flex cursor-pointer bg-opacity-50 hover:bg-opacity-100 absolute size-8 text-center justify-center items-center top-1 right-1 bg-slate-900 text-white rounded-full"
                onClick={() => {
                  deleteTaxi(car._id);
                }}
              >
                &#x2715;
              </div>
              <img
                src={`${import.meta.env.VITE_LOCALHOST}/` + car.image}
                alt={car.name}
                className={`w-full h-auto`}
                onError={handleError}
              />
              <p className="lg:text-sm text-xs shadow-2xl">{car.name}</p>
            </div>
          ))}
      </div>

      <h1 className="flex text-2xl font-semibold mb-2 mt-8 justify-center items-center">
        Add New Taxi:
      </h1>
      <div className="max-w-lg mx-auto mt-8">
        {formData.image && (
          <img
            className="object-cover w-full rounded-md mb-4"
            src={URL.createObjectURL(formData.image)}
            alt="Selected Image"
          />
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div>
            <label htmlFor="type" className="block">
              Type
            </label>
            <input
              type="text"
              id="type"
              name="type"
              required
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>

          <div>
            <label htmlFor="number" className="block">
              Total Taxies
            </label>
            <input
              type="number"
              id="number"
              name="number"
              required
              value={formData.number}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>

          <div>
            <label htmlFor="image" className="block">
              Image <span className="text-xs text-red-700">(less than 1mb)</span>
            </label>
            <input
              type="file"
              id="image"
              name="image"
              required
              onChange={handleFileChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded-md"
              disabled={loading}
            >
              {loading?<img className="animate-spin mr-2 invert" src="/rotate_right.svg"/>:null}
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export { AdminTaxi };
