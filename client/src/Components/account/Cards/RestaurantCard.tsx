import { useId } from "react";
import { IFood } from "../../../types/Food.types";
import { IOrder } from "../../../types/order.types";

export interface IRestaurantCardProps {
  orders: IOrder;
}

interface IRestaurantCardTitleProps {
  restaurant: string;
  total: number;
  status: string;
  date?: string;
}

interface IRestaurantCardItemProps extends IFood {
  quantity: number;
}

const RestaurantCardTitle: React.FC<IRestaurantCardTitleProps> = ({
  restaurant,
  total,
  status,
  date,
}) => {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="font-head text-sm font-bold md:text-lg">
            {restaurant}
          </h3>
          <p className="text-xs md:text-sm">Total: ${total}</p>
        </div>
        <div>
          <p className={`text-xs md:text-sm`}>{status}</p>
          <p className="text-xs">{date}</p>
        </div>
      </div>
    </>
  );
};

const RestaurantCardItem: React.FC<IRestaurantCardItemProps> = ({
  _id,
  title,
  price,
  quantity,
  image,
}) => {
  return (
    <>
      <div className="mt-2 flex items-center">
        <div className="flex flex-row items-center justify-start gap-4">
          <img
            src={image[0]}
            alt={title}
            className="h-16 w-16 rounded-md"
            loading="lazy"
          />
          <div>
            <h3 className="font-head font-semibold md:text-lg">{title}</h3>
            <p className="mt-1 font-para text-sm">₹ {price}</p>
          </div>
        </div>
        <p className="ml-auto text-sm">x{quantity}</p>
      </div>
    </>
  );
};

export const RestaurantCard: React.FC<IRestaurantCardProps> = ({ orders }) => {
  const date = new Date(orders.date);
  return (
    <div key={date.toLocaleTimeString()}>
      {/* <RestaurantCardTitle
        date={date.toLocaleDateString()}
        total={orders.totalPrice}
        status={orders.status}
      /> */}
      <div className="mt-1 flex flex-col gap-3">
        {orders.foods.map((food, i) => (
          <RestaurantCardItem {...food.food} quantity={food.quantity} key={i} />
        ))}
      </div>
    </div>
  );
};
