import Title from './Title'
import Filter from './Filter'
import ProductCard from './ProductCard'
import { Btns } from '../../utils/Btn'
import Search from '../../utils/Search'


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

function index() {
    return (
        <div className='w-[90%] md:w-[80%] mx-auto max-w-[1200px] mt-4 md:mt-10'>
            <Title city='Puducherry' />
            <div className="flex my-3">
                <Filter />
                <Btns labelArr={["Rating 4.0+", "Pure Veg"]} />
                <div className="w-[30%]">
                    <Search />
                </div>
            </div>
            <ProductCard products={productTempData} />
        </div>
    )
}

export default index