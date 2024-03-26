import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

export default function BookRating({ RatingChange, initialRating }) {
    const [rating, setRating] = useState(initialRating);
    const [hover, setHover] = useState(null);
    
    const handleRatingChange = (currentRating) => {
        setRating(currentRating);
        RatingChange(currentRating);
    }

    useEffect(() => {
        // Log the rating whenever it changes
        console.log("Rating changed:", rating);
    }, [rating]);

    return (
        <div className='flex flex-row'>
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <label key={index}>
                        <input 
                            type="radio"
                            name="rating"
                            className='hidden'
                            value={currentRating}
                            onClick={() => handleRatingChange(currentRating)}
                        />
                        <FaStar 
                            className='cursor-pointer'
                            size={30}
                            color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
}
