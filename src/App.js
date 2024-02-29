import './styles/App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/Home';
import PrivateRoute from './components/routing/PrivateRoute'; 
import Modal from './components/Modal'; 
import Onboarding from './components/Onboarding'; 
import SetUpAccount from './pages/SetUpAccount';
import Submit from './pages/Submit';
import Settings from './pages/Settings';
import UserPage from './pages/UserPage';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Post from './pages/Post';
import AuthorVerification from './pages/AuthorVerification';
import SampleHome2 from './pages/sampleHome2.js';
const App = () => {
  return (
    <Router>
      <Fragment>

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <img src={require('./assets/Novelology_Logo.png')} style={{ height: '12em', width: '350px' }} />
        </div>




        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
          {/* Use PrivateRoute to wrap the route that requires authentication */}
          <Route element={<PrivateRoute />} >
            <Route path="/setup-account" element={<SetUpAccount/>} /> {/* Route for Onboarding component */}
          </Route>
          <Route path="/settings" element={<Settings/>} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/users/:username" element={<UserPage />} />
          <Route path="/setup-account" element={<SetUpAccount />}/>
          <Route path="/submit" element={<Submit/>}/>
          <Route path="/login/:redirect" element={<Login/>}/>
          <Route path="/login/" element={<Login/>}/>
          <Route path="/post/:pid" element={<Post/>}/>
          <Route path="/post" element={<Post/>}/>
          <Route path="/author-verification" element={<AuthorVerification/>}/>
          <Route path="/samplehome" element={<SampleHome2/>}/>

        </Routes>
        
      </Fragment>
    </Router>
  );
}

export default App;
