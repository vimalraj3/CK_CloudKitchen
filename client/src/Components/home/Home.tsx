import Category from './Category'
import Hero from './Hero'
import OfferCard from './OfferCard'
import Restaurant from '../Restaurant/RestaurantHomePage'

export default function Home() {
  return (
    <div>
      <Hero />
      <OfferCard />
      <Category />
      <Restaurant />
    </div>
  )
}
