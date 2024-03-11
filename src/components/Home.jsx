import { Destinations } from "./Destinations/Destinations";
import { Packages } from "./Packages/Packages";

const Home = () => {

  return (
    <>
      <div className="flex flex-col mx-4 lg:mx-8 my-8 rounded-md">

        <div className="flex flex-col relative justify-center items-center rounded-md">

          <div className="flex relative mx-2 mb-8 h-96 w-auto shadow-2xl rounded-md">

            <img className="-z-50 rounded-md object-cover" src="https://images.pexels.com/photos/7846563/pexels-photo-7846563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Himachal-pradesh-explore" />

            <div className="absolute flex flex-col rounded-l-md text-slate-100 bg-gradient-to-r from-slate-900 lg:w-1/2 md:w-2/3 w-4/5 h-full *:lg:ml-10 *:lg:mt-6 *:ml-6 *:mt-4">
              <h1 className="lg:text-8xl md:text-7xl text-5xl"><b>Incredible<br/>Himachal</b></h1>
              <p className="text-lg">Welcome to Travelmorehimachal. Explore Epic Himachal.</p>
            </div>

          </div>

          <form className="grid lg:grid-cols-6 grid-cols-2 relative bottom-24 justify-center items-center text-sm max-w-4/5 backdrop-blur-lg bg-opacity-40 bg-slate-800 rounded-md p-4 *:p-2 *:m-2 *:rounded-sm shadow-2xl" action="/submit" method="post">
            <label className="text-slate-100" htmlFor="pickup">Pickup*</label>
            <select id="pickup" required>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Delhi">Delhi</option>
            </select>

            <label className="text-slate-100" htmlFor="destination">Destination*</label>
            <select id="destination" required>
              <option value="Shimla">Shimla</option>
              <option value="Kullu">Kullu</option>
              <option value="Manali">Manali</option>
              <option value="Kangra">Kangra</option>
              <option value="Manikaran">Manikaran</option>
            </select>

            <label className="text-slate-100" htmlFor="passengers">Passengers</label>
            <select id="passengers">
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Four">Four</option>
              <option value="Seven">Seven</option>
              <option value="Morethanseven">More than Severn</option>
            </select>

            <label className="text-slate-100" htmlFor="fromdate">From*</label>
            <input id="fromdate" type="date" required/>

            <label className="text-slate-100" htmlFor="todate">To</label>
            <input id="todate" type="date" />

            <label className="text-slate-100" htmlFor="selectcar">Select Car*</label>
            <select id="selectcar" required>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Family">Family</option>
              <option value="Taxi">Taxi</option>
            </select>

            <button className="text-slate-100 bg-slate-900 rounded-md lg:col-start-6 lg:col-span-1 col-span-2">Book Now!</button>
          </form>
        
        </div>

        <Destinations/>
        <Packages />

        
      </div>
    </>
  );
};

export { Home };
