import React, {useState} from 'react';
import {FaStar} from 'react-icons/fa';
export default function BookRating(){
    const [rating,setRating] = useState(null);
    const [hover,setHover] = useState(null);
    const [totalStars,setTotalStars] = useState(5);

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
                            onClick={() => setRating(currentRating)}
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