import { IoIosSearch } from "react-icons/io";
import { useLocation } from "react-router";

const SearchBox = ({handleSearch, value}) => {
    
    const location = useLocation();
    const pathname = location.pathname
    
    let placeholder;

    if (pathname === '/') {
        placeholder = "Search Movies or Tv shows...";
        
    }
    else if (pathname === '/movies') {
        placeholder = "Search Movies..."
    }
    else if  (pathname === '/series') {
        placeholder = "Search Tv shows..."
    }

    else if (/^\/(movie|tv)\/\d+$/.test(pathname)) {
         placeholder = "detail"
    }
       
    else if (pathname === '/profile') {
        placeholder = "profile"
    }

    else  {
        placeholder = "Search your bookmarks"
    }

   
    return (
        <div className= {`flex justify-center w-full ml-4 mt-4   ${placeholder === "detail" || placeholder === "profile" ? 'hidden' : ''} ` }>
            <div className="w-full max-w-[80rem]">
                <form className="w-full" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <IoIosSearch size={20} />
                        </div>
                        <input 
                            onChange={(e) => handleSearch(e)} 
                            type="search" 
                            id="default-search"
                            value={value} 
                            className="bg-transparent pl-10 px-3 py-2 w-full focus:outline-none focus:border-b-2 focus:border-sky-500" 
                            placeholder={placeholder}
                            required 
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SearchBox;
