import React from 'react';

function TopReviewsBox() {
  const reviews = [
    {
      bookTitle: "Normal People",
      author: "Marissa Smith",
      rating: 3,
      likes: 5063,
      comments: 1498,
      shares: 150,
      cover: "path-to-cover-image.jpg" 
    },
    {
      bookTitle: "Pet Semetary",
      author: "Stephen King",
      rating: 5,
      likes: 5063,
      comments: 1498,
      shares: 150,
      cover: "path-to-cover-image.jpg"
    },
    {
      bookTitle: "Harry Potter: Prisoner of Azkaban",
      author: "J.K. Rowling",
      rating: 4,
      likes: 5063,
      comments: 1498,
      shares: 150,
      cover: "path-to-cover-image.jpg"
    },
  ];

  const renderRating = (rating) => (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={`inline-block ${index < rating ? 'text-maroon' : 'text-gray-300'}`}>★</span>
      ))}
    </>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-maroon border-b-2 border-maroon pb-4 mb-4">Top Reviews</h3>
      {reviews.map((review, index) => (
        <div key={index} className={`flex justify-between items-center mb-4 ${index < reviews.length - 1 ? 'border-b border-gray-200 pb-4' : ''}`}>
          <div className="flex-1">
            <h4 className="font-bold">{review.bookTitle}</h4>
            <p className="text-sm text-gray-600">by {review.author}</p>
            <div className="flex text-lg">
              {renderRating(review.rating)}
            </div>
          </div>
          <div className="pl-4 flex-shrink-0">
            {/* Placeholder for the book cover */}
            <div className="w-14 h-20 bg-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-500">Cover</span>
            </div>
          </div>
        </div>
      ))}
      <button className="text-white bg-maroon hover:bg-maroon-dark focus:outline-none focus:ring-2 focus:ring-maroon-600 focus:ring-opacity-50 rounded-full py-2 px-4 w-full transition-colors duration-200">
        See All Reviews 
      </button>
    </div>
  );
}

export default TopReviewsBox;