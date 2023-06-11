import React, { Suspense, lazy, useEffect } from 'react'
import Nav from '../Nav'
import Main from './Card'
// import { RestaurantCard } from './Card'
import { useCart } from '../../hooks/useCart'
import PageLoading from '../Loading/PageLoading'
import { fetchUserAddress } from '../../state/slices/address.slice'
import { useAppDispatch } from '../../hooks'

const index: React.FC = () => {

    const { handlePageLoad } = useCart()
    useEffect(() => {
        handlePageLoad()
    }, [])


    return (
        <div>
            <Nav bgColor='#f8f8f8' dark />
            <Main />
        </div>
    )
}

export default index