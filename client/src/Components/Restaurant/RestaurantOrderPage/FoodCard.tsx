import React, { Suspense, useCallback } from 'react'
import { IFood } from '../../../types/Food.types'
import { Button, Grid, IconButton } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface IFoodCardCon {
    foods: IFood[]
}

interface IFoodCard extends IFood {
    handleCardClick: (id: string) => void
}
const FoodCard: React.FC<IFoodCard> = ({ time, title, restaurant, rating, price, image, _id, handleCardClick }) => {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <div className="px-4 py-3 aspect-[4/3] w-[100%] rounded-lg md:hover:shadow-xl ease-in-out transition-shadow" onClick={() => handleCardClick(_id)}>
                <section className="w-[100%]">
                    <Suspense fallback={<div className='w-[100%] h-[100%] bg-secondary'></div>}>
                        <img src={image[0]} width={'100%'} height={'100%'} alt={title} className='rounded-lg' loading='lazy' />
                    </Suspense>
                </section>
                <section className='mt-1.5'>
                    <div className="flex justify-between items-center">
                        <h4 className='font-head text-lg'>{title}</h4>
                        <div className="flex bg-green-500  w-[50px] justify-around rounded-sm items-center">
                            <p className="font-para font-[700] text-[14px] text-[#fff] text-center">{`${rating}`}</p>
                            <StarIcon fontSize='small' sx={{
                                color: '#fff'
                            }} />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className='font-montserrat text-[12px] font-[500] text-[#9c9c9c]'>{`Price : ₹ ${price}`}</p>
                    </div>
                </section>
                <section className='mt-1'>
                    <div className="flex justify-between items-center">
                        <Button>
                            <div className='flex gap-2'>
                                <AddShoppingCartIcon />
                                <p className=' md:block'>add to cart</p>
                            </div>
                        </Button>
                    </div>
                </section>
            </div>
        </Grid>
    )
}

const FoodCardCon: React.FC<IFoodCardCon> = ({ foods }) => {
    console.log(foods, 'foods');

    const handleCardClick = useCallback(() => {
        (id: string) => {

        }
    }, [])
    return (
        <div>
            <div className="w-[100%] mt-10">
                <h4 className='font-head text-2xl font-semibold'>Menu</h4>
                <Grid container spacing={2}>
                    {
                        foods.map((v, i) => {
                            return (
                                <FoodCard {...v} key={i} handleCardClick={handleCardClick} />
                            )
                        })
                    }
                </Grid>
            </div>
        </div>
    )
}
export default FoodCardCon