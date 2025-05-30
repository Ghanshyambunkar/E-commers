import React from 'react'
import profile from '../../Images/Profile.png';
import { Rating } from '@mui/material';

function ReviewCard({review}) {
  return (
    <div className='reviewCard'>
        <img src={profile} alt='User'/>
        <p>{review.name}</p>
        <Rating
              name="read-only"
              value={review.rating || 0}
              precision={0.5}
              size={window.innerWidth < 600 ? 'small' : 'medium'}
              readOnly
        />
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
