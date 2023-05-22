import { CardContianer } from '../Cards/CardContianer'
import { IRestaurantCardProps, RestaurantCard } from '../Cards/RestaurantCard'

const orders: IRestaurantCardProps = {
  date: '2021-09-01',
  total: 100,
  status: 'Delivered',
  restaurant: 'McDonalds',
  items: [
    {
      id: 1,
      name: 'Big Mac',
      price: 100,
      quantity: 1,
      image: 'https://via.placeholder.com/150',
    },
  ],
}

export const UserOrders = () => {
  return (
    <CardContianer title="Orders">
      <div className="flex flex-col">
        {/* {orders.map((order) => ( */}
        <RestaurantCard {...orders} />
        {/* ))} */}
      </div>
    </CardContianer>
  )
}

// TODO intergate with backend, Redesign the border and fonts make it little fancy
