import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/Auth";
import { Alert } from "../../utils/Alert";
import { Spinner } from "../../utils/Spinner";

const AdminTaxi = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    number: "",
    image: null,
  });

  const { token, handleReload} = useAuth();

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
      const url = "http://localhost:5000/api/v1/taxi";
      const mytoken = "Bearer " + token;
      
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: mytoken,
          "Content-Type": "multipart/form-data",
        },
      });

      if (
        response.data.status == "Successful"
      ) {
        displayMessage("success", response.data.message);
        setFormData({
            name: "",
            type: "",
            number: "",
            image: null,
        });
        setTimeout(() => {
            handleReload()
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

  const deleteTaxi = async (id) =>{
    try{
        const url = `http://localhost:5000/api/v1/taxi/${id}`
        const mytoken = "Bearer " + token;

        const value = confirm("You sure want to delete Taxi.")

        if (value) {
            const response = await axios.delete(url,{
                headers: {
                    Authorization: mytoken,
                }
            });
            if (response.data.status == "Successful") {
                displayMessage("success", response.data.message);
                setTimeout(() => {
                    handleReload()
                }, 1500);
                return;
            }
            displayMessage("danger", "Internal Error Occured")
            
        }else{
            displayMessage("success", "Not confirmed from User.")
        }

    } catch(error){
        displayMessage("danger", "Error Occured")
    }
  }

  useEffect(() => {
    const getTaxi = async () => {
      const taxi = await axios.get(
        "http://localhost:5000/api/v1/taxi"
      );
      setItems(taxi.data.message);
    };
    getTaxi();
  }, []);


  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        {showAlert && <Alert alert={alert} />}

        <div className="flex flex-wrap justify-center items-center" >
        {items && items.length>0 && items.map((car, index) => (
          <div key={index} className={`flex flex-col relative justify-center items-center w-64 my-2 mx-2 `}>
            <div className="flex cursor-pointer bg-opacity-50 hover:bg-opacity-100 absolute size-8 text-center justify-center items-center top-1 right-1 bg-slate-900 text-white rounded-full" onClick={()=>{deleteTaxi(car._id)}}>&#x2715;</div>
            <img src={"http://localhost:5000/" + car.image} alt={car.name} className={`w-full h-auto`} />
            <p className='lg:text-sm text-xs shadow-2xl'>{car.name}</p>
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
                Image
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

export { AdminTaxi };
