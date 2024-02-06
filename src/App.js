import  {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Navbar from './components/navbar';
import Profile from './pages/Profile';
import UserPage from './pages/UserPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/users/:username" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
