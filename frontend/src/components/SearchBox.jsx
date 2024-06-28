import { IoIosSearch } from "react-icons/io";
import { useLocation } from "react-router";

const SearchBox = ({ handleSearch, value }) => {
  const location = useLocation();
  const pathname = location.pathname;

  let placeholder;

  if (pathname === '/') {
    placeholder = "Search Movies or Tv shows...";
  } else if (pathname === '/movies') {
    placeholder = "Search Movies...";
  } else if (pathname === '/series') {
    placeholder = "Search Tv shows...";
  } else if (/^\/(movie|tv)\/\d+$/.test(pathname)) {
    placeholder = "detail";
  } else if (pathname === '/profile') {
    placeholder = "profile";
  } else {
    placeholder = "Search your bookmarks";
  }

  return (
    <div className={`flex justify-center px-[10%] md:px-[10%]   ml-4 my-10 ${placeholder === "detail" || placeholder === "profile" ? 'hidden' : ''}`}>


      <div className="relative inset-y-0 left-0 flex items-center  pointer-events-none">
        <IoIosSearch size={20} />
      </div> 
      <input
        onChange={(e) => handleSearch(e)}
        type="search"
        id="default-search"
        value={value}
        className="block  bg-transparent  px-2 py-2 focus:outline-none focus:border-b-2 focus:border-sky-500 
                                       w-full"
        placeholder={placeholder}
        required
      />

    </div>



  );
};

export default SearchBox;
