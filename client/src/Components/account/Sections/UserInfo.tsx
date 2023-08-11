import { IAddress, UserSession } from "../../../types/user.types";

import { CardContianer } from "../Cards/CardContianer";
import React, { memo, useCallback, useEffect, useState } from "react";
import {
  useAppDispatch,
  useEditUserAddress,
  useAppSelector,
  useDeleteUserAddress,
} from "../../../hooks";
import { fetchUserAddress } from "../../../state/slices/address.slice";

import { DialogBox } from "../../UI/DialogBox";
import { UserAddressEditForm } from "../../Forms/AddressForms/UserAddressEditForm";

import { EditBtn } from "../../UI/IconBtn/EditBtn";
import { DeleteBtn } from "../../UI/IconBtn/DeleteBtn";
import { UserAvatar } from "../../UI/UserAvatar/UserAvatar";
import { TickCheckbox } from "../../UI/Form/Checkbox/Checkbox";
import { setAddressId } from "../../../state/slices/checkout.slice";

interface IUserInfo {
  user: UserSession;
}

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

type IUserAddress = IAddress & {
  handleEvents?: (addressId: string, isEditEvent: boolean) => void;
  selector?: boolean;
  handleSelector?: (addressId: string) => void;
  selectedId?: string;
};

export const UserAddress: React.FC<IUserAddress> = memo(
  ({
    houseNo,
    streetName,
    city,
    state,
    addressName,
    zipCode,
    handleEvents,
    _id,
    area,
    selector,
    selectedId,
  }) => {
    const dispatch = useAppDispatch();

    return (
      <div
        className={`aspect-video w-[100%] rounded-lg bg-[#F8F8F8] p-3 md:max-w-[250px] md:p-5 ${
          selector && "cursor-pointer"
        } border-2  ${selectedId === _id && "border-green-400"}`}
        onClick={() => {
          dispatch(setAddressId(_id));
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <h5 className="font-head text-lg font-medium capitalize">{`${addressName} `}</h5>
          {!selector ? (
            <div className="flex gap-2">
              <div onClick={() => handleEvents && handleEvents(_id, true)}>
                <EditBtn />
              </div>
              <div onClick={() => handleEvents && handleEvents(_id, false)}>
                <DeleteBtn />
              </div>
            </div>
          ) : (
            <TickCheckbox checked={selectedId === _id} />
          )}
        </div>
        <div className="font-para">
          <p>{`${houseNo}, ${streetName},`}</p>
          <p className="capitalize">{`${area},`}</p>
          <p className="capitalize">{`${city},`}</p>
          <p className="capitalize">{`${state} - ${zipCode}.`}</p>
        </div>
      </div>
    );
  },
);

interface IAddUserAddress {
  setDialogBoxOpen: (open: boolean) => void;
}
export const AddUserAddress: React.FC<IAddUserAddress> = memo(
  ({ setDialogBoxOpen }) => {
    return (
      <div className="flex aspect-video h-full w-[100%] items-center justify-center border-2 bg-[#F8F8F8] p-3 md:max-w-[250px] md:p-5">
        <div
          className="cursor-pointer gap-2"
          onClick={() => setDialogBoxOpen(true)}
        >
          <i className="fa-solid fa-location-dot"></i> Add address
        </div>
      </div>
    );
  },
);

export const UserInfo: React.FC<IUserInfo> = memo(({ user }) => {
  const useDispatch = useAppDispatch();
  const { address } = useAppSelector((state) => state.addressState);

  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  const handleDeleteAddress = useDeleteUserAddress();

  const [handleSubmit] = useEditUserAddress();

  const handleUserAddressEvents = useCallback(
    (addressId: string, isEditEvent: boolean) => {
      if (isEditEvent) {
        setSelectedAddressId(addressId);
        setDialogBoxOpen(true);
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
    setDialogBoxOpen(false);
  };

  useEffect(() => {
    useDispatch(fetchUserAddress());
  }, []);

  console.log(user);

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
              <UserAddress
                {...v}
                key={i}
                handleEvents={handleUserAddressEvents}
              />
            );
          })}
          <AddUserAddress setDialogBoxOpen={setDialogBoxOpen} />

          <DialogBox
            open={dialogBoxOpen}
            setOpen={setDialogBoxOpen}
            title="Change address"
            btns={false}
          >
            <UserAddressEditForm
              handleSubmit={handleSubmitEditForm}
              address={
                address.filter((addr) => addr?._id === selectedAddressId)[0]
              }
            />
          </DialogBox>
        </div>
      </CardContianer>
    </div>
  );
});
