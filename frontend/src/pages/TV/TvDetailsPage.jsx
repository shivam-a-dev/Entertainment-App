import { useParams } from 'react-router';
import Loader from 'react-js-loader';
import CustomStarRating from '../../components/RatingStar/CustomStarRating'
import CastList from '../../components/CastList';
import { Link } from 'react-router-dom'
import { FaLink } from "react-icons/fa";
import {useGetTvDetailsQuery} from '../../redux/api/tvApi'
import TvDetailsRow from '../../components/TvDetailsRow';
import {toast} from 'react-toastify'

const TvDetailsPage = () => {
    const { id: tvId } = useParams();
   
    const { isLoading, data, isError } = useGetTvDetailsQuery({tvId});
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
                        <h1 className='text-[50px] m-0 p-0 leading-none text-white'>{data.original_name} : {data.tagline}</h1>
                        <div className='my-7 flex space-x-5'>
                            <h1 className='text-[50px] m-0 p-0 leading-none text-white'>{rating}</h1>
                            <CustomStarRating rating={rating} />
                        </div>
                        <TvDetailsRow first_air_date={data.first_air_date} language={data.original_language} last_air_date={data.last_air_date} status={data.status} />
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
                      
                            {data.homepage && (
                                <Link
                                    className='inline-flex items-center my-10 px-8 py-3 rounded-md bg-[#5c6c92]'
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
               
            )}

            <div>
                {isError && toast.error('Something went wrong!')}
            </div>
        </section>
    );
}

export default TvDetailsPage;
