import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <main className="flex h-screen">
        <Header />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
