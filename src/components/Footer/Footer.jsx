import { useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-slate-900 text-slate-100 mt-16">
        <div className="flex flex-col justify-center items-center">
          <a href={"/"}>
            <img className="w-36 my-4" src="/Logo.png" alt="Epichimachal" />
          </a>
          <p className="text-lg">Contact Details</p>
          <div className="flex text-sm *:m-2 justify-center items-center flex-col lg:flex-row mt-4">
            <div className="flex items-center *:mx-1">
              <img
                className="size-4 object-cover rounded-full"
                src="https://images.rawpixel.com/image_social_square/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzMi1uaW5nLTEwNS1rbGMzZzdoYS5qcGc.jpg"
              />
              <a href="tel:7580088818">7580088818</a>
            </div>
            <div className="flex items-center *:mx-1">
              <img
                className="size-4 object-cover rounded-full"
                src="https://images.rawpixel.com/image_social_square/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzMi1uaW5nLTEwNS1rbGMzZzdoYS5qcGc.jpg"
              />
              <a href="tel:9317632618">9317632618</a>
            </div>
            <div className="flex items-center *:mx-1">
              <img
                className="size-4 object-cover rounded-full"
                src="https://static-00.iconduck.com/assets.00/whatsapp-icon-1024x1024-cilsjgvb.png"
              />
              <a href="https://wa.me/9888488818"> 9888488818</a>
            </div>
            <div className="flex items-center *:mx-1">
              <img
                className="size-4 object-cover rounded-full"
                src="https://static.vecteezy.com/system/resources/thumbnails/005/269/576/small/mail-icon-free-vector.jpg"
              />
              <a href="mailto:contact@epichimachal.com">
                {" "}
                contact@epichimachal.com
              </a>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 my-4 *:m-4 text-sm">
          <div className="flex flex-col *:m-2">
            <Link to={"/"}>Home</Link>
            <Link to={"/destinations"}>Destinations</Link>
            <Link to={"/packages"}>Packages</Link>
            <Link to={"/about"}>About us</Link>
          </div>
          <div className="flex flex-col *:m-2">
            <Link to={"/blog"}>Blog</Link>
            <Link to={"/contact"}>Contact us</Link>
            <Link to={"/privacy"}>Privacy Policy</Link>
          </div>
          <div className="flex flex-col *:m-2">
            <a href={"/"}>Facebook</a>
            <a href={"/"}>Twitter</a>
            <a href={"/"}>Instagram</a>
          </div>
        </div>
      </div>
      <div className="flex bg-black text-white justify-around text-xs py-2 px-2">
        <p>Epichimachal @2024</p>
        <div className="*:mx-2">
          <Link to={"/"}>Home</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/privacy"}>Privacy Policy</Link>
        </div>
      </div>
    </>
  );
};

export { Footer };
