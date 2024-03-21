import react, {useState} from "react";
import "../styles/bookSearch.css";
import { FaRegTimesCircle } from "react-icons/fa";
import BookInfo from "../pages/BookInfo";
import { useNavigate, Link } from "react-router-dom";
import { AddBookToFirestore } from "../functions/AddBook.js";
import AddToBookList from "./BookStacks/AddToBookList.js";
import { serverTimestamp } from "firebase/firestore";



const Modal = ({ show, item, onClose }) => {
    const [bookListShow, setBookListShow] = useState(false);
    const noBookListShow = () => setBookListShow(false);

    const navigate = useNavigate();
  if (!show) return null;

  let thumbnail =
    item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
  function navigateToBookInfo() {
    if (
      item.volumeInfo &&
      item.volumeInfo.industryIdentifiers &&
      item.volumeInfo.industryIdentifiers.length > 0
    ) {
      console.log("before error");
      //Add book to Firebase.
      AddBookToFirestore(item);
      console.log("after error");

      //navigating to BookInfo Page with ISBN.
      navigate(
        "/bookinfo/" + item.volumeInfo.industryIdentifiers[0].identifier
      );
    } else {
      console.log(
        "Error: ISBN/ Industry identifiers array is undefined or empty."
      );
    }
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
                class="text-white bg-blue-700 hover:bg-blue-800 
                            focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 
                            text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                More
              </button>
              <button
                onClick={() => setBookListShow(true)} 
                class="text-white bg-blue-700 hover:bg-blue-800 
                            focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 
                            text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to Book List
              </button>
            </div>
          </div>
          <p className="description">{item.volumeInfo.description}</p>
        </div>
        {bookListShow && <AddToBookList show={bookListShow} onClose={noBookListShow} />}

      </div>
    </>
  );
};
export default Modal;
