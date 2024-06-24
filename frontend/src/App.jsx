import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Movies/Home';
import Login from './pages/Auth/Login';
import PrivateRoute from './pages/Auth/ProtectedRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthRoutes from './pages/Auth/AuthRouter';
import Register from './pages/Auth/Register';
import Profile from './pages/Movies/Profile';
import MoviesPage from './pages/Movies/MoviesPage';
import MovieDetailsPage from './pages/Movies/MovieDetailsPage';
import TvDetailsPage from './pages/TV/TvDetailsPage';
import TvPage from './pages/TV/TvPage';
import ErrorBoundary from './pages/ErrorBoundry';
import BookmarksPage from './pages/Bookmarks/BookmarksPage';

const App = () => {
  return (
    <Router>
      <main className="flex h-screen">
        <ErrorBoundary>
        <ToastContainer />

        <Routes >
        

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/movies' element = {<MoviesPage />} />
            <Route path='/series' element = {<TvPage />} />
            <Route path='/bookmarks' element = {<BookmarksPage />} />
            <Route path='/movie/:id' element = {<MovieDetailsPage />} />
            <Route path='/tv/:id' element = {<TvDetailsPage />} />

          </Route>
          <Route path="auth" element={<AuthRoutes />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

          </Route>
        </Routes>
        </ErrorBoundary>
      </main>
    </Router>
  );
}

export default App;
