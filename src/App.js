import { Routes, Route } from 'react-router-dom';
import NavBar from './pages/nav/Navbar';
import Home from './pages/Home';

function App() {

  return (
    <>
      <NavBar />
      <Routes >
        <Route exact path='/' element={<Home />} />
      </Routes>
      
    </>
  );
}

export default App;
