import react from "react";
import { FaRegTimesCircle } from "react-icons/fa";

const AddToBookList = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <>
      <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-maroon z-10">
        <div className="overlay-inner rounded-lg bg-lightcolor w-700 h-550 p-6 relative box-border overflow-hidden ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
          <button className="close" onClick={onClose}>
            <FaRegTimesCircle />
          </button>
          <h2 className="text-xl pb-5 text-maroon">Add this book to your book lists</h2>
          <h4 className="text-base pb-2">Select a book list</h4>

          <div className="flex flex-col">
            <div>
              <input
                type="text"
                placeholder="New Book List name"
                className="text-sm p-2"
              />
            </div>
            <div className="flex justify-center mt-3">
              <button
                type="submit"
                className="bg-maroon text-white p-2 rounded-full text-sm "
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddToBookList;
