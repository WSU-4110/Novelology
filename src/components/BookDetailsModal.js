import react from 'react';
import '../styles/bookSearch.css';
import { FaRegTimesCircle } from "react-icons/fa";
import BookInfo from '../pages/BookInfo';
import { Link } from 'react-router-dom';


const Modal = ({show,item, onClose}) => {
    
    if (!show) return null;

    let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
   
    return (
        
        <>
            <div className = "overlay relative z-10" >
                <div className ="overlay-inner">
                    <button className="close" onClick={onClose}><FaRegTimesCircle /></button>
                    <div className="inner-box">
                        <img src={thumbnail} alt="" />
                        <div className="info">
                            <h1 class="font-semibold">{item.volumeInfo.title}</h1>
                            <h3 class="medium">{item.volumeInfo.authors}</h3>
                            <h4 class="text-rose-400">{item.volumeInfo.publisher} <span>{item.volumeInfo.publishedDate}</span></h4>
                            <br />
                            <Link to={'/bookinfo/'+item.volumeInfo.industryIdentifiers[0].identifier} class="text-white bg-blue-700 hover:bg-blue-800 
                            focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 
                            text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >More</Link>
                        </div>
                    </div>
                    <p className="description">{item.volumeInfo.description}</p>
                </div>
            </div>
        </>
    );
}
export default Modal;