interface IRestaurantCardTitleProps {
  date: string
  total: number
  status: string
  restaurant: string
}

interface IRestaurantCardItemProps {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export interface IRestaurantCardProps extends IRestaurantCardTitleProps {
  items: IRestaurantCardItemProps[]
}

const RestaurantCardTitle: React.FC<IRestaurantCardTitleProps> = ({
  restaurant,
  total,
  status,
  date,
}) => {
  return (
    <>
      <div className="flex items-center">
        <h3 className="font-bold font-cardo md:text-lg">{restaurant}</h3>
        <p className="ml-2 text-green-500">•</p>
        <p className="ml-2 text-sm">Total: ${total}</p>
        <p className="ml-2 text-green-500">•</p>
        <p className={`ml-2  text-sm`}>{status}</p>
      </div>
      <p className="text-xs">{date}</p>
    </>
  )
}

const RestaurantCardItem: React.FC<IRestaurantCardItemProps> = ({
  id,
  name,
  price,
  quantity,
  image,
}) => {
  return (
    <>
      <div className="flex items-center mt-2">
        <img src={image} alt={name} className="w-16 h-16 rounded-md" />
        <div className="ml-2">
          <h3 className="font-bold font-cardo md:text-lg">{name}</h3>
          <p className="text-sm">${price}</p>
        </div>
        <p className="ml-auto text-sm">x{quantity}</p>
      </div>
    </>
  )
}

export const RestaurantCard: React.FC<IRestaurantCardProps> = ({
  date,
  total,
  status,
  restaurant,
  items,
}) => {
  return (
    <div>
      <RestaurantCardTitle
        date={date}
        total={total}
        status={status}
        restaurant={restaurant}
      />
      <RestaurantCardItem {...items[0]} />
    </div>
  )
}
