import React from 'react'
import { useAppSelector } from '../../../hooks'
import { IReview } from '../../../types/reviews.types';
import { UserAvatar } from '../../utils/UserAvatar/UserAvatar';
import { Rating, Skeleton } from '@mui/material';


const ReviewsLoading = () => (
    <div className='flex gap-7 items-center w-[60%] mt-8'>
        <Skeleton variant="circular" width={55} height={44} animation='wave' />
        <div className='flex flex-col gap-3 w-[100%]'>
            <div className='flex justify-between w-[100%] gap-3'>
                <div className='flex flex-col gap-2 w-[70%]'>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation='wave' />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation='wave' />
                </div>
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'30%'} animation='wave' />
            </div>
            <div className='w-[100%] flex flex-col gap-1'>
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation='wave' />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation='wave' />
            </div>
        </div>
    </div>
)


const NoReviews = () => (
    <p>No Reviews</p>
)

//  TODO add illustrator and description page

export const Reviews = () => {

    const reviewData = useAppSelector(state => state.foodState.reviews)
    const loading = useAppSelector(state => state.foodState.loading)
    const reviews = reviewData?.reviews;
    console.log(reviews);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <div>

            {

                loading ? (
                    new Array(4).fill('11').map((v, i) => (
                        <ReviewsLoading key={i} />
                    ))
                ) : !reviews ? (<NoReviews />) : reviews.map((review, i) => (
                    <div className='flex gap-7 items-start md:items-center w-[100%] md:w-[60%] mb-8' key={i}>
                        <UserAvatar userName={review.user.userName || ""} src={review.user.avatar} isComment />
                        <div className='flex flex-col gap-1.5 md:gap-2.5 w-[100%]'>
                            <div className='flex flex-col md:flex-row gap-1 md:gap-0 md:justify-between md:items-center'>
                                <div className='flex items-center gap-2'>
                                    <p className='md:text-lg font-head font-[500] capitalize'>{review.user.userName}</p>
                                    <p>-</p>
                                    <div className='md:hidden flex items-center'>
                                        <Rating name={`${review.user.userName}_rating`} value={review.rating} readOnly size='small' />
                                    </div>
                                    <p className='hidden md:block text-sm'>{new Date(review.create).toLocaleDateString('en-US', options)}</p>
                                </div>
                                <div className='hidden md:block'>
                                    <Rating name={`${review.user.userName}_rating`} value={review.rating} readOnly size='medium' />

                                </div>
                                <p className='md:hidden text-sm text-gray-500'>{new Date(review.create).toLocaleDateString('en-US', options)}</p>
                            </div>
                            <div>
                                <p className='text-md'>{review.message}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}


