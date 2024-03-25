// Import necessary components and libraries
import './styles/App.css';
import React, { Fragment, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/shared/navbar';
import Home from './pages/Home';
import Error from './components/shared/Error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import PrivateRoute from './components/routing/PrivateRoute';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ReaderProfilePage from './components/ReaderProfilePage';
import AuthorProfilePage from './components/AuthorProfilePage';
import BookRating from './components/BookRating.js';
// import AddBook from './functions/AddBook.js';


import SampleHome from './pages/sampleHome.js'
import SignIn from './pages/Signin.js';
import Notifications from './pages/Notifications.js';
import UserOnboarding from "./pages/UserOnboarding.js";
import BookInfo from "./pages/BookInfo.js"
// Lazy-loaded components
const SetUpAccount = React.lazy(() => import('./pages/SetUpAccount'));
const Submit = React.lazy(() => import('./pages/Submit/Submit'));
const Settings = React.lazy(() => import('./pages/Settings'));
const UserPage = React.lazy(() => import('./pages/UserPage'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Login = React.lazy(() => import('./pages/Login'));
const Post = React.lazy(() => import('./pages/Post'));
const AuthorVerification = React.lazy(() => import('./pages/AuthorVerification'));
const SearchResults = React.lazy(() => import('./pages/SearchResults'));

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Fragment>
      <div className="flex justify-center align-middle">
          <img src={require('./assets/novelology_newlogo.png')} alt="Novelology Logo" style={{ height: '12em', width: '12em' }} />
        </div>
            {/* <LoggedOutNavBar /> */}
          <Navbar />
        <Suspense fallback={<FontAwesomeIcon icon={faSpinner} spin />}>
          {/* <NavigationBar /> */}
          <Routes className="flex">
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRoute />}>
              <Route path="/onboarding" element={<SetUpAccount />} /> {/* Route for Onboarding component */}
            </Route>
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users/:username" element={<UserPage />} />
            <Route path="/create-post" element={<Submit />} />
            <Route path="/login/:redirect" element={<Login />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/post/:pid" element={<Post />} />
            <Route path="/post" element={<Post />} />
            <Route path="/author-verification" element={<AuthorVerification showNavBar={false}/>} />
            <Route path="/search/*" element={<SearchResults />}>
              <Route path=":query" element={<SearchResults />} />
            </Route>
            <Route path="*" element={<Error />} />
            <Route path="/notifications" element={<Notifications />} />

            <Route path="/AuthorProfilePage" element={<AuthorProfilePage />} />
            <Route path="/ReaderProfilePage" element={<ReaderProfilePage />} />
            <Route path="/samplehome" element={<SampleHome showNavBar={true}/>}/>
          <Route path="/sign_in" element={<SignIn showNavBar={false}/>}/>
          <Route path="/setup-account" element={<UserOnboarding showNavBar={false}/>}/>
          <Route path="/bookinfo/:isbn" element={<BookInfo showNavBar={true}/>}/>
          <Route path="/rating" element={<BookRating showNavBar={true}/>}/>
          {/* <Route path="/addbook" element={<AddBook/>}/> */}
          
          </Routes>
        </Suspense>
      </Fragment>
    </Router>
  );
}

export default App;
