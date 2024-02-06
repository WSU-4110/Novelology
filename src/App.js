import  {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Navbar from './components/navbar';
import Profile from './pages/Profile';
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
