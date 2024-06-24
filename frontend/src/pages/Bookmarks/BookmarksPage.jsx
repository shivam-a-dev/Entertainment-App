import Loader from 'react-js-loader'
import { useGetAllBookmarksQuery } from "../../redux/api/bookmarksApi"
import MovieCard from '../../components/MovieCard'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router'
import { useSelector } from 'react-redux'

const BookmarksPage = () => {


  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, refetch, isFetching, error } = useGetAllBookmarksQuery(undefined, { refetchOnMountOrArgChange: true })
  const { query, currentData, isLoading: isSearching, isFetching: isQueryFetching, clearQuery, refetch : refetchQuery } = useOutletContext();

  

  useEffect(() => {

    clearQuery()
  }, [])

  useEffect(() => {
   
    refetch()


  }, [refetch, userInfo, isLoading, isSearching])





  if (!isLoading && error) {
    return (<>
      <h1 className='text-center my-10 w-full text-2xl'>No Bookmarks Found....!</h1>
    </>)
  }

  if (query&& !isSearching && !currentData) {
    return (<>
      <h1 className='text-center my-10 w-full text-2xl'>No Bookmarks Found....!</h1>
    </>)
  }


  let movieBookmarks = [];
  let tvBookmarks = [];
  if (!isLoading && data) {
    for (let movie of data) {
      if (movie.mediaType === 'movie') {
        movieBookmarks.push(movie)

      }
      else {
        tvBookmarks.push(movie)
      }
    }
  }

  

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
          <h1 className="ml-9 text-2xl">{currentData.length} Results....</h1>
          <div className="flex flex-wrap justify-start">
            {currentData?.map(show => (
              <div key={show._id} className="w-full sm:w-1/2 md:w-1/3 p-2">
                <MovieCard type={show.mediaType} movie={show} />
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
        {isLoading || isFetching ? <Loader type="spinner-default" bgColor="#ffffff" color="#000000" size={100} /> :

          (
            <>
              <div className="w-full mb-8">
                <h1 className="ml-9 text-2xl">Movie Bookmarks</h1>
                <div className="flex flex-wrap justify-start">
                  {movieBookmarks.map((movie) => (
                    <div key={movie._id} className="w-full sm:w-1/2 md:w-1/3 p-2">
                      <MovieCard movie={movie} type={'movie'} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full mb-8">
                <h1 className="ml-9 text-2xl">Tv Bookmarks</h1>
                <div className="flex flex-wrap justify-start">
                  {tvBookmarks.map((tv) => (
                    <div key={tv._id} className="w-full sm:w-1/2 md:w-1/3 p-2">
                      <MovieCard movie={tv} type={'tv'} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
      </>
    )
  }



  return (
    <div className="flex flex-col items-center w-full">

      <section className="flex flex-col ml-4 items-center w-full lg:w-[80rem] mt-10">

        {content}

      </section>



    </div>
  )
}

export default BookmarksPage