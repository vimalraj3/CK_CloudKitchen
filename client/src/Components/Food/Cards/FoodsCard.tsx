import React, { memo, useCallback, useEffect } from 'react'
import { Grid } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { useNavigate } from 'react-router-dom'

import { addToCart } from '../../../state/slices/cart.slice'
import { FoodCard } from './FoodCard'
import { FoodCardSkeleton } from './Loading'
import { FoodNotFound } from './NotFound'
import { getAllFoods } from '../../../state/slices/food.slice'

const FoodCardCon: React.FC = memo(() => {
  const email = useAppSelector((state) => state.userState.data.email)
  const { foods, loading, error } = useAppSelector((state) => state.foodState)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleCart = useCallback(
    (foodId: string) => {
      console.log(email)

      if (!email) {
        navigate('/login')
        return
      }

      foodId && dispatch(addToCart({ foodId, quantity: 1 }))

      console.log(foods, loading, 'food card con', error, foodId, 'id', email)
    },
    [dispatch]
  )

  const handleClick = (id: string) => {
    navigate(`/food/${id}`)
  }

  useEffect(() => {
    if (!foods && !error) {
      console.log('fetcing')

      dispatch(getAllFoods())
    }
    console.log(foods, loading, error, 'foods')
  })
  return (
    <div className="w-[100%] max-w-[1200px] mx-auto mt-5">
      {loading ? (
        <FoodCardSkeleton />
      ) : foods?.length === 0 ? (
        <FoodNotFound />
      ) : (
        <div className="w-[100%]">
          <Grid container spacing={4}>
            {foods.map((v, i) => {
              return (
                <FoodCard
                  {...v}
                  key={i}
                  handleAddToCart={handleCart}
                  handleClick={handleClick}
                />
              )
            })}
          </Grid>
        </div>
      )}
    </div>
  )
})
export default FoodCardCon
