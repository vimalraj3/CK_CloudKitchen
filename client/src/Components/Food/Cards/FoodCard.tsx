import { memo } from 'react'
import { IFood } from '../../../types/Food.types'
import { Button, Grid } from '@mui/material'

interface IFoodCard extends IFood {
  handleAddToCart: (id: string) => void
  handleClick: (id: string) => void
}
export const FoodCard: React.FC<IFoodCard> = memo(
  ({
    time,
    title,
    rating,
    price,
    image,
    _id,
    handleAddToCart,
    handleClick,
  }) => {
    return (
      <Grid item xs={12} sm={6} md={4}>
        <div className="px-4 py-3 aspect-[4/3] w-[100%] rounded-lg md:hover:shadow-xl ease-in-out transition-shadow bg-white">
          <section
            className="w-[100%] cursor-pointer"
            onClick={() => handleClick(_id)}
          >
            <img
              src={image[0]}
              width={'100%'}
              height={'100%'}
              alt={title}
              className="rounded-lg"
              loading="lazy"
            />
          </section>
          <section className="mt-2.5">
            <div className="flex justify-between items-center">
              <h4 className="font-head text-lg">{title}</h4>
              <div className="flex bg-green-500  w-[50px] justify-around rounded-sm items-center">
                <p className="font-para font-[700] text-[14px] text-[#fff] text-center">{`${rating}`}</p>
                <i className="fa-solid fa-star text-white"></i>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-montserrat text-[12px] font-[500] text-[#9c9c9c]">{`Price : ₹ ${price}`}</p>
            </div>
          </section>
          <section className="mt-4">
            <Button
              variant="outlined"
              onClick={() => {
                handleAddToCart(_id)
              }}
              sx={{
                color: '#ff7e8b',
                borderColor: '#ff7e8b',
                ':hover': {
                  borderColor: '#ff7e8b',
                },
              }}
              fullWidth
            >
              <div className="flex gap-2 items-center">
                <p className=" md:block capitalize">add to cart</p>
                <i className="fa-solid fa-cart-shopping"></i>
              </div>
            </Button>
          </section>
        </div>
      </Grid>
    )
  }
)
