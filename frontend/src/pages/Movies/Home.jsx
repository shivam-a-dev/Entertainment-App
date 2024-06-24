import  { Suspense, lazy, useEffect } from 'react';
import Loader from "react-js-loader";
import { useGetLatestShowsQuery, useGetTrendingQuery } from '../../redux/api/moviesApi';
import { useOutletContext } from 'react-router';

const MovieCard = lazy(() => import("../../components/MovieCard"));
const SliderCarousel = lazy(() => import("../../components/SliderCarousel"));

const Home = () => {
  const { query, data: queryData, isLoading: isSearching, isFetching, clearQuery } = useOutletContext();
  const filteredQueryData = queryData?.filter((value) => value.media_type !== 'person')
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
        <div className="w-full">
          <h1 className="ml-9 text-2xl">{filteredQueryData.length} Results....</h1>
          <div className="flex flex-wrap justify-center">
            {filteredQueryData.map(show => (
              <div key={show.id} className="w-full sm:w-1/2 md:w-1/3 p-2">
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
        {isLoading ? (
          <Loader type="spinner-default" bgColor="#ffffff" color="#000000" size={100} />
        ) : (
          <div className="w-full mx-auto mb-8">
            <h1 className="ml-5 text-2xl">Trending Movies</h1>
            <Suspense fallback={<Loader type="spinner-default" bgColor="#ffffff" color="#000000" size={100} />}>
              <SliderCarousel data={trending} />
            </Suspense>
          </div>
        )}

        {latestLoading ? (
          <Loader type="spinner-default" bgColor="#ffffff" color="#000000" size={100} />
        ) : (
          <div className="w-full mb-8">
            <h1 className="ml-9 text-2xl">Recommended for You</h1>
            <div className="flex flex-wrap justify-center">
              {latest.map(movie => (
                <div key={movie.id} className="w-full sm:w-1/2 md:w-1/3 p-2">
                  <Suspense fallback={<Loader type="spinner-default" bgColor="#ffffff" color="#000000" size={100} />}>
                    <MovieCard movie={movie} />
                  </Suspense>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <section className="flex flex-col ml-4 items-center w-full lg:w-[80rem] mt-10">
        {content}
      </section>
    </div>
  );
};

export default Home;
