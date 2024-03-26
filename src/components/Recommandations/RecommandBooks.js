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
    <div >
        <h1 class="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  ">
            Recommandations
        </h1>
      {books.map((book, index) => (
        <div key={index} class="mt-10 mb-10">
                        <div class='flex'>
                <div class='w-20 mr-2'>
                  <img  class='rounded-md' src={book.cover} alt={book.title} />
                </div>
                <div class='w-full'>
                    <h2>{book.title}</h2>
                    <p>Author: {book.authors.join(', ')}</p>
      
                </div>
            </div>
      
       </div>
      ))}
    </div>
  );
}
