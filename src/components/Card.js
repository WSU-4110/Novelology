import React from "react";
import '../styles/bookSearch.css';

const Card = ({ book }) => {
  console.log(book);
  return (
    <>
      {book.map((item) => {
        let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
        if (thumbnail != undefined){
            return (
                <>
              <div className="card">
                <img src={thumbnail} alt="" />
                <div className="card-body">
                  <h5 className="book-title">{item.volumeInfo.title}</h5>
                  <p className="price">20</p>
                </div>
              </div>
              </>
            );
        }
        
      })}
    </>
  );
};
export default Card;
