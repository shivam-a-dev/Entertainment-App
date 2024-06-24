import { Link, useNavigate } from "react-router-dom"
import { useLogOutMutation } from "../redux/api/usersApi"
import { toast } from "react-toastify";

const Model = ({ isOpen, isClose }) => {
    const [logOut, {isLoading}] = useLogOutMutation();
    const navigate = useNavigate();
    const logOutHandler = async () => {
        try {
            await logOut().unwrap();
            navigate('/auth/login');
            isClose();
            
            toast.success("User logged out successfully.");
        } catch (error) {
            toast.error(error.data?.message || "An error occurred during logout.");
        }
    };
    return (
        <div>
            {isOpen && <div className="h-[100px] w-[100px] bg-white text-center ml-[3px] rounded-md">
               
               <div className="flex flex-col space-y-2 ">

                 <button disabled={isLoading}  onClick={logOutHandler} className="text-black block mt-2"> logout</button>
                 <Link className="text-black" to={'/profile'}>Profile</Link>
                <button className="text-red-500 block" onClick={isClose}>x</button>
                </div>
            </div>}
        </div>
    )
}

export default Model