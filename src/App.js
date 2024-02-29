// Import necessary components and libraries
import './styles/App.css';
import React, { Fragment, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Error from './components/Error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import PrivateRoute from './components/routing/PrivateRoute';

// Lazy-loaded components
const SetUpAccount = React.lazy(() => import('./pages/SetUpAccount'));
const Submit = React.lazy(() => import('./pages/Submit'));
const Settings = React.lazy(() => import('./pages/Settings'));
const UserPage = React.lazy(() => import('./pages/UserPage'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Login = React.lazy(() => import('./pages/Login'));
const Post = React.lazy(() => import('./pages/Post'));
const AuthorVerification = React.lazy(() => import('./pages/AuthorVerification'));

const App = () => {
  return (
    <Router>
      <Fragment>
      <div className="flex justify-center align-middle">
          <img src={require('./assets/Novelology_Logo.png')} alt="Novelology Logo" style={{ height: '12em', width: '12em' }} />
        </div>
        <Suspense fallback={<FontAwesomeIcon icon={faSpinner} spin />}>
          <Navbar />
          <Routes className="flex">
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRoute />}>
              <Route path="/setup-account" element={<SetUpAccount />} /> {/* Route for Onboarding component */}
            </Route>
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users/:username" element={<UserPage />} />
            <Route path="/create-post" element={<Submit />} />
            <Route path="/login/:redirect" element={<Login />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/post/:pid" element={<Post />} />
            <Route path="/post" element={<Post />} />
            <Route path="/author-verification" element={<AuthorVerification />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </Fragment>
    </Router>
  );
}

export default App;
