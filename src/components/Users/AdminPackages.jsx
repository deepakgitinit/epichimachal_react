import React, { useState, useMemo } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/Auth";
import { Alert } from "../../utils/Alert";
import { Spinner } from "../../utils/Spinner";
import { PackagesGrid } from "../Packages/PackagesGrid";

const PackageForm = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: [],
    tags: [],
    destinations: [],
    time: "",
    thumbnail: null,
    description: ""
  });

  const { token } = useAuth();

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
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category" || name === "tags") {
      const valueArray = value.split(',');
      setFormData((prevState) => ({
        ...prevState,
        [name]: valueArray,
      }));

    } else if (name === "destinations") {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );

      setFormData((prevState) => ({
        ...prevState,
        [name]: selectedOptions,
      }));

    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const url = "http://localhost:5000/api/v1/packages";
      const mytoken = "Bearer " + token;

      console.log(formData);
      
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: mytoken,
          "Content-Type": "multipart/form-data",
        },
      });

      if (
        response.data.status == 200 ||
        response.data.status == 201 ||
        response.data.status == "Successful"
      ) {
        displayMessage("success", response.data.message);

      } else {
        displayMessage("danger", response.data.message);
      }

      setFormData({
        title: "",
        price: "",
        category: [],
        tags: [],
        destinations: [],
        time: "",
        thumbnail: null,
        description: ""
      });

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
      thumbnail: file,
    }));
  };

  useMemo(() => {
    const getDestinations = async () => {
      const destinations = await axios.get(
        "http://localhost:5000/api/v1/destinations"
      );
      setItems(destinations.data.allDestinations);
    };
    getDestinations();
  }, []);


  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        {showAlert && <Alert alert={alert} />}
        <PackagesGrid />

        <h1 className="flex text-2xl font-semibold mb-2 mt-8 justify-center items-center">
          Add New Package:
        </h1>
        <div className="max-w-lg mx-auto mt-8">
          {formData.thumbnail && (
            <img
              className="object-cover w-full rounded-md mb-4"
              src={URL.createObjectURL(formData.thumbnail)}
              alt="Selected Profile Image"
            />
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label htmlFor="price" className="block">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label htmlFor="category" className="block">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label htmlFor="tags" className="block">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label htmlFor="description" className="block">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label htmlFor="destinations" className="block">
                Destinations
              </label>
              <select
                id="destinations"
                required
                name="destinations"
                value={formData.destinations}
                multiple
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              >
                {items.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  );
                })}
              </select>
              <div className="mt-2">
                <label className="block">Selected Destinations:</label>
                <ul className="flex flex-wrap *:mr-2">
                  {formData.destinations.map((destination, index) => (
                    <li key={index}>{destination}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <label htmlFor="time" className="block">
                Time
              </label>
              <input
                type="text"
                id="time"
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>

            <div>
              <label htmlFor="thumbnail" className="block">
                Thumbnail
              </label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                required
                onChange={handleFileChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
};

export default PackageForm;
