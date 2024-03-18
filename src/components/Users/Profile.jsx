import axios from "axios";
import { useAuth } from "../../contexts/Auth";
import { useEffect, useState } from "react";
import { Alert } from "../../utils/Alert";
import { Spinner } from "../../utils/Spinner";

const Profile = () => {
  const {token, isAuthenticated, updateProfile, profileImg, handleReload } = useAuth();

  const [userDetails, setUserDetails] = useState({});
  const [profileImage, setProfileImage] = useState(null);


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

  const getProfile = async () => {
    try {
      setLoading(true);
      const userUrl = import.meta.env.VITE_USER_PROFILE;
      const mytoken = "Bearer " + token;

      const response = await axios.get(userUrl, {
        headers: {
          "Authorization": mytoken,
        },
      });

      if(response.data.profile == "" || response.data.profile == undefined){
        localStorage.setItem("profile", "http://localhost:5173/src/assets/default-avatar-icon.jpg")
      } else{
        localStorage.setItem("profile", "http://localhost:5173/" + response.data.profile)
      }

      if (
        response.data.status == "Successful"
      ) {
        setUserDetails(response.data.message);
        // displayMessage("success", "Profile Loaded Succesful.");

      } else {
        displayMessage("danger", response.data.message);
        setLoading(false);
        return;
      }

      setLoading(false);

    } catch (error) {
      displayMessage("danger", "Error Occured.")
      setLoading(false);
    }
  };

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = async (e) => {
    setProfileImage(e.target.files[0]);
    setUserDetails({
        ...userDetails,
        profile: e.target.files[0]
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        setLoading(true)

        if (userDetails.phone.length <10) {
          setLoading(false)
          displayMessage("danger", "Enter Valid Phone number.")
          return
        }

        const response = await updateProfile(userDetails);

        if(response.data.profile == "" || response.data.profile == undefined){
          localStorage.setItem("profile", "http://localhost:5173/src/assets/default-avatar-icon.jpg")
        } else{
          localStorage.setItem("profile", "http://localhost:5173/" + response.data.profile)
        }
        
        if (
          response.data.status == "Successful"
          ) {
            displayMessage("success", response.data.message);
            setTimeout(() => {
              handleReload()
            }, 1500);

          } else {
            displayMessage("danger", response.data.message);
          }

        setLoading(false);

      } catch (error) {
        displayMessage("danger", "Internal Error Occured.")
        setLoading(false);
      }
  };

  useEffect(() => {
    getProfile();
  }, []);


  if (isAuthenticated()) {
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <>
          {showAlert && <Alert alert={alert} />}

          <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md text-sm">
            <div className="*:size-16 *:rounded-full">
            {profileImage?"":<img
              className="object-cover"
              src={profileImg}
              alt=""
              />}
            {profileImage && (
                <img
                className="object-cover"
                src={URL.createObjectURL(profileImage)}
                alt="Selected Profile Image"
                style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
                )}
            </div>

            <div className="flex flex-row items-center *:mx-2">
                <h2 className="text-2xl font-semibold my-4">Profile Page</h2>
                <p>{userDetails.verified?"Verified":""}</p>
            </div>
            <form onSubmit={handleSubmit}>

            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userDetails.name || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md mt-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700">
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={userDetails.address || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md mt-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userDetails.email}
                  disabled
                  className="w-full px-4 py-2 border rounded-md mt-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700">
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={userDetails.phone || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md mt-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4 text-sm">
              <label htmlFor="profile" className="block text-gray-700 mb-2">
                  Profile Picture:
                </label>
                <input
                  type="file"
                  id="profile"
                  name="profile"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <div className="mb-4 flex">
                <label htmlFor="subscription" className="block text-gray-700">
                  Newsletter Subscription:
                </label>
                <input
                  type="checkbox"
                  id="subscription"
                  name="subscription"
                  defaultChecked={userDetails.subscription}
                  onChange={handleChange}
                  className="mx-2"
                />
              </div>

              <button
                type="submit"
                className="bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-700 focus:outline-none"
              >
                Update
              </button>
            </form>
          </div>
        </>
      );
    }
  } else {
    window.location.replace("http://localhost:5173/");
  }
};

export { Profile };
