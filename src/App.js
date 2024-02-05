import  {BrowserRouter, Routes, Route} from 'react-router-dom';
import navbar from './components/navbar';
import Home from './pages/Home'
import Login from './pages/Login';
import Navbar from './components/navbar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
