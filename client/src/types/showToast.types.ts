import { TransitionProps } from "@mui/material/transitions";
export interface ToastState {
  open: boolean;
  type: string;
  message: string;
  Transition: React.ComponentType<
    TransitionProps & {
      children: React.ReactElement<any, any>;
    }
  >;
}

export type IShowToast = (message: string, type: string) => void;

export type IReturnProps = [
  showToast: IShowToast,
  ToastComponent: React.FC<any>
];
