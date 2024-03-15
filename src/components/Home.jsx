import { Destinations } from "./Destinations/Destinations";
import { Packages } from "./Packages/Packages";
import { HomeForm } from "./HomeComponents/HomeForm";
import { WhyChooseUs } from "./HomeComponents/WhyChooseUs";
import { Link } from "react-router-dom";
import { Testimonials } from "./HomeComponents/Testimonials";
import Cars from "./HomeComponents/Cars";

const Home = () => {
  return (
    <>
      <div className="flex flex-col my-8 rounded-md">
        <HomeForm />

        <WhyChooseUs />

        <Destinations />

        <Cars/>

        <div className="flex flex-col justify-center items-center">
          <Packages />
          <button className="bg-slate-800 hover:bg-slate-700 text-sm rounded-md text-slate-100 w-fit px-4 py-2 my-16">
            <Link to={"/packages"}>Load More...</Link>
          </button>
        </div>

        <Testimonials/>

      </div>
    </>
  );
};

export { Home };
