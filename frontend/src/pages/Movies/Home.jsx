import { Suspense, lazy, useEffect } from 'react';
import Loader from "react-js-loader";
import { useGetLatestShowsQuery, useGetTrendingQuery } from '../../redux/api/moviesApi';
import { useOutletContext } from 'react-router';

const MovieCard = lazy(() => import("../../components/MovieCard"));
const SliderCarousel = lazy(() => import("../../components/SliderCarousel"));

const Home = () => {
  const { query, data: queryData, isLoading: isSearching, isFetching, clearQuery } = useOutletContext();
  const filteredQueryData = queryData?.filter((value) => value.media_type !== 'person');
  const { data: trending, isLoading } = useGetTrendingQuery();
  const { data: latest, isLoading: latestLoading } = useGetLatestShowsQuery();


  useEffect(() => {
    clearQuery();
  }, []);

  let content;

  if (query) {
    if (isSearching || isFetching) {
      return (
        <Loader type="spinner-default" bgColor="#ffffff" color="#000000" size={100} />
      );
    } else {
      content = (
        <div className='w-full  md:w-[48rem] lg:w-[80rem] mx-auto '>
          <h1 className="text-2xl">{filteredQueryData.length} Results....</h1>
          <div className="flex flex-wrap ">
            {filteredQueryData.map(show => (
              <div key={show.id} className='w-full md:w-1/2 lg:w-1/3 p-2'>
                <Suspense fallback={<Loader type="spinner-default" bgColor="#ffffff" color="#000000" size={100} />}>
                  <MovieCard movie={show} />
                </Suspense>
              </div>
            ))}
          </div>
          </div>
        
      );
    }
  } else {
    content = (
      <>
        <h1 className="text-2xl ml-5">Trending Movies</h1>
        {isLoading ? (
          <Loader type="spinner-default" bgColor="#ffffff" color="#000000" size={100} />
        ) : (
          

            <Suspense fallback={<Loader type="spinner-default" bgColor="#ffffff" color="#000000" size={100} />}>
              <SliderCarousel data={trending} />
            </Suspense>
          
        )}


        <h1 className="text-2xl ml-5">Recommended for You</h1>
        {latestLoading ? (
          <Loader type="spinner-default" bgColor="#ffffff" color="#000000" size={100} />
        ) : (
          <div className="flex flex-wrap">
            {latest.map(movie => (
              <div key={movie.id} className="w-full md:w-1/2 lg:w-1/3 p-2">
                <Suspense fallback={<Loader type="spinner-default" bgColor="#ffffff" color="#000000" size={100} />}>
                  <MovieCard movie={movie} />
                </Suspense>
              </div>
            ))}
          </div>
        )}

      </>
    );
  }

  return (

    <section className='w-[80%] mx-auto mt-4 md:ml-[15%] lg:ml-[10%]'>
      {content}
    </section>

  );
};

export default Home;
