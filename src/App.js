import './styles/App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/Home';
import PrivateRoute from './components/routing/PrivateRoute'; 
import Modal from './components/Modal'; 
import Onboarding from './components/Onboarding'; 
import SetUpAccount from './pages/SetUpAccount';
import Profile from './pages/Profile';
import UserPage from './pages/UserPage';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
          {/* Use PrivateRoute to wrap the route that requires authentication */}
          <Route element={<PrivateRoute />} >
            <Route path="/setup-account" element={<SetUpAccount/>} /> {/* Route for Onboarding component */}
          </Route>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/users/:username" element={<UserPage />} />
        </Routes>
        
      </Fragment>
    </Router>
  );
}

export default App;
