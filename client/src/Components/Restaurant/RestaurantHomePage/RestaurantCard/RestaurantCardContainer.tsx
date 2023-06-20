import { Grid, Skeleton, dividerClasses } from '@mui/material';
import { IRestaurant } from '../../../../types/Restaurant.types';
import { memo, useCallback, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks';


const RestaurantCard: React.FC = memo(
  () => {
    const { restaurants } = useAppSelector(state => state.restaurantsState)

    const navigate = useNavigate()
    const handleCardClick = useCallback((restaurantId: string) => {
      navigate(`/restaurant/${restaurantId}`)
    }, [])

    return (
      <Grid container spacing={2}>
        {
          restaurants?.map(({ restaurantName, restaurantDescription, priceRange, _id, rating, restaurantImage }, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={`${restaurantName}--${index}`}>
                <div className="px-4 py-3 aspect-[4/3] w-[100%] rounded-lg hover:shadow-xl ease-in-out transition-shadow cursor-pointer" onClick={() => handleCardClick(_id)}>
                  <section className="w-[100%]">
                    <img src={restaurantImage[0]} width={'100%'} height={'100%'} alt={restaurantName} className='rounded-lg' placeholder='Loading' />
                  </section>
                  <section className='mt-1.5'>
                    <div className="flex justify-between items-center">
                      <h4 className='font-cardo text-[18px] font-[700]'>{restaurantName}</h4>
                      <div className="flex bg-green-500  w-[40px] px-2 gap-2 justify-around rounded-sm items-center">
                        <p className="font-cardo font-[700] text-[14px] text-[#fff] text-center">{`${rating || 0}`}</p>
                        <i className="fa-solid fa-star text-white text-[12px]"></i>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className='font-montserrat text-[12px] font-[500] text-[#9c9c9c]'>{restaurantDescription.slice(0, 15) + "..."}</p>
                      <p className='font-montserrat text-[12px] font-[500] text-[#9c9c9c]'>{`₹ ${priceRange} for two`}</p>
                    </div>
                  </section>
                </div>
              </Grid>
            )
          })
        }

      </Grid>
    )
  }
)



const RestaurantCardSkeleton: React.FC = () => (
  <Grid container spacing={2}>
    {
      new Array(6).fill(0).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <div className="px-4 py-3 aspect-[4/3] w-[100%] rounded-lg hover:shadow-xl ease-in-out transition-shadow cursor-pointer">
            <section className="w-[100%]">
              <Skeleton animation='wave' variant='rectangular' width={'100%'} height={'200px'} className='rounded-lg' />
            </section>
            <section className='mt-1.5'>
              <div className="flex justify-between items-center">
                <Skeleton animation='wave' variant='text' width={'30%'} height={'2rem'} />
                <Skeleton animation='wave' variant='text' width={'15%'} height={'2rem'} />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton animation='wave' variant='text' width={'45%'} height={'1rem'} />
                <Skeleton animation='wave' variant='text' width={'15%'} height={'1rem'} />
              </div>
            </section>
          </div>
        </Grid>
      ))
    }
  </Grid>
)


const RestaurantNotFound: React.FC = () => (
  <div className='flex gap-5 justify-center items-center'>
    <div className='w-[50%]'>
      <img src="https://res.cloudinary.com/dd39ktpmz/image/upload/v1687263226/mevpgxln4cf3vjslxwrg.png" alt="Restaurant nor found image" width={'100%'} height={'100%'} />
    </div>
    <div>
      <h4 className='text-3xl text-primary font-bold font-head'>
        Restaurant Not Found
      </h4>
      <p className='text-lg mt-1'>{`Try another restaurant 😊`}</p>
    </div>
  </div>
)

const RestaurantCardContainer: React.FC = () => {
  const { restaurants, loading, error } = useAppSelector(state => state.restaurantsState)

  return (
    <div className="w-[100%] max-w-[1200px] mx-auto mt-5">
      {
        loading && error?.success ? <RestaurantCardSkeleton /> : restaurants.length === 0 ? (<RestaurantNotFound />) : <RestaurantCard />
      }
    </div>
  )
}




export default RestaurantCardContainer