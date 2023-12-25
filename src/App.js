import { Routes, Route } from 'react-router-dom';
import NavBar from './pages/nav/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <NavBar />
      <Routes >
        <Route exact path='/' element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
