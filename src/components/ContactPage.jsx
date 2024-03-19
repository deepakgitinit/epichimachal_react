import { useState } from "react";
import { Alert } from "../utils/Alert";
import { Spinner } from "../utils/Spinner";
import axios from "axios";

const ContactPage = () => {
const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
});

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

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setContactForm((prevState) => ({
        ...prevState,
        [name]: value,
      }))
  }

  const handleContact = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
        const url = "http://localhost:5000/api/v1/contact/"
        const response = await axios.post(url, contactForm)
        console.log(response);
        
        if (response.data.status == "Successful") {
            displayMessage("success", response.data.msg)
        }else{
            displayMessage("danger", response.data.msg)
        }
        
    } catch (error) {
        console.log("Contact: ", error);
    } finally {
        setLoading(false)
    }

  };
  
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        {showAlert && <Alert alert={alert} />}
        <div className="min-h-screen bg-gray-100 flex justify-center items-center text-sm">
          <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
            <div className="flex flex-col justify-center items-center">

            <img className="w-36 my-4 invert" src="src/assets/Logo.png" alt="" />
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            </div>

            <form className="space-y-4" onSubmit={handleContact} method="post">
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-slate-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={contactForm.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-slate-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={contactForm.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-slate-500"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-slate-800 text-white font-semibold px-4 py-2 rounded-md hover:bg-slate-700 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>

            <div className="flex flex-col justify-center items-center mt-8 mb-6 ">
              <p>Or</p>
              <br className="w-1/3"/>
            </div>

            <div className="flex flex-col justify-center items-center">
                    <p className="text-lg">Contact Details</p>
                    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 place-items-center text-sm *:m-2 justify-center items-center mt-4">
                        <div className="flex items-center *:mx-1">
                            <img className="size-4 object-cover rounded-full" src="https://images.rawpixel.com/image_social_square/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzMi1uaW5nLTEwNS1rbGMzZzdoYS5qcGc.jpg" />
                            <a href="tel:9051290512"> 9051290512</a>
                        </div>
                        <div className="flex items-center *:mx-1">
                            <img className="size-4 object-cover rounded-full" src="https://images.rawpixel.com/image_social_square/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzMi1uaW5nLTEwNS1rbGMzZzdoYS5qcGc.jpg" />
                            <a href="tel:9051290512"> 9051290512</a>
                        </div>
                        <div className="flex items-center *:mx-1">
                            <img className="size-4 object-cover rounded-full" src="https://static-00.iconduck.com/assets.00/whatsapp-icon-1024x1024-cilsjgvb.png" />
                            <a href="https://wa.me/9051290512"> 9051290512</a>
                        </div>
                        <div className="flex items-center *:mx-1">
                            <img className="size-4 object-cover rounded-full" src="https://static.vecteezy.com/system/resources/thumbnails/005/269/576/small/mail-icon-free-vector.jpg" />
                            <a href="mailto:contact@epichimachal.com"> contact@epichimachal.com</a>
                        </div>
                    </div>
                </div>

          </div>
        </div>
      </>
    );
  }
};

export { ContactPage };
