import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Typography } from "@mui/material";
import { Input } from "../UI/Form";
import { IShowToast } from "../../types/showToast.types";
import { useAppDispatch } from "../../hooks";
import { forgetPasswordApi } from "../../state/slices/user.slice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ForgetPassword() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const handleConfirm = async () => {
    const forgetPassword = dispatch(forgetPasswordApi(email));

    toast.promise(
      forgetPassword,
      {
        loading: "Sending email...",
        success: (data) => {
          if (!data.payload?.success) {
            throw data.payload?.message;
          }
          navigate(-1);
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
  };

  return (
    <div>
      <p
        className={`cursor-pointer text-blue-300`}
        onClick={() => {
          setOpen(true);
        }}
      >
        Forget password?
      </p>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            fontFamily: "Montserrat",
          }}
        >
          {`Forget Password`}
        </DialogTitle>
        <DialogContent>
          <Input type="email" onChange={handleChange} name="email" />
        </DialogContent>
        <DialogActions
          sx={{
            padding: " 0 1rem 1rem 1rem",
          }}
        >
          <div className="flex w-full gap-2 px-2">
            <button
              onClick={handleClose}
              className="mt-2 w-[50%] rounded-md  px-3 py-2 text-lg font-bold text-primary"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="mt-2 w-[50%] rounded-md bg-primary px-3 py-2 text-lg font-bold text-white hover:bg-primary-300"
            >
              Confirm
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

//  TODO need to improve and implement yup and form data , testing
{
  /* <Button onClick={handleConfirm} variant="contained">
            Confirm
          </Button> */
}
{
  /* <Button onClick={handleClose}>Cancel</Button> */
}
