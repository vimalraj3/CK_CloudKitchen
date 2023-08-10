import React, { useEffect, useState } from 'react'
import { Rating, Skeleton } from '@mui/material'
import { useAppSelector } from '../../../hooks'
import { IFood } from '../../../types/Food.types'
import { useParams } from 'react-router-dom'
import { set } from 'react-hook-form'

const FoodHeaderLoading = () => (
  <div className="flex flex-col md:flex-row md:justify-between w-[100%] px-3 md:px-5 border-b border-dashed border-primary pb-6 md:py-6 md:items-center md:gap-9">
    <div className="flex flex-col md:flex-row md:gap-6  md:items-center w-[100%] md:w-[50%]">
      <div className="hidden md:block md:w-[300px] aspect-video">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={'100%'}
          animation="wave"
        />
      </div>
      <div className="flex gap-2 flex-col w-[100%]">
        <Skeleton
          variant="text"
          sx={{ fontSize: { sm: '1.85rem', md: '2rem' }, width: '100%' }}
          animation="wave"
        />
        <div className="flex items-center justify-between gap-2 mt-1 w-[100%]">
          <div className="w-[50%] md:w-[100%]">
            <Skeleton
              variant="text"
              sx={{ fontSize: { sm: '3rem', md: '1rem' }, width: '100%' }}
              animation="wave"
            />
          </div>
          <div className="flex gap-2 items-center md:hidden w-[30%]">
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ fontSize: '3rem', width: '100%' }}
            />
          </div>
        </div>
        <div className="flex md:hidden items-center gap-2 w-[100%]">
          <Skeleton
            variant="text"
            animation="wave"
            sx={{ fontSize: '1.65rem', width: '100%' }}
          />
        </div>
      </div>
    </div>
    <section className="flex gap-4 flex-col w-[100%] md:w-[10%]">
      <div className="hidden md:flex gap-2">
        <Skeleton
          variant="text"
          animation="wave"
          sx={{ fontSize: '1.75rem', width: '100%' }}
        />
      </div>
      <div className="hidden md:flex items-center justify-end">
        <Skeleton
          variant="text"
          animation="wave"
          sx={{ fontSize: '1.75rem', width: '100%' }}
        />
      </div>
    </section>
  </div>
)

// * TITLE of Restaurant Card
export const FoodHeader: React.FC = () => {
  const { loading, food } = useAppSelector((state) => state.foodState)

  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  }

  const currentTime = new Date()
  // * Convert the current time to the food's time zone (e.g., 'Asia/Kolkata')
  const currentDateTime = new Date(
    currentTime.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
  )

  //   let isOpen

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (food) {
      //   isOpen =
      // currentDateTime >= food.time.open && currentDateTime <= food.time.close
      setIsOpen(
        currentDateTime >= food.time.open && currentDateTime <= food.time.close
      )
    }
  }, [])
  return (
    <>
      {loading ? (
        <FoodHeaderLoading />
      ) : (
        food && (
          <div className="flex flex-col md:flex-row md:justify-between w-[100%] px-3 md:px-5 border-b border-dashed border-primary pb-6 md:py-6">
            <div className="flex flex-col md:flex-row md:gap-6  md:items-center">
              <div className="hidden md:block md:w-[100px]">
                <img
                  src={food.image[0]}
                  alt="image"
                  width={'100%'}
                  className="rounded-md"
                />
              </div>
              <div className="flex gap-2 flex-col">
                <h3 className="font-head font-semibold text-2xl md:text-2xl">
                  {food.title}
                </h3>
                <div className="flex items-center justify-between gap-2 mt-1">
                  {/* <p className={`text-gray-500 text-sm md:text-md`}>{`${food.restaurantCity}`}</p> */}
                  <div className="hidden md:flex items-center justify-end">
                    <p className="text-sm">{`₹ ${food.price} for two`}</p>
                  </div>
                  <div className="flex gap-2 items-center md:hidden">
                    <Rating value={food.rating} size="small" readOnly />
                    <p className="text-sm">{`(${food.totalRating})`}</p>
                  </div>
                </div>
                <div className="flex md:hidden items-center gap-2">
                  <p className="text-sm">{`₹ ${food.price} for two`}</p>
                </div>
              </div>
            </div>
            <section className="flex gap-4 flex-col">
              <div className="hidden md:flex gap-2 justify-end">
                <Rating value={food.rating} readOnly />
                <p>{`(${food.totalRating})`}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <i className="fa-regular fa-clock"></i>
                  <p className="font-para text-base">
                    {new Date(food.time.open).toLocaleTimeString(
                      'en-IN',
                      options
                    )}
                  </p>
                  <p>-</p>
                  <p className="font-para text-base">
                    {new Date(food.time.close).toLocaleTimeString(
                      'en-IN',
                      options
                    )}
                  </p>
                  <p className="text-primary font-semibold">{`(${
                    isOpen ? 'Open' : 'Closed'
                  })`}</p>
                </div>
              </div>
            </section>
          </div>
        )
      )}
    </>
  )
}
{
  /* <div className="flex flex-col md:flex-row md:justify-between w-[100%] px-3 md:px-5 border-b border-dashed border-primary pb-6 md:py-6">
<div className="flex flex-col md:flex-row md:gap-6  md:items-center">
  <div className="hidden md:block md:w-[100px]">
    <img
      src={food.image[0]}
      alt="image"
      width={'100%'}
      className="rounded-md"
    />
  </div>
  <div className="flex gap-2 flex-col">
    <h3 className="font-head font-semibold text-2xl md:text-2xl">
      {food.title}
    </h3>
    <div className="flex items-center justify-between gap-2 mt-1">
      <p
        className={`text-gray-500 text-sm md:text-md`}
      >{`${food.price}`}</p>
      <div className="flex gap-2 items-center md:hidden">
        <Rating value={food.rating} size="small" readOnly />
        <p className="text-sm">{`(${food.totalRating})`}</p>
      </div>
    </div>
    <div className="flex md:hidden items-center gap-2">
      <p className="text-sm">{`₹ ${food.price} for two`}</p>
    </div>
  </div>
</div>
<section className="flex gap-4 flex-col">
  <div className="hidden md:flex gap-2">
    <Rating value={food.rating} readOnly />
    <p>{`(${food.totalRating})`}</p>
  </div>
  <div className="hidden md:flex items-center justify-end">
    <p className="text-sm">{`₹ ${food.price} for two`}</p>
  </div>
</section>
</div> */
}
