import { Link } from "react-router-dom"

const Footer = () =>{
    return (
        <>
            <div className="flex flex-col justify-center items-center bg-slate-900 text-slate-100 mt-36">
                <img className="w-36 my-4" src="src/assets/Logo.png" alt="" />
                <div className="grid lg:grid-cols-3 grid-cols-1 my-4">
                    <div>
                        <p>Link</p>
                        <p>Link</p>
                        <p>Link</p>
                        <p>Link</p>
                        <p>Link</p>
                    </div>
                    <p>Contact Button</p>
                    <p>Subscription Form</p>
                </div>
            </div>
            <div className="flex bg-black text-white justify-around text-xs py-2">
                <p>Epic Himachal @2020</p>
                <div className="*:mx-2">
                    <Link to={"/"}>Home</Link>
                    <Link to={"/about"}>About</Link>
                    <Link to={"/contact"}>Contact</Link>
                    <Link to={"/privacy"}>Privacy Policy</Link>
                </div>
            </div>
        </>
    )
}

export { Footer }