import Loader from 'react-js-loader'
import { useGetAllBookmarksQuery } from "../../redux/api/bookmarksApi"
import MovieCard from '../../components/MovieCard'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { resetRefetch} from '../../redux/features/bookmark/bookmarkSlice'

const BookmarksPage = () => {
  const [tvBookmarks, setTvBookmarks] = useState([])
  const [movieBookmarks, setMovieBookmarks] = useState([])
  const { data, isLoading, refetch, isFetching, error } = useGetAllBookmarksQuery();
  const { query, currentData, isLoading: isSearching, isFetching: isQueryFetching, clearQuery } = useOutletContext();
  const {shouldRefetch} = useSelector((state) => state.bookmark)
  const dispatch = useDispatch();
  

  useEffect(() => {

    clearQuery()
  }, [])



  useEffect(() => {
    if (!isLoading && data) {

      for (let movie of data) {
        if (movie.mediaType === 'movie') {
          setMovieBookmarks(prev => [...prev, movie])
        }
        else {
          setTvBookmarks(prev => [...prev, movie])
        }

      }
    }

    if (shouldRefetch) {
      setMovieBookmarks([]);
      setTvBookmarks([]);
      refetch().then(() => dispatch(resetRefetch()));
    }

  

  }, [data, isLoading, isFetching, refetch, dispatch, shouldRefetch])







  if (!isLoading && error) {
    return (<>
      <h1 className='text-center my-10 w-full text-2xl'>No Bookmarks Found....!</h1>
    </>)
  }


  let content;
  if (query) {
    if (isSearching || isQueryFetching) {
      return (
        <Loader type="spinner-default" bgColor="#ffffff" color="#000000" size={100} />
      )
    }
    else if (!isSearching && !currentData) {
      return (<>
        <h1 className='text-center my-10 w-full text-2xl'>No Bookmarks Found....!</h1>
      </>)
    }
    else {
      content = (
        <div className="w-full" >
          <h1 className="ml-9 text-2xl">{currentData.length} Results....</h1>
          <div className="flex flex-wrap justify-start">
            {currentData?.map(show => (
              <div key={show.id} className="w-full sm:w-1/2 md:w-1/3 p-2">
                <MovieCard type={show.mediaType} movie={show} source={'bookmark'} />
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
                    <div key={movie.mediaID} className="w-full sm:w-1/2 md:w-1/3 p-2">
                      <MovieCard movie={movie} type={'movie'} source={'bookmark'} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full mb-8">
                <h1 className="ml-9 text-2xl">Tv Bookmarks</h1>
                <div className="flex flex-wrap justify-start">
                  {tvBookmarks.map((tv) => (
                    <div key={tv.mediaID} className="w-full sm:w-1/2 md:w-1/3 p-2">
                      <MovieCard movie={tv} type={'tv'} source={'bookmark'} />
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


    <section className="w-[80%] mx-auto">

      {content}

    </section>




  )
}

export default BookmarksPage