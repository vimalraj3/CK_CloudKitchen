import React, { useEffect } from "react";
import Nav from "../Nav";
import Main from "./Card";
import { fetchUserAddress } from "../../state/slices/address.slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchCartByUserId } from "../../state/slices/cart.slice";

const index: React.FC = () => {
  const dispatch = useAppDispatch();

  const { cart } = useAppSelector((state) => state.cartState);

  const email = useAppSelector((state) => state.userState.data.email);

  useEffect(() => {
    dispatch(fetchCartByUserId());
    dispatch(fetchUserAddress());
  }, [email]);

  return (
    <div>
      <Nav bgColor="#f8f8f8" dark />
      <Main />
    </div>
  );
};

export default index;
