import './styles/App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/Home';
import PrivateRoute from './components/routing/PrivateRoute'; 
import SetUpAccount from './pages/SetUpAccount';
import Submit from './pages/Submit';
import Settings from './pages/Settings';
import UserPage from './pages/UserPage';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Post from './pages/Post';
import AuthorVerification from './pages/AuthorVerification';
import Error from './components/Error';
const App = () => {
  return (
    <Router>
      <Fragment>

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <img src={require('./assets/Novelology_Logo.png')} alt="Novelology Logo" style={{ height: '12em', width: '12em'}} />
        </div>



        
        <Navbar />
        <Routes className="flex">
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoute />} >
            <Route path="/setup-account" element={<SetUpAccount/>} /> {/* Route for Onboarding component */}
          </Route>
          <Route path="/settings" element={<Settings/>} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/users/:username" element={<UserPage />} />
          <Route path="/create-post" element={<Submit/>}/>
          <Route path="/login/:redirect" element={<Login/>}/>
          <Route path="/login/" element={<Login/>}/>
          <Route path="/post/:pid" element={<Post/>}/>
          <Route path="/post" element={<Post/>}/>
          <Route path="/author-verification" element={<AuthorVerification/>}/>
          <Route path="*" element={<Error />} />
        </Routes>
        
        
      </Fragment>
    </Router>
  );
}

export default App;
