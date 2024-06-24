import {  useParams } from 'react-router';
import { useGetDetailsQuery } from '../../redux/api/moviesApi';
import Loader from 'react-js-loader';
import CustomStarRating from '../../components/RatingStar/CustomStarRating'
import MovieDetailsRow from '../../components/MovieDetailsRow';
import CastList from '../../components/CastList';
import { Link } from 'react-router-dom'
import { FaImdb } from "react-icons/fa";
import { FaLink } from "react-icons/fa";

const MovieDetailsPage = () => {
    const { id: movieId } = useParams();
   
    const { isLoading, data } = useGetDetailsQuery({movieId});
    const image = !isLoading && `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
    const rating = !isLoading && Math.round(((data.vote_average) / 2) * 10) / 10;


    return (
        <section className='w-full lg:w-[80rem] mx-auto'>
            {isLoading ? (
                <Loader type="spinner-default" bgColor="#ffffff" color="#000000" size={100} />
            ) : (
                <div className='flex space-x-20 items-start font-semibold'>
                    <div className='w-full sm:w-1/2 md:w-1/3 '>
                        <img src={image} alt={data.original_title} className='w-full rounded-xl shadow-2xl h-[40rem] object-fit' />
                    </div>
                    <div className='w-full sm:w-1/2 md:w-2/3 font-semibold'>
                        <h1 className='text-[50px] m-0 p-0 leading-none text-white'>{data.original_title} : {data.tagline}</h1>
                        <div className='my-7 flex space-x-5'>
                            <h1 className='text-[50px] m-0 p-0 leading-none text-white'>{rating}</h1>
                            <CustomStarRating rating={rating} />
                        </div>
                        <MovieDetailsRow length={data.runtime} language={data.original_language} year={data.release_date} status={data.status} />
                        <div className='my-7 font-semibold'>
                            <h1 className='text-xl mb-3 '>Genres</h1>
                            <div
                                className='flex space-x-2'>
                                {data.genres.map((genre) => (
                                    <div key={genre.id} className='bg-white text-black rounded-lg px-2'> {genre.name}</div>
                                ))}
                            </div>
                        </div>

                        <div className='font-semibold mb-7'>
                            <h1 className='text-xl mb-3'>Synopsis</h1>
                            <p className='text-[#ffffffcf] text-justify'>{data.overview}</p>
                        </div>

                        <CastList casts={data.credits.cast} />
                        <div className='my-10 flex space-x-5'>
                            <Link
                                className='inline-flex items-center px-8 py-3 rounded-md bg-[#5c6c92]'
                                to={`https://www.imdb.com/title/${data.imdb_id}/`}
                                target="_blank"
                                 rel="noopener noreferrer"
                            >
                                IMDB
                                <FaImdb size={16} className='ml-10' />
                            </Link>

                            {data.homepage && (
                                <Link
                                    className='inline-flex items-center px-8 py-3 rounded-md bg-[#5c6c92]'
                                    to={data.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Website
                                    <FaLink size={16} className='ml-10' />
                                </Link>
                            )}

                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default MovieDetailsPage;
