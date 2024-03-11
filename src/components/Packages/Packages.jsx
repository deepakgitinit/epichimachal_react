import axios from "axios";
import { useState, useEffect } from "react";

const Packages = () =>{
    const [items, setItems] = useState([]);

    useEffect(()=>{
        const getPackages = async () =>{
            const packages = await axios.get("http://localhost:5000/api/v1/packages");
            setItems(packages.data.allPackages);
            console.log(items);
        }
        getPackages();

    }, [])

    return (
        <>
            <div className="flex flex-col mx-2 text-center justify-center items-center">
                <h1 className="text-3xl my-2"><b>Packages</b></h1>
                <hr className="mb-8 w-1/3"/>
            </div>
            <div className="lg:mx-16 md:mx-8 text-sm">
                <div className="grid lg:grid-cols-3 lg:gap-2 md:grid-cols-2 grid-cols-1 justify-center items-center">
                    {items.map((item, index)=>{
                        return <div className="relative mx-2 my-4 bg-slate-100 rounded-md" key={index}>
                            <p className="absolute text-xs bg-slate-900 text-slate-100 px-2 py-1 m-2 right-0 rounded-md">{item.category.length!=0?item.category:"Category"}</p>
                            <img className="rounded-t-md" src={"http://localhost:5000/" + item.thumbnail} alt="" />
                            <div className="discription py-2 px-4">
                                <h1 className="text-base"><b>{item.title}</b></h1>
                                <p className="text-lg">Rs.{item.price}</p>
                                <p>Destinations: {item.destinations.length}</p>
                                <p>Time: {item.time}</p>
                                <button className="text-sm py-2 px-3 my-3 rounded-md bg-slate-900 text-slate-100">Read More</button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export { Packages };