import React, { Suspense, lazy, useEffect } from 'react'
import Nav from '../Nav'
import RestaurantCard from './Card'
// import { RestaurantCard } from './Card'
import { useCart } from '../../hooks/useCart'
import PageLoading from '../Loading/PageLoading'

const index: React.FC = () => {

    const { handlePageLoad } = useCart()

    useEffect(() => {
        handlePageLoad()
    }, [])


    return (
        <div>
            <Nav bgColor='#f8f8f8' dark />
            <Suspense fallback={<PageLoading />}>
                <RestaurantCard />
            </Suspense>
        </div>
    )
}

export default index