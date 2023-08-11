import React, { useState } from "react";
import { AddUserAddress, UserAddress } from "../../account/Sections/UserInfo";
import { DialogBox } from "../../UI/DialogBox";
import { UserAddressEditForm } from "../../Forms/AddressForms/UserAddressEditForm";
import { IAddress } from "../../../types/user.types";
import {
  useAppDispatch,
  useAppSelector,
  useEditUserAddress,
} from "../../../hooks";
import { Grid, Skeleton } from "@mui/material";
import { useCheckout } from "../../../hooks/useCheckout";
import { setAddressId } from "../../../state/slices/checkout.slice";

export const AddressSelector = () => {
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
  const { address } = useAppSelector((state) => state.addressState);

  const [handleSubmit] = useEditUserAddress();

  const dispatch = useAppDispatch();

  const { addressId } = useAppSelector((state) => state.checkoutState);

  const handleSubmitEditForm = (data: IAddress) => {
    if (addressId !== "") {
      handleSubmit(data, false);
      dispatch(setAddressId(""));
    } else {
      handleSubmit(data, true);
    }
    setDialogBoxOpen(false);
  };

  return (
    <>
      {!address ? (
        <div className="mt-2 w-[100%] rounded-lg">
          <Skeleton variant="text" className="text-md md:text-2xl" />
          <div className="mt-5 flex flex-wrap gap-8">
            {Array(4)
              .fill("sdfs")
              .map((v, i) => {
                return (
                  <Skeleton
                    variant="rounded"
                    height={150}
                    key={i}
                    className="aspect-video h-[350px] w-[90%] max-w-[250px] rounded-lg p-3 md:p-5"
                  />
                );
              })}
          </div>
        </div>
      ) : (
        <div className="mt-2 w-[100%] rounded-lg">
          <h3 className="text-md font-head font-semibold md:text-2xl">
            Select your Address
          </h3>
          <div className="mt-5 flex justify-center gap-5 md:gap-8">
            <Grid container spacing={2}>
              {address.map((v, i) => {
                return (
                  <React.Fragment key={`${i}--${v.addressName}`}>
                    <Grid item xs={12} md={4} lg={4}>
                      <UserAddress
                        {...v}
                        key={i}
                        selector
                        selectedId={addressId}
                      />
                    </Grid>
                  </React.Fragment>
                );
              })}
              <Grid item xs={12} md={4} lg={4}>
                <AddUserAddress setDialogBoxOpen={setDialogBoxOpen} />
              </Grid>
            </Grid>
          </div>
          <DialogBox
            open={dialogBoxOpen}
            setOpen={setDialogBoxOpen}
            title="Change address"
            btns={false}
          >
            <UserAddressEditForm handleSubmit={handleSubmitEditForm} />
          </DialogBox>
        </div>
      )}
    </>
  );
};
