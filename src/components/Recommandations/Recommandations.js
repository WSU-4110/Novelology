import axios from "axios";

export default class BookRecommender {
    constructor(genre) {
        this.genre = genre
    }

    normalizeScore(score) {
        let minScore = Math.min(...Object.values(this.genre));
        let maxScore = Math.max(...Object.values(this.genre));
        return Math.round((score - minScore) / (maxScore - minScore) * 3);
    }

    getRandomStartIndex() {
        return Math.floor(Math.random() * 50);  
    }

    async getRecommendations() {
        let allBooks = []; 
        
        for (let [key, value] of Object.entries(this.genre)) {
            let numBooks = this.normalizeScore(value);
            let startIndex = this.getRandomStartIndex();
            try {
                let response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${key}&maxResults=${numBooks}&startIndex=${startIndex}`);
                let books = response.data.items.map(book => ({
                    title: book.volumeInfo.title,
                    cover: book.volumeInfo.imageLinks?.thumbnail,
                    authors: book.volumeInfo.authors
                }));
                allBooks = allBooks.concat(books); 
            } catch (error) {
                console.error(`Error fetching books in genre ${key}:`, error);
            }
        }

        return allBooks; 
    }
}



