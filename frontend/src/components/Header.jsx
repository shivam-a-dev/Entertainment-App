import { MdMovieCreation } from "react-icons/md";
import { SiWindows } from "react-icons/si";
import { MdLocalMovies } from "react-icons/md";
import { PiTelevisionBold } from "react-icons/pi";
import { FaBookmark } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom'
import Model from "./Model";
import { useState } from "react";

const Header = ({ img }) => {
    const location = useLocation();
    const pathname = location.pathname
    const paths = ['/', '/movies', '/series', '/bookmarks',]
    const [isOpen, setIsOpen] = useState(false)
    const isClose = () => {
        setIsOpen(false)
    }

    return (
        <div className='flex flex-col h-[96vh] bg-slate-900 shadow-lg w-20 ml-6 items-center mt-6 rounded-[1rem] top-0 bottom-4 fixed'>
            <Link to={'/'} className='mt-4 mb-2'><MdMovieCreation size={30} color="#f93c3c" /></Link>

            {paths.map((path) => (
                <Link key={path} to={path} className={`mt-8 ${pathname === path ? 'text-white' : 'text-slate-600 hover:text-white'}`}>
                    {path === '/' ? <SiWindows size={17} /> : path === '/movies' ? <MdLocalMovies size={25} /> : path === '/series' ? <PiTelevisionBold size={25} /> : <FaBookmark size={25} />}
                </Link>
            ))}



            <div className="mt-auto mb-4">
                <Model isOpen={isOpen} isClose={isClose} />
                <button onClick={() => setIsOpen(true)}>
                    {!isOpen && <img className="rounded-[4rem] border-2 border-white " src={img} style={{ width: 40, height: 40 }} />}
                </button>

            </div>


        </div>

    )
}

export default Header