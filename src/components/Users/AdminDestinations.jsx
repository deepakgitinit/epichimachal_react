import React, { useState } from "react";
import { useAuth } from "../../contexts/Auth";
import axios from "axios";
import { Alert } from "../../utils/Alert";
import { Spinner } from "../../utils/Spinner";
import { DestinationGrid } from "../Destinations/DestinationGrid";

const AddDestination = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
    tags: [],
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
    }, 1500);
  };

  const handleDataChange = (e) => {
    const { id, value } = e.target;

    if (id === "tags") {
      const valueArray = value.split(','); // Split the string into an array
      setFormData((prevState) => ({
        ...prevState,
        [id]: valueArray,
      }));
      
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prevFormData) => ({
      ...prevFormData,
      images: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const url = `${import.meta.env.VITE_DESTINATIONS}`;
      const mytoken = "Bearer " + token;

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: mytoken,
        },
      });

      if (
        response.data.status == "Successful"
      ) {
        displayMessage("success", response.data.message);
        setFormData({
          title: "",
          description: "",
          images: [],
          tags: [],
        });
      } else {
        displayMessage("danger", response.data.message);
        return;
      }
      

    } catch (error) {
      displayMessage("danger", "Internal Error Occured2.");
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
        <DestinationGrid />

        <h1 className="flex text-2xl font-semibold mb-2 justify-center items-center">
          Add New Destination:
        </h1>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleDataChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleDataChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <div className="grid gap-2 lg:grid-cols-3 md:grid-cols-2">
              {formData.images.map((image, index) => (
                <img
                  key={index}
                  className="object-cover rounded-md"
                  src={URL.createObjectURL(image)}
                  alt="Selected Image"
                />
              ))}
            </div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Images <span className="text-xs text-red-700">(less than 1mb)</span>
            </label>
            <input
              type="file"
              id="images"
              name="images[]"
              onChange={handleImageChange}
              multiple
              accept="image/jpeg, image/jpg, image/png, image/webp"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleDataChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Item
          </button>
        </form>
      </>
    );
  }
};

export { AddDestination };
