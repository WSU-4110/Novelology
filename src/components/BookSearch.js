import React from "react";

const BookSearch = () => {
    return (
        <>
            <div className="main">
                <h3>Find your book!</h3>
                <div className="search">
                    <input type="text" placeholder="Search for a book" />
                    <button>Search</button>
                </div>
            </div>
        </>
     )
};

export default BookSearch;