import React, { useEffect } from 'react'
import Nav from '../Nav'
import { IShowToast } from '../../types/showToast.types'
import { RestaurantCard } from './Card'
import { useAppDispatch, useAppSelector } from '../../hooks'
import PageLoading from '../Loading/PageLoading'
import { fetchCartByUserId } from '../../state/slices/cart.slice'

interface IProps {
    showToast: IShowToast
}

const index: React.FC<IProps> = ({
    showToast
}) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCartByUserId())
    }, [])


    return (
        <div>
            <Nav bgColor='#f8f8f8' dark />
            <RestaurantCard />
        </div>
    )
}

export default index