import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { placeOrderCheckout } from "../../../state/slices/checkout.slice";

export const CheckoutBox: React.FC = React.memo(() => {
  const { totalPrice, cart } = useAppSelector((state) => state.cartState);
  const { addressId } = useAppSelector((state) => state.checkoutState);

  const dispatch = useAppDispatch();

  const { foods } = useAppSelector((state) => state.foodState);

  return (
    <>
      {foods ? (
        <div className="flex w-full flex-col gap-2 rounded-lg">
          <h2 className="font-head font-bold md:text-2xl">Checkout</h2>
          <div>
            <div className="my-2 w-[100%]">
              {cart.map((v, i) => {
                return (
                  <div className="my-2 flex w-[100%] justify-between" key={i}>
                    <p>{`${v.food.title} x ${v.quantity} `}</p>
                    <p>{` ₹ ${v.food.price * v.quantity}`}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between">
              <p className="mt-1 font-para text-sm" aria-label="Item total">
                Item total{" "}
              </p>
              <p aria-label={`rupees  ${totalPrice}`}>₹ {totalPrice}</p>
            </div>
          </div>

          <div className="mt-3 flex w-full items-center justify-start md:w-auto">
            <button
              aria-label="Checkout"
              onClick={() => {
                dispatch(placeOrderCheckout(addressId));
              }}
              className="flex w-[200px] items-center justify-center gap-1 rounded-lg border border-primary px-3 py-2 font-medium  text-primary  transition-colors duration-300 ease-in-out hover:bg-primary-300 hover:font-semibold hover:text-white"
            >
              <div className="flex items-center gap-2">
                <p className=" capitalize md:block">Checkout</p>
                <i className="fa-solid fa-credit-card"></i>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <h2 className="font-head font-bold md:text-2xl">Checkout</h2>
            <div className="flex flex-col items-center justify-center ">
              <div>
                <img
                  src="https://res.cloudinary.com/dd39ktpmz/image/upload/v1687276814/c7qjhuxe5xdqobh5s6mz.png"
                  alt="No bills"
                  width={"100%"}
                  height={"100%"}
                />
              </div>
              <h4 className="text-center font-head text-2xl font-semibold">
                No bill found
              </h4>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
// TODO : Add a loader here
