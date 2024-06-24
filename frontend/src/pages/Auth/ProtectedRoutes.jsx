import { Navigate, Outlet, useLocation } from 'react-router'
import Header from '../../components/Header'
import { useSelector } from 'react-redux'
import dude from '../../assets/dude.webp'
import { useEffect, useState } from 'react'
import SearchBox from '../../components/SearchBox'
import {useSearchQuery} from '../../redux/api/searchApi'

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const [img, setImg] = useState(dude)


  const location = useLocation();
  const path = location.pathname.split('/')[1]
  const type = path === 'movies' ? 'movie' : path === 'series' ? 'tv' : path === 'bookmarks' ?  path : 'multi'

  const [query, setQuery] = useState("");
  const { data, isLoading, isFetching, currentData} = useSearchQuery({ query, type}, {
    skip: !query, // Skip the query if the query string is empty
  });
  console.log(useSearchQuery({query, type}))



  const handleSearch = (e) => {
    
    setQuery(e.target.value);
   
  };

  const clearQuery = () => {
    setQuery('')
  }

  useEffect(() => {
    if (userInfo && userInfo.profilePic) {
      setImg(`data:image/jpeg;base64,${userInfo.profilePic}`)
    }
  }, [userInfo]);



  return userInfo ? (
    <>
      <Header img={img} />
      <div className="flex flex-col flex-1 p-6">
        <SearchBox handleSearch={handleSearch} value={query} />
        <div className="flex-1 mt-4">
          <Outlet context={{ query, data, isLoading, isFetching, clearQuery, currentData }} />
        </div>
      </div>
    </>
  ) : <Navigate to={'/auth/login'} replace />
}

export default PrivateRoute
