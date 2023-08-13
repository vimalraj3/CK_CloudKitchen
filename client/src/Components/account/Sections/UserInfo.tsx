import { IAddress } from "../../../types/user.types";

import { CardContianer } from "../Cards/CardContianer";
import React, { memo, useCallback, useEffect, useState } from "react";
import {
  useAppDispatch,
  useEditUserAddress,
  useAppSelector,
  useDeleteUserAddress,
} from "../../../hooks";
import { UserAvatar } from "../../UI/UserAvatar/UserAvatar";
import { AddAddress } from "./Address/AddAddress";
import {
  setDialogBoxOpen,
  setDialogBoxTitle,
} from "../../../state/slices/dialog.slice";
import { Address } from "./Address/Address";

interface IUserEmail {
  email: string;
  userName: string;
}

const UserEmail: React.FC<IUserEmail> = memo(({ email, userName }) => {
  return (
    <div>
      <h4 className="text-md font-head font-medium md:text-lg">{email}</h4>
      <p className="md:text-md text-sm font-thin capitalize">{userName}</p>
    </div>
  );
});

export const UserInfo = memo(() => {
  const dispatch = useAppDispatch();
  const { address } = useAppSelector((state) => state.addressState);
  const user = useAppSelector((state) => state.userState.data);

  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  const handleDeleteAddress = useDeleteUserAddress();

  const [handleSubmit] = useEditUserAddress();

  const handleUserAddressEvents = useCallback(
    (addressId: string, isEditEvent: boolean) => {
      if (isEditEvent) {
        setSelectedAddressId(addressId);
      } else {
        handleDeleteAddress(addressId);
      }
    },
    [],
  );

  const handleSubmitEditForm = (data: IAddress) => {
    if (selectedAddressId !== "") {
      handleSubmit(data, false);
      setSelectedAddressId("");
    } else {
      handleSubmit(data, true);
    }
    dispatch(setDialogBoxOpen(true));
    dispatch(setDialogBoxTitle("Edit your address"));
  };

  return (
    <div id={"userInfo"}>
      <CardContianer title="">
        <h4 className="font-head text-lg font-semibold">User info</h4>
        <div className="mt-5 flex w-[90%] max-w-[600px] items-center gap-3 md:flex-row md:gap-6">
          <UserAvatar userName={user.userName || "ck"} src={user.avatar} />
          {user.email && (
            <UserEmail email={user.email} userName={user.userName || "ck"} />
          )}
        </div>
        <h4 className="mt-7 font-head text-lg font-semibold">Address</h4>
        <div className="mt-5 flex flex-col gap-4 md:flex-row md:gap-7">
          {address.map((v, i: number) => {
            return (
              <Address {...v} key={i} handleEvents={handleUserAddressEvents} />
            );
          })}
          <AddAddress />
        </div>
      </CardContianer>
    </div>
  );
});
