import { useId } from "react"
import { IFood } from "../../../types/Food.types"
import { IOrder } from "../../../types/order.types"


export interface IRestaurantCardProps {
  orders: IOrder
}


interface IRestaurantCardTitleProps {
  restaurant: string
  total: number
  status: string
  date?: string
}

interface IRestaurantCardItemProps extends IFood {
  quantity: number
}

const RestaurantCardTitle: React.FC<IRestaurantCardTitleProps> = ({
  restaurant,
  total,
  status,
  date,
}) => {
  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <div>
          <h3 className="font-bold font-head text-sm md:text-lg">{restaurant}</h3>
          <p className="text-xs md:text-sm">Total: ${total}</p>
        </div>
        <div>
          <p className={`text-xs md:text-sm`}>{status}</p>
          <p className="text-xs">{date}</p>
        </div>
      </div>
    </>
  )
}

const RestaurantCardItem: React.FC<IRestaurantCardItemProps> = ({
  _id,
  title,
  price,
  quantity,
  image,
}) => {
  return (
    <>
      <div className="flex items-center mt-2">
        <div className="flex flex-row justify-start items-center gap-4">
          <img src={image[0]} alt={title} className="w-16 h-16 rounded-md" loading="lazy" />
          <div>
            <h3 className="font-semibold font-head md:text-lg">{title}</h3>
            <p className="text-sm font-para mt-1">₹ {price}</p>
          </div>
        </div>
        <p className="ml-auto text-sm">x{quantity}</p>
      </div>
    </>
  )
}

export const RestaurantCard: React.FC<IRestaurantCardProps> = ({
  orders
}) => {
  const date = new Date(orders.date)
  return (
    <div key={date.toLocaleTimeString()}>
      <RestaurantCardTitle
        date={date.toLocaleDateString()}
        total={orders.totalPrice}
        status={orders.status}
        restaurant={orders.restaurant.restaurantName}
      />
      <div className="flex flex-col gap-3 mt-1">
        {
          orders.foods.map((food, i) => (
            <RestaurantCardItem {...food.food} quantity={food.quantity} key={i} />
          ))
        }
      </div>
    </div>
  )
}
