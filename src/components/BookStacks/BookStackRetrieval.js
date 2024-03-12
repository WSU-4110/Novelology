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
                        console.log("data: ",res.data.items);
                        setBooksData(res.data.items);
                        // console.log(booksData);
                        console.log("isbn ran");
                    } else {
                        console.log('No results found.');
                    }
                } catch (err) {
                    console.error(err);
               
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
    console.log("books Data: ",booksData)
    class UserWishListRetrieval{
        constructor(){
            this.books = [];
            this.user = userData.username;
            this.genres = [];
        }
        
        getBooks(){
            this.books = booksData;
            // console.log("books data inside class :",this.books)
            return this.books;
        }
        getGenres(){
            this.genres = userData.genres;
            return this.genres;
        }
    
    };
    //Facade for getting userWishList
    class UserWishList{
        constructor(){
            this.WishListBooks = new UserWishListRetrieval();
        }
        printWishList(){
            console.log(this.WishListBooks.getBooks());
        }
    };
    //example implementation
    const userObject = new UserWishList();
    userObject.printWishList();
    return (
        <>
            <p>WishList: {books.join(', ')}</p>
            <p><strong>Genres:</strong> {userData.genres ? userData.genres.join(', ') : 'No genres selected'}</p>
        </>
    );
};

//Facade


export default BookStackRetrieval;
