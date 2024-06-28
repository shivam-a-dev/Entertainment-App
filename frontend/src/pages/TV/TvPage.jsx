import { useEffect, useState } from 'react';
import MovieCard from '../../components/MovieCard';
import Loader from "react-js-loader";
import { useGetOnAirQuery } from '../../redux/api/tvApi';
import { useOutletContext } from 'react-router';

const TvPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch, isFetching } = useGetOnAirQuery(page);

  const { query, data: queryData, isLoading: isSearching, isFetching: isQueryFetching, clearQuery } = useOutletContext();

  useEffect(() => {
    clearQuery()
  }, [])

  const handleNext = async () => {

    setPage(prevPage => prevPage + 1);
    await refetch();
  };

  const handlePrevious = async () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
      await refetch();
    }
  };

  let content;

  if (query) {
    if (isSearching || isQueryFetching) {
      return (
        <Loader type="spinner-default" bgColor="#ffffff" color="#000000" size={100} />
      )
    }
    else {
      content = (
        <div className="w-full" >
          <h1 className="ml-9 text-2xl">{queryData.length} Results....</h1>
          <div className="flex flex-wrap justify-center">
            {queryData.map(show => (
              <div key={show.id} className="w-full sm:w-1/2 md:w-1/3 p-2">
                <MovieCard type={'tv'} movie={show} />
              </div>
            ))}
          </div>
        </div>
      )
    }
  }

  else {
    content = (
      <>
        <h1 className='text-2xl ml-5'>TV Series</h1>

        {isLoading || isFetching ? (
          <div className="flex justify-center my-4">
            <Loader type="spinner-default" bgColor="#ffffff" color="#000000" size={100} />
          </div>
        ) : (
          <>
            <div className='flex flex-wrap '>
              {data?.map((tv) => (
                <div key={tv.id} className="w-full sm:w-1/2 md:w-1/3 p-2">
                  <MovieCard movie={tv} type={'tv'} />
                </div>
              ))}
            </div>

            <div className='flex justify-center my-4'>
              {page > 1 && (
                <button disabled={isLoading || isFetching} className='hover:border-gray-400 mx-2 border border-white rounded-[0.5rem] text-white py-2 px-4' onClick={handlePrevious}>
                  Previous
                </button>
              )}
              <button disabled={isLoading || isFetching} className='hover:border-gray-400 mx-2 border border-white rounded-[0.5rem] text-white py-2 px-4' onClick={handleNext}>
                Next
              </button>
            </div>
          </>
        )}

      </>
    )
  }





  return (
    <section className='w-[80%] mx-auto'>

      {content}

    </section>
  );
};

export default TvPage;
