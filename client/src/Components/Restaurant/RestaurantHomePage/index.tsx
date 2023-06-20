import Title from './Title'
import RestaurantCardContainer from './RestaurantCard/RestaurantCardContainer'
import { Search } from '../../utils/Form/Search/Search'
import { useSearch } from '../../../hooks/useSearch'
import { FilterDrawer } from './Filter/FilterDrawer'
import { SortedByBtn } from './SortedBy/SortedBy'
import { ClearFilters } from './clearFIlters/ClearFilters'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { useEffect } from 'react'
import { getAllRestaurants } from '../../../state/slices/restaurants.slice'


const HomeProduct: React.FC = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAllRestaurants())
    }, [])

    return (
        <div className='w-[90%] md:w-[80%] mx-auto max-w-[1200px] mt-6 md:mt-10'>
            <Title />
            <div className="flex flex-col md:flex-row my-4 md:my-3 gap-3 items-center">
                <div className="w-[100%] md:w-[30%]">
                    <Search />
                </div>
                <div className='grid grid-flow-col gap-3 w-[100%] items-center md:w-[50%]'>
                    <FilterDrawer />
                    {
                        innerWidth > 450 && <SortedByBtn />
                    }
                    <ClearFilters />
                </div>
            </div>
            <RestaurantCardContainer />
        </div>
    )
}

export default HomeProduct