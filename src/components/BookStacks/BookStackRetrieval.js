import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import Card from '../Card.js'
import SearchISBN from '../shared/SearchISBN.js'



const BookStackRetrieval = () => {
    const [user, loading] = useAuthState(auth);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [booksData, setBooksData] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            console.log('fetchUserData called');

            try {
                if (user) {
                    setIsLoading(true);
                    const userRef = doc(db, 'users', user.uid);
                    const docSnapshot = await getDoc(userRef);

                    if (docSnapshot.exists()) {
                        const userData = docSnapshot.data();
                        setUserData(userData);
                        setBooks(userData.wishList);
                    } else {
                        console.log('User document does not exist');
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    useEffect(() => {
        const fetchDataForBooks = async () => {
            for (const book of books) {
                try {
                    const res = await axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + book);
                    const num = res.data.totalItems;
                    console.log(num);
                    if (num > 0) {
                        setBooksData((prevData) => [...prevData, ...res.data.items]);
                        console.log("isbn ran");
                    } else {
                        console.log('No results found.');
                    }
                } catch (err) {
                    console.error(err);
                
                // if (err.response && err.response.status === 429) {
                //     console.log('Rate limit exceeded. Retrying after a delay...');
                //     await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
                //     continue; // Retry the current book
                // }
            }
    
            }
        };

        if (books.length > 0) {
            fetchDataForBooks();
        }
    }, [books]);

    if (loading || isLoading) {
        return <div>Loading...</div>;
    }
    if (userData == null) {
        return (
            <div>
                <p>user Data is null</p>
            </div>
        )
    }
    if (!user) {
        return (
            <div>
                <p>You need to sign in to view your profile. Redirecting...</p>
                {setTimeout(() => {
                    window.location.href = '/';
                }, 2000)}
            </div>
        );
    }
    class UserWishListRetrieval{
        constructor(){
            this.books = [];
            this.user = userData.username;
            this.genres = [];
        }
        
        getBooks(){
            this.books = books;
            return books;
        }
        getGenres(){
            this.genres = userData.genres;
            return this.genres;
        }
    
    };

    class UserWishList{
        constructor(){
            this.WishListBooks = new UserWishListRetrieval();
        }
        printWishList(){
            console.log(this.WishListBooks.getBooks());
        }
    };

    const userObject = new UserWishList();
    // const wishListContent = userData.wishList ? userData.wishList.join(', ') : 'No WishList';
    // console.log("length ", wishListContent.length);
    // for (let i = 0; i < wishListContent.length; i++) {
    //     console.log(wishListContent[i]);
    // }
    return (
        <>
            <p>WishList: {books.join(', ')}</p>
            <p><strong>Genres:</strong> {userData.genres ? userData.genres.join(', ') : 'No genres selected'}</p>
        </>
    );
};

export default BookStackRetrieval;
