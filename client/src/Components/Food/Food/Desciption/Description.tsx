import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../hooks'
import { Skeleton } from '@mui/material'

export const Description = () => {
  const food = useAppSelector((state) => state.foodState.food)
  const loading = useAppSelector((state) => state.foodState.loading)

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
    <div className="md:w-[100%] leading-7 font-para mx-auto mt-4">
      {food ? (
        <>
          <div className="px-3 md:px-5">
            <p>{food.description}</p>
          </div>
          <div className=" border-b border-dashed border-primary mt-4"></div>
        </>
      ) : (
        loading && (
          <div>
            <Skeleton
              variant="text"
              sx={{ fontSize: '1rem' }}
              width={'100%'}
              animation="wave"
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: '1rem' }}
              width={'100%'}
              animation="wave"
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: '1rem' }}
              width={'100%'}
              animation="wave"
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: '1rem' }}
              width={'100%'}
              animation="wave"
            />
            <div className=" border-b border-dashed border-primary mt-4"></div>
          </div>
        )
      )}
    </div>
  )
}
