import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PackagesPage = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPackages = async () => {
      const url = `${import.meta.env.VITE_PACKAGES}`;
      const packages = await axios.get(url);

      const reversePackages = packages.data.allPackages;
      setItems(reversePackages);
    };
    getPackages();
  }, []);

  const handleError = (e) =>{
    e.target.src = "\\public\\Loading_Image.png";
  };

  const openPackage = (packageID) => {
    navigate(`/packages/${packageID}`);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <div className="flex flex-col mx-2 text-center justify-center items-center mt-16">
        <h1 className="text-3xl my-2">
          <b>Packages</b>
        </h1>
        <hr className="mb-8 w-1/3" />
      </div>
      <div className="lg:mx-16 md:mx-8 text-sm flex items-center justify-center">
        <div className="grid lg:grid-cols-3 lg:gap-2 md:grid-cols-2 grid-cols-1 place-items-center">
          {items.map((item, index) => {
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
                  src={`${import.meta.env.VITE_LOCALHOST}/` + item.thumbnail}
                  alt="package_cover"
                  loading="lazy"
                  onError={handleError}
                />
                <div className="discription py-2 px-4">
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export { PackagesPage };
