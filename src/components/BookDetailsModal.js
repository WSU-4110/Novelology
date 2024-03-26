import react, {useState} from "react";
import "../styles/bookSearch.css";
import { FaRegTimesCircle } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { AddBookToFirestore } from "../functions/AddBook.js";



const Modal = ({ show, item, onClose }) => {
    

    const navigate = useNavigate();
  if (!show) return null;

  let thumbnail =
    item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
  function navigateToBookInfo() {
    
      console.log("Enter AddBookToFirestore component");
      //Add book to Firebase.
      AddBookToFirestore(item,navigate);
      console.log("Exit AddBookToFirestore component");
  }

  return (
    <>
      <div className="overlay relative z-10">
        <div className="overlay-inner">
          <button className="close" onClick={onClose}>
            <FaRegTimesCircle />
          </button>
          <div className="inner-box">
            <img src={thumbnail} alt="" />
            <div className="info">
              <h1 class="font-semibold">{item.volumeInfo.title}</h1>
              <h3 class="medium">{item.volumeInfo.authors}</h3>
              <h4 class="text-rose-400">
                {item.volumeInfo.publisher}{" "}
                <span>{item.volumeInfo.publishedDate}</span>
              </h4>
              <br />
              <button
                onClick={navigateToBookInfo}
                class="text-white bg-maroon hover:opacity-60 
                            focus:outline-none focus:ring-4 focus:ring-maroon font-medium rounded-full text-sm px-5 py-2.5 
                            text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                More
              </button>
             
            </div>
          </div>
          <p className="description">{item.volumeInfo.description}</p>
        </div>

      </div>
    </>
  );
};
export default Modal;
