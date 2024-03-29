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
import ReviewerProfilePage from './components/ReviewerProfilePage';
import ArtistProfilePage from './components/ArtistProfilePage';
import BookRating from './components/BookRating.js';

import SearchResultsBook from './components/SearchResultsBook.js';
import ReaderQandA from './components/ReaderQandA.js';

import BookList from './pages/BookLists.js';
import Registration from './components/user/Registration.js';
import DeleteAccountPage from './components/user/DeleteAccountPage.js';
import ChangePassword from './components/user/ChangePassword.js';
import ArtworkGallery from './components/ArtworkGallery';
import NavigationBar from './components/NavigationBar.js';


// import AddBook from './functions/AddBook.js';
import SampleHome from './pages/sampleHome.js'
import SignIn from './pages/Signin.js';
import Notifications from './pages/Notifications.js';
import UserOnboarding from "./pages/UserOnboarding.js";
import BookInfo from "./pages/BookInfo.js"
// import RenameBookListModal from './components/BookStacks/RenameBookListModal.js';
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
const OldUserPage = React.lazy(() => import('./pages/OldUserPage'));

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Fragment>
      {/* <div className="flex justify-center align-middle">
          <img src={require('./assets/novelology_newlogo.png')} alt="Novelology Logo" style={{ height: '12em', width: '12em' }} />
        </div>
            {/* <LoggedOutNavBar /> */}
          {/* <Navbar /> */}
        <Suspense fallback={<FontAwesomeIcon icon={faSpinner} spin />}> 
          <NavigationBar />
          <Routes className="flex">
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRoute />}>
              <Route path="/onboarding" element={<UserOnboarding />} /> {/* Route for Onboarding component */}
            </Route>
            <Route path="/settings" element={<Settings />} />
            <Route path="/old-profile" element={<OldUserPage />} />
            <Route path="/profile" element={<UserPage />} />
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
            <Route path="/delete-account" element={<DeleteAccountPage />} />
            <Route path="/change-password" element={<ChangePassword />} />

            <Route path="/" exact component={ArtworkGallery} />

            <Route path="/AuthorProfilePage" element={<AuthorProfilePage />} />
            <Route path="/ReaderProfilePage" element={<ReaderProfilePage />} />
            <Route path="/ArtistProfilePage" element={<ArtistProfilePage />} />
            <Route path="/ReviewerProfilePage" element={<ReviewerProfilePage />} />
            <Route path="/Register" element={<Registration />} />
            <Route path="/samplehome" element={<SampleHome showNavBar={true}/>}/>
          <Route path="/sign_in" element={<SignIn showNavBar={false}/>}/>
          <Route path="/setup-account" element={<UserOnboarding showNavBar={false}/>}/>
          <Route path="/bookinfo/:isbn" element={<BookInfo showNavBar={true}/>}/>
          <Route path="/rating" element={<BookRating showNavBar={true}/>}/>
          <Route path="/bookList" element={<BookList/>}/>
          {/* <Route path="/addbook" element={<AddBook/>}/> */}
          <Route path="/SearchResultsBook" element={<SearchResultsBook />} />
          <Route path="/ReaderQandA/:aid" element={<ReaderQandA />} />

          
          </Routes>
        </Suspense>
      </Fragment>
    </Router>
  );
}

export default App;