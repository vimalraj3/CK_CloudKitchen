import DialogContent from "@mui/material/DialogContent";
import { Dialog, DialogActions, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  setDialogBoxOpen,
  setDialogBoxToInitialState,
} from "../../../state/slices/dialog.slice";

interface IProps {
  // open: boolean;
  // setOpen: (open: boolean) => void;
  // title: string;
  children: React.ReactNode;
  // cancelBtnText?: string;
  // successBtnText?: string;
  handleConfirm?: () => void;
  // btns?: boolean;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DialogBox: React.FC<IProps> = React.memo(
  ({ children, handleConfirm }) => {
    const { open, title, isBtn } = useAppSelector(
      (state) => state.dialogBoxState,
    );
    const dispatch = useAppDispatch();
    const handleClose = () => {
      dispatch(setDialogBoxOpen(false));
      dispatch(setDialogBoxToInitialState());
    };

    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby={`Dialog of ${title}`}
      >
        <div className="px-5 py-3">
          <h3 className="font-head text-xl">{title}</h3>
          <div className="mt-5">{children}</div>
          {isBtn && (
            <div className="mt-2 flex w-full gap-2">
              <button
                onClick={handleClose}
                className="mt-2 w-[50%] rounded-md  px-3 py-2 text-lg font-bold text-primary"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleConfirm && handleConfirm();
                }}
                className="mt-2 w-[50%] rounded-md bg-primary px-3 py-2 text-lg font-bold text-white hover:bg-primary-300"
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      </Dialog>
    );
  },
);

// TODO customize the cancel and confirm buttons
