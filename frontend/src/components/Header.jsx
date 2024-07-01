import { MdMovieCreation } from "react-icons/md";
import { SiWindows } from "react-icons/si";
import { MdLocalMovies } from "react-icons/md";
import { PiTelevisionBold } from "react-icons/pi";
import { FaBookmark } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHamburger } from "react-icons/fa";
import Dropdown from "./Dropdown";
import { useLogOutMutation } from "../redux/api/usersApi";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";

const Header = ({ img }) => {
    const location = useLocation();
    const pathname = location.pathname;
    const paths = ['/', '/movies', '/series', '/bookmarks'];
    const navigate = useNavigate();

    const [logOut, {isLoading}] = useLogOutMutation();
    const logOutHandler = async () => {
        try {
            await logOut().unwrap();
            navigate('/auth/login');
            toast.success("User logged out successfully.");
        } catch (error) {
            toast.error(error.data?.message || "An error occurred during logout.");
        }

    }

        const profileLinks = [{ name: 'Profile', path: '/profile' }]
        const func = { name: 'Logout', function: logOutHandler, isLoading: isLoading }
        const links = [{ name: <SiWindows size={18} style={{marginLeft: '2px'}} />, path: '/',  }, { name: <MdLocalMovies size={25} />, path: '/movies' }, 
            { name: <PiTelevisionBold size={25} />, path: '/series' }, 
            { name: <FaBookmark size={25} />, path: '/bookmarks' }, {name:<CgProfile size={25} />, path: '/profile'},
        ]
        

    return (
            <>
                <div className="collapse md:visible">
                    <div className='flex flex-col h-[96vh]  bg-slate-900 shadow-lg w-20 items-center rounded-[1rem] fixed bottom-4 left-4'>
                        <Link to={'/'} className='mt-4 mb-2'><MdMovieCreation size={30} color="#f93c3c" /></Link>

                        {paths.map((path) => (
                            <Link key={path} to={path} className={`mt-8 ${pathname === path ? 'text-white' : 'text-slate-600 hover:text-white'}`}>
                                {path === '/' ? <SiWindows size={17} /> : path === '/movies' ? <MdLocalMovies size={25} /> : path === '/series' ? <PiTelevisionBold size={25} /> : <FaBookmark size={25} />}
                            </Link>
                        ))}

                        <div className="mt-auto mb-4">
                            <Dropdown icon={<img className="rounded-[4rem] border-2 border-white " src={img} style={{ width: 40, height: 40 }} />} links={profileLinks} position="bottom-14 right-[-20px]" size={'w-[100px]'} func={func} />
                        </div>
                    </div>
                </div>

                <div className="visible md:hidden ml-4 mt-6">
                    <Dropdown icon={<FaHamburger size={30} />} links={links} func={{name : <IoMdLogOut size={25} />, function: logOutHandler, isLoading: isLoading}}/>
                </div>
            </>
        );
    }

    export default Header;
