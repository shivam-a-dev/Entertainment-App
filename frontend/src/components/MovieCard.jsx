import { Link } from "react-router-dom";
import { MdLocalMovies } from "react-icons/md";
import { TbDeviceTvOld } from "react-icons/tb";
import { useGetDetailsQuery } from '../redux/api/moviesApi';
import { useGetTvDetailsQuery } from "../redux/api/tvApi";
import { CiBookmark } from "react-icons/ci";
import { useCreateBookmarkMutation } from "../redux/api/bookmarksApi";
import { IoMdBookmark } from "react-icons/io";
import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import Loader from 'react-js-loader';
import { useDispatch } from "react-redux";
import { toggleRefetch } from "../redux/features/bookmark/bookmarkSlice";

const MovieCard = ({ movie, type = null, source = null }) => {
  const [bookmarked, setBookmarked] = useState(false);
  let { media_type, id } = movie;
  id = id || movie.mediaID;
  const md_type = media_type || type;

  const { data: moviData, isLoading: moviDataLoading } = useGetDetailsQuery({ movieId: id }, {
    skip: md_type !== 'movie',
    selectFromResult: ({ data, isLoading }) => ({
      data,
      isLoading,
    }),
  });

  const { data: tvData, isLoading: tvDataLoading } = useGetTvDetailsQuery({ tvId: id }, {
    skip: md_type !== 'tv',
    selectFromResult: ({ data, isLoading }) => ({
      data,
      isLoading,
    }),
  });


  const [createBookmark, { isLoading: createBookmarkLoading }] = useCreateBookmarkMutation();

  const image = useMemo(() => {
    if (md_type === 'movie' && moviData) {
      return `https://image.tmdb.org/t/p/w500/${moviData.poster_path || moviData.backdrop_path}`;
    } else if (md_type === 'tv' && tvData) {
      return `https://image.tmdb.org/t/p/w500/${tvData.poster_path || tvData.backdrop_path}`;
    }
    return '';
  }, [md_type, moviData, tvData]);




  const mpaRating = md_type === 'movie' ? moviData?.mpaRating || 'NR' : tvData?.mpaRating || 'NR';
  const release_year = movie.release_year || movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4);
  const title = movie.title || movie.name;

  const dispatch = useDispatch();

  const handleBookmark = async () => {

    try {
      toast.success('Bookmark added successfully!');
      setBookmarked(true);
       await createBookmark({ mediaType: md_type, mediaID: id, title, release_year }).unwrap();

      dispatch(toggleRefetch());


    } catch (error) {
      console.log(error);
    }
  };

  if (moviDataLoading || tvDataLoading) {
    return (<Loader type="bubble-scale" size={10} />);
  }

  return (
    <div key={movie.id} className="relative group m-[1rem] ">
      <Link to={`/${md_type}/${id}`}>
        <img
          src={image}
          alt={title}
          className="rounded-xl shadow-2xl m-0 p-0 transition duration-300 ease-in-out transform group-hover:opacity-50"
          style={{ width: "100%", height: "auto", maxHeight: "18rem", minHeight: "18rem", objectFit: "fill" }} />
      </Link>
      <button
        className="absolute top-4 right-4 z-10 bg-gray-800 p-1 rounded-full hover:bg-red-500"
        disabled={bookmarked || createBookmarkLoading || moviData?.isBookmarked}
        onClick={handleBookmark}
      >
        {(bookmarked || moviData?.isBookmarked || tvData?.isBookmarked || source === 'bookmark') ? <IoMdBookmark /> : <CiBookmark />}
      </button>

      <div className="absolute top-[70%] left-[2rem] transition duration-300 ease-in-out group-hover:opacity-100 right-0 bottom-0 opacity-0 overflow-hidden">
        <span className="text-base text-white opacity-[0.6] ">
          {release_year} &#xb7; {md_type === 'movie' ? <MdLocalMovies className="inline" /> : <TbDeviceTvOld className="inline" />} &#xb7; {mpaRating}
        </span>
        <h1 className="text-xl ">{title}</h1>
      </div>
    </div>
  );
}

export default MovieCard;
