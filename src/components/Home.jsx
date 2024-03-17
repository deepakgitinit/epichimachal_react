import { Destinations } from "./Destinations/Destinations";
import { Packages } from "./Packages/Packages";
import { HomeForm } from "./HomeComponents/HomeForm";
import { WhyChooseUs } from "./HomeComponents/WhyChooseUs";
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

        <Packages />

        <Testimonials/>
      </div>
    </>
  );
};

export { Home };
