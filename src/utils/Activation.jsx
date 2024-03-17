import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Activation = () =>{
    const activateAcc = async ()=>{
        const {id} = useParams();
        console.log(id);
    }
    useEffect(()=>{
        activateAcc()
    },[])

    return(
        <>
        <div className="flex justify-center items-center">
            <h1>Activation Status</h1>
        </div>
        </>
    )
}

export {Activation}