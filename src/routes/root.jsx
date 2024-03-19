import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { ScrollToTopButton } from "../utils/ScrollToTop" 

export default function root () {
    return(
        <>
        <div className="flex flex-col justify-evenly min-h-screen relative">
          <Navbar/>
          <div className="mb-auto">
            <Outlet/>
          </div>
          <Footer/>
          <ScrollToTopButton />
        </div>
      </>
    )
}