import Title from './Title'
import RestaurantCardContainer from './RestaurantCardContainer'
import { Btns } from '../../utils/Btn'
import { IRestaurant } from '../../../types/Restaurant.types'
import { Search } from '../../utils/Form/Search/Search'
import { useSearch } from '../../../hooks/useSearch'
import { FilterDrawer } from '../../utils/Drawer/FilterDrawer'
import { SortedBy } from '../../utils/SortedBy/SortedBy'
import { ClearFilters } from './clearFIlters/ClearFilters'


const productTempData = [
    {
        title: "Briyani tree",
        subTitle: 'paneer better masla',
        price: 120,
        rating: 3.4
    },
    {
        title: "Briyani tree",
        subTitle: 'paneer better masla',
        price: 120,
        rating: 3.4
    },
    {
        title: "Briyani tree",
        subTitle: 'paneer better masla',
        price: 120,
        rating: 3.4
    },
    {
        title: "Briyani tree",
        subTitle: 'paneer better masla',
        price: 120,
        rating: 3.4
    },
    {
        title: "Briyani tree",
        subTitle: 'paneer better masla',
        price: 120,
        rating: 3.4
    },
    {
        title: "Briyani tree",
        subTitle: 'paneer better masla',
        price: 120,
        rating: 3.4
    },
    {
        title: "Briyani tree",
        subTitle: 'paneer better masla',
        price: 120,
        rating: 3.4
    },
    {
        title: "Briyani tree",
        subTitle: 'paneer better masla',
        price: 120,
        rating: 3.4
    }
]

interface Props {
    restaurants: IRestaurant[]
}

const HomeProduct: React.FC<Props> = ({ restaurants }) => {

    const { handleSearch, handleSearchSubmit } = useSearch()

    return (
        <div className='w-[90%] md:w-[80%] mx-auto max-w-[1200px] mt-6 md:mt-10'>
            <Title />
            <div className="flex flex-col md:flex-row my-4 md:my-3 gap-3 items-center">
                <div className="w-[100%] md:w-[30%]">
                    <Search handleSearch={handleSearch} handleSearchSubmit={handleSearchSubmit} />
                </div>
                <div className='grid grid-flow-col gap-3 w-[100%] items-center md:w-[50%]'>
                    <FilterDrawer />
                    {
                        innerWidth > 450 && <SortedBy />
                    }
                    <ClearFilters />
                </div>
            </div>
            <RestaurantCardContainer restaurants={restaurants} />
        </div>
    )
}

export default HomeProduct