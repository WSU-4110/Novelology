import React, {useState, useEffect} from 'react';
import {FaStar} from 'react-icons/fa';

export default function BookRating({RatingChange}){
    const [rating,setRating] = useState(null);
    const [hover,setHover] = useState(null);
    const [totalStars,setTotalStars] = useState(5);
    
    const handleRatingChange=(currentRating) =>{
        setRating(currentRating);
        RatingChange(currentRating);

    }
    useEffect(()=>{
        // console.log("rating from bookrating: " + rating);

    },[rating]
    )

    return(
        <>
            <div className='flex flex-row '>
            {[...Array(5)].map((star,index) => {
                const currentRating = index+1;
                return (
                    <label>
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
                        color={currentRating <= (hover ||rating) ? "#ffc107":"#e4e5e9"}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
            </div>
            

        </>
    )

}