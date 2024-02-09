import  {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Navbar from './components/navbar';
import Profile from './pages/Profile';
import UserPage from './pages/UserPage';
import SetUpAccount from './pages/SetUpAccount';

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
          <Route path="/setup-account" element={<SetUpAccount />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

/*test*/

export default App;
