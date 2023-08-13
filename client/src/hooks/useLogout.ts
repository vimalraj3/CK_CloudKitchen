import React, { useCallback } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { userLogout } from "../state/slices/user.slice";
import { ResetCart } from "../state/slices/cart.slice";
import { resetAddress } from "../state/slices/address.slice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  setDialogBoxDescription,
  setDialogBoxHandlerFunction,
  setDialogBoxIsBtn,
  setDialogBoxOpen,
  setDialogBoxTitle,
} from "../state/slices/dialog.slice";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = useCallback(async () => {
    const logoutData = dispatch(userLogout());
    dispatch(ResetCart());
    dispatch(resetAddress());
    toast.promise(
      logoutData,
      {
        loading: "Logging out",
        success: (data) => {
          if (!data.payload?.success) {
            throw data.payload?.message;
          }
          navigate("/");
          return `${data.payload?.message.trim()}`;
        },
        error: (err) => {
          return `${err}`;
        },
      },
      {
        success: {
          duration: 2000,
        },
        error: {
          duration: 2000,
        },
      },
    );
  }, []);

  const handleLogoutDialogBox = () => {
    dispatch(setDialogBoxOpen(true));
    dispatch(setDialogBoxTitle("Logout"));
    dispatch(setDialogBoxIsBtn(true));
    dispatch(setDialogBoxDescription("Are you sure you want to logout "));
  };
  return { handleLogout, handleLogoutDialogBox };
};
