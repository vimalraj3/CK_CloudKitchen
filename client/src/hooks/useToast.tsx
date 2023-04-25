import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import { Alert, AlertColor } from '@mui/material';
import { IShowToast, ToastState, IReturnProps } from '../types/showToast.types';

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

const initialState: ToastState = {
    open: false,
    Transition: SlideTransition,
    type: 'success',
    message: 'This is a success message!',
};



/** 
    useToast hook is used to show toast messages in the application.
    It returns a function showToast and a component ToastComponent.
    showToast function is used to show the toast message.
    @param message: string
    @param type: string
    @returns void
    ToastComponent is a component that is used to show the toast message.
    @returns JSX.Element
*/
export const useToast = () => {
    const [state, setState] = React.useState<ToastState>(initialState);

    const showToast: IShowToast = (message: string, type: string) => {
        setState({ open: true, type, message, Transition: SlideTransition });
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    };

    const ToastComponent: React.FC<any> = () => (
        <Snackbar open={state.open} autoHideDuration={6000} onClose={handleClose} TransitionComponent={state.Transition} anchorOrigin={{ vertical: `top`, horizontal: `center` }}>
            <Alert onClose={handleClose} severity={state.type as AlertColor} sx={{ width: '100%' }}>
                {state.message}
            </Alert>
        </Snackbar >
    );

    return [showToast, ToastComponent] as IReturnProps;
};
