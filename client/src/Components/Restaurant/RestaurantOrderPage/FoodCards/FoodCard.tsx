import React, { Suspense, memo, useCallback } from 'react'
import { IFood } from '../../../../types/Food.types'
import { Button, Grid, IconButton, Skeleton } from '@mui/material'
import { useAppSelector } from '../../../../hooks'
import { useParams } from 'react-router-dom'
import { useRestaurantOrderPage } from '../../../../hooks/useRestaurantOrderPage'
import { FoodLoading } from '../../../../state/slices/food.slice'

interface IFoodCardCon {
    handleAddToCart: (id: string) => void
}

interface IFoodCard extends IFood {
    handleAddToCart: (id: string) => void
}
const FoodCard: React.FC<IFoodCard> = memo(
    ({ time, title, restaurant, rating, price, image, _id, handleAddToCart }) => {

        return (
            <Grid item xs={12} sm={6} md={4}>
                <div className="px-4 py-3 aspect-[4/3] w-[100%] rounded-lg md:hover:shadow-xl ease-in-out transition-shadow bg-white" >
                    <section className="w-[100%]">
                        <img src={image[0]} width={'100%'} height={'100%'} alt={title} className='rounded-lg' loading='lazy' />
                    </section>
                    <section className='mt-2.5'>
                        <div className="flex justify-between items-center">
                            <h4 className='font-head text-lg'>{title}</h4>
                            <div className="flex bg-green-500  w-[50px] justify-around rounded-sm items-center">
                                <p className="font-para font-[700] text-[14px] text-[#fff] text-center">{`${rating}`}</p>
                                <i className="fa-solid fa-star text-white"></i>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className='font-montserrat text-[12px] font-[500] text-[#9c9c9c]'>{`Price : ₹ ${price}`}</p>
                        </div>
                    </section>
                    <section className='mt-4'>
                        <Button variant='outlined' onClick={() => { handleAddToCart(_id) }} sx={{
                            color: '#ff7e8b',
                            borderColor: '#ff7e8b',
                            ":hover": {
                                borderColor: '#ff7e8b',
                            }
                        }} fullWidth >
                            <div className='flex gap-2 items-center'>
                                <p className=' md:block capitalize'>add to cart</p>
                                <i className="fa-solid fa-cart-shopping"></i>
                            </div>
                        </Button>
                    </section>
                </div>
            </Grid>
        )
    }
)


const FoodCardLoading = () => (
    <Grid item xs={12} sm={6} md={4}>
        <div className="px-4 py-3 aspect-[4/3]  rounded-lg md:hover:shadow-xl ease-in-out transition-shadow w-[100%]" >
            <section className="w-[100%] rounded-lg overflow-hidden">
                <Skeleton variant="rectangular" width={316} height={210} animation='wave' />
            </section>
            <section className='mt-3 w-[100%]'>
                <div className="flex justify-between items-center w-[100%]">
                    <Skeleton variant="text" width={'30%'} sx={{ fontSize: '1.25rem' }} animation='wave' />
                    <div className="flex w-[50px] justify-around rounded-sm items-center">
                        <Skeleton variant="text" width={'100%'} sx={{ fontSize: '1.5rem' }} animation='wave' />
                    </div>
                </div>
                <div className="flex justify-between items-center w-[100%]">
                    <Skeleton variant="text" width={'40%'} sx={{ fontSize: '12px' }} animation='wave' />
                </div>
            </section>
            <section className='flex justify-end items-center  mt-4'>
                <div className="w-[6rem] h-[2.1rem]">
                    <Skeleton variant="rectangular" width={'100%'} height={'100%'} animation='wave' />
                </div>
            </section>
        </div>
    </Grid>
)

const FoodCardCon: React.FC = memo(
    () => {
        const { foods, loading } = useAppSelector(state => state.foodState)
        const { id } = useParams<{ id: string }>()
        const { handleAddToCart } = useRestaurantOrderPage()


        const handleCardClick = useCallback((foodId: string) => {
            if (id) {
                handleAddToCart({
                    foodId: foodId,
                    restaurantId: id,
                    quantity: 1
                })
            }
        }, [])

        return (
            <div>
                <div className="w-[100%]">
                    <Grid container spacing={4}>
                        {
                            loading.state && loading.currentLoading === FoodLoading.food && !(foods.length) ? new Array(3).fill('12').map((v, i) => (<FoodCardLoading key={i} />)) : foods.map((v, i) => {
                                return (
                                    <FoodCard {...v} key={i} handleAddToCart={handleCardClick} />
                                )
                            })
                        }
                    </Grid>
                </div>
            </div>
        )
    }
)
export default FoodCardCon