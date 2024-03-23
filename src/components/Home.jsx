import Cars from "./HomeComponents/Cars";
import { Destinations } from "./Destinations/Destinations";
import { Packages } from "./Packages/Packages";
import { WhyChooseUs } from "./HomeComponents/WhyChooseUs";
import { Testimonials } from "./HomeComponents/Testimonials";
import { HomeForm } from "./HomeComponents/HomeForm";

const Home = () => {
  return (
    <>
      <div className="flex flex-col my-8 rounded-md">
        <HomeForm />

        <WhyChooseUs />

        <Destinations />

        <Cars/>

        <Packages />

        <Testimonials/>
      </div>
    </>
  );
};

export { Home };
