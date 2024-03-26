import { useState, useEffect } from "react";
import BookRecommender from "./Recommandations";

export default function RecommandBooks({ genres }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        let recommender = new BookRecommender(genres);
        const recommendedBooks = await recommender.getRecommendations();
        setBooks(recommendedBooks);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, []);
 
  return (
    <div>
      {books.map((book, index) => (
        <div key={index} className="book">
          <img src={book.cover} alt={book.title} />
          <h2>{book.title}</h2>
          <p>Author: {book.authors.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}
