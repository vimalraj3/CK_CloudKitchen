import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import Container from "../Container";
import Nav from "../Nav";
const Settings = React.lazy(() => import("./Sections/Settings"));
import { UserInfo } from "./Sections/UserInfo";
import { UserOrders } from "./Sections/UserOrders";
import { getMyOrders } from "../../state/slices/checkout.slice";
import { fetchUserAddress } from "../../state/slices/address.slice";

const Account: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMyOrders());
    dispatch(fetchUserAddress());
  }, []);

  return (
    <div>
      <Nav dark bgColor="#f8f8f8" />
      <Container>
        <h3 className="font-head text-lg font-bold text-black md:text-4xl">
          Account
        </h3>
        <UserInfo />
        <UserOrders />
        <Settings />
      </Container>
    </div>
  );
};
export default Account;
