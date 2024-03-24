import React, { useState } from 'react';
import BookDetailsModal from './BookDetailsModal';
import AddToBookList from './BookStacks/AddToBookList';


const Card = ({ book }) => {
  const [show, setShow] = useState(false);
  const [bookItem, setBookItem] = useState();
  const [bookListShow, setBookListShow] = useState(false);

  const noShow = () => setShow(false);
  const noBookListShow = () => setBookListShow(false);

  return (
    <>
      {book.map((item) => {
        if (!item.volumeInfo) {
          // If volumeInfo is not present, skip this item or handle it appropriately
          return null;
        }

        let thumbnail = item.volumeInfo.imageLinks?.smallThumbnail;
        let authors = item.volumeInfo.authors || ['Author not available'];

        return (
          <div key={item.id} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out" >
              {thumbnail ? (
                <img src={thumbnail} alt={`${item.volumeInfo.title} cover`} className="w-full h-56 object-cover object-center" onClick={() => { setShow(true); setBookItem(item) }}/>
              ) : (
                <div className="w-full h-56 bg-gray-200 flex items-center justify-center" onClick={() => { setShow(true); setBookItem(item) }}>
                  <span>No Image Available</span>
                </div>
              )}
              <div className="p-4">
                <h5 className="text-lg font-semibold truncate">{item.volumeInfo.title}</h5>
                <p className="text-gray-700 text-sm mt-1">
                  {authors.join(', ')}
                </p>
                <button onClick={()=>setBookListShow(true)} className="mt-3 text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded">
                  Add to Book List
                </button>
              </div>
            </div>
            {show && bookItem === item && <BookDetailsModal show={show} item={bookItem} onClose={noShow} />}

            {bookListShow && <AddToBookList show={bookListShow} onClose={noBookListShow} />}
            
          </div>
        );
      })}
    </>
  );
};

export default Card;
