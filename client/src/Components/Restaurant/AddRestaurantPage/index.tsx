import React, { memo, useEffect, useId, useMemo } from 'react'
import Hero from './Sections/Hero'
import HowItsWork from './Sections/HowItsWork'
import AddResForm from './Sections/AddResForm'
import { IShowToast } from '../../../types/showToast.types'
import { useAppSelector } from '../../../hooks'


const index: React.FC = () => {
    const { restaurant, restaurants, loading } = useAppSelector(state => state.restaurantState)

    return (
        <div>
            <Hero key={useId()} />
            <HowItsWork key={useId()} />
            <AddResForm key={useId()} />
        </div>
    )
}

export default memo(index)