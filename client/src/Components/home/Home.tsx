import Nav from '../Nav'
import Category from './Category'
import Hero from './Hero'

import OfferCard from './OfferCard'
import Product from './product'

import { IShowToast } from '../../types/showToast.types'
interface IHome {
    showToast: IShowToast
}

export default function Home(props: IHome) {
    const { showToast } = props;
    // showToast('This is a success message!', 'success');

    return (
        <div>
            <Hero />
            <OfferCard />
            <Category />
            <Product />
        </div>
    )
}
