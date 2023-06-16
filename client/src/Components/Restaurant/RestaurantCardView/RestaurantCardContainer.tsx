import { Grid } from '@mui/material';
import productImg from '../../../assets/home/product.jpg'
import { IRestaurant } from '../../../types/Restaurant.types';
import { memo, useCallback, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

interface IRestaurantCard extends IRestaurant {
  handleCardClick: (restaurantId: string) => void
}

interface IRestaurantCardCon {
  restaurants: IRestaurant[]
}

const RestaurantCard: React.FC<IRestaurantCard> = ({ restaurantName, restaurantDescription, averageRating, priceRange, handleCardClick, _id }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <div className="px-4 py-3 aspect-[4/3] w-[100%] rounded-lg hover:shadow-xl ease-in-out transition-shadow cursor-pointer" onClick={() => handleCardClick(_id)}>
        <section className="w-[100%]">
          <img src={productImg} width={'100%'} height={'100%'} alt={restaurantName} className='rounded-lg' />
        </section>
        <section className='mt-1.5'>
          <div className="flex justify-between items-center">
            <h4 className='font-cardo text-[18px] font-[700]'>{restaurantName}</h4>
            <div className="flex bg-green-500  w-[50px] justify-around rounded-sm items-center">
              <p className="font-cardo font-[700] text-[14px] text-[#fff] text-center">{`${averageRating || 0}`}</p>
              <i className="fa-solid fa-star text-white"></i>
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
}

const RestaurantCardContainer: React.FC<IRestaurantCardCon> = memo(
  ({ restaurants }) => {

    const navigate = useNavigate()
    const handleCardClick = useCallback((restaurantId: string) => {
      navigate(`/restaurant/${restaurantId}`)
    }, [])

    return (
      <div className="w-[100%] max-w-[1200px] mx-auto mt-5">
        <Grid container spacing={2}>
          {
            restaurants?.map((restaurant, index) => {
              return <RestaurantCard {...restaurant} handleCardClick={handleCardClick} key={index} />
            })
          }
        </Grid>
      </div>
    )
  }
)

export default RestaurantCardContainer