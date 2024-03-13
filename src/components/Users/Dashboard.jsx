import { useAuth } from "../../contexts/Auth";

const Dashboard = () =>{
    const { isAuthenticated } = useAuth();
    if (isAuthenticated()) {
        return(
            <>
                <div>
                    <h1>Dashboard</h1>
                </div>
            </>
        )
    }else{
        window.location.replace("http://localhost:5173/")
    }
}

export { Dashboard }