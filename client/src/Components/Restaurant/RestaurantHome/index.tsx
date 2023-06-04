import React, { memo, useEffect, useId, useMemo } from 'react'
import Hero from './Sections/Hero'
import HowItsWork from './Sections/HowItsWork'
import AddResForm from './Sections/AddResForm'
import { IShowToast } from '../../../types/showToast.types'
import { useAppSelector } from '../../../hooks'

type IRestaurantAddProps = { showToast: IShowToast }

const index: React.FC<IRestaurantAddProps> = ({ showToast }) => {
    const { restaurant, restaurants, loading, error } = useAppSelector(state => state.restaurantState)

    useEffect(() => {
        if (error?.message) {
            showToast(error?.message, 'error')
        }
    }, [error])
    return (
        <div>
            <Hero key={useId()} />
            <HowItsWork key={useId()} />
            <AddResForm key={useId()} showToast={showToast} />
        </div>
    )
}

export default memo(index)