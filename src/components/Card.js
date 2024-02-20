import React, {useState} from "react";
import '../styles/bookSearch.css';
import BookDetailsModal from "./BookDetailsModal.js"


const Card = ({ book }) => {
  const [show,setShow] = useState(false);
  const[bookItem, setBookItem] = useState();
  console.log(book);
  const noShow = () => {
    setShow(false);
  }
  return (
    <>
      {book.map((item) => {
        let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
        const authors = item.volumeInfo.authors;
        //console.log("Authors: "+authors.length);
        if (thumbnail != undefined && authors!= undefined){
            return (
                <>
              <div >
                
              <div className="card" onClick={() =>{setShow(true);setBookItem(item)}}>
                <img src={thumbnail} alt="" />
                <div className="card-body">
                  <h5 className="book-title">{item.volumeInfo.title}</h5>
                  <p className="author">{
                      

                      (authors.length > 0) ? (
                        <>
                          {authors.slice(0,-1).map(authors=> <span>{authors}, </span>)}
                          {authors.slice(-1)}
                        </>
                      ):(
                        <>
                          <p>Author not available</p>
                        </>
                      )
                      }</p>
                </div>
              </div>
              <BookDetailsModal show={show} item={bookItem} onClose={noShow}/>

              </div>
              </>
            );
        } else if (authors== undefined){
          return (
            <>
          <div className="card" onClick={() =>{setShow(true);setBookItem(item)}}>
            <img src={thumbnail} alt="" />
            <div className="card-body">
              <h5 className="book-title">{item.volumeInfo.title}</h5>
              <p className="author">Author Not available</p>
            </div>
          </div>
          <BookDetailsModal show={show} item={bookItem} onClose={noShow}/>
          
          </>
        );
        }
        
      })}
    </>
  );
};
export default Card;
