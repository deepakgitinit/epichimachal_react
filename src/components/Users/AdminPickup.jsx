import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/Auth";
import { Alert } from "../../utils/Alert";
import { Spinner } from "../../utils/Spinner";

const AdminPickups = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: ""
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
      const url = "http://localhost:5000/api/v1/pickup";
      const mytoken = "Bearer " + token;
      
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: mytoken
        },
      });

      if (
        response.data.status == "Successful"
      ) {
        displayMessage("success", response.data.message);
        setFormData({
            name: ""
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


  const deletePickup = async (id) =>{
    try{
        const url = `http://localhost:5000/api/v1/pickup/${id}`
        const mytoken = "Bearer " + token;

        const value = confirm("You sure want to delete Pickup Location.")

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
            return
        }

    } catch(error){
        displayMessage("danger", "Error Occured")
    }
  }

  useEffect(() => {
    const getPickups = async () => {
      const pickup = await axios.get(
        "http://localhost:5000/api/v1/pickup"
      );
      setItems(pickup.data.message);
    };
    getPickups();
  }, []);


  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        {showAlert && <Alert alert={alert} />}

        <div className="flex flex-wrap justify-center items-center" >
        {items && items.length>0 && items.map((item, index) => (
          <div key={item._id} className="flex items-center bg-slate-900 rounded-md mx-2 text-white px-2 py-1">
            
            <p className="mr-8 ">{item.name}</p>
            <p className="flex justify-center items-center bg-slate-100 bg-opacity-50 cursor-pointer rounded-full size-8" onClick={()=>{
                deletePickup(item._id)
            }}>x</p>
          </div>
        ))}
      </div>

        <h1 className="flex text-2xl font-semibold mb-2 mt-8 justify-center items-center">
          Add New Pickups:
        </h1>
        <div className="max-w-lg mx-auto mt-8">
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
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4"
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

export { AdminPickups };
