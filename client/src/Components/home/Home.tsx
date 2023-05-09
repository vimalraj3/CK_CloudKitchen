import Category from './Category'
import Hero from './Hero'

import OfferCard from './OfferCard'
import Product from './product'

import { IShowToast } from '../../types/showToast.types'
interface IHome {
  showToast: IShowToast
}

export default function Home(props: IHome) {
  const { showToast } = props

  return (
    <div>
      <Hero />
      <OfferCard />
      <Category />
      <Product />
    </div>
  )
}
