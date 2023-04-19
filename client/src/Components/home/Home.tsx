import Nav from '../Nav'
import Category from './Category'
import Hero from './Hero'

import OfferCard from './OfferCard'
import Product from './product'

export default function Home() {
    return (
        <div>
            <Hero />
            <OfferCard />
            <Category />
            <Product />
        </div>
    )
}
