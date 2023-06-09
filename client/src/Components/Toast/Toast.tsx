import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import { Alert, AlertColor } from '@mui/material';
import { IShowToast, ToastState, IReturnProps } from '../../types/showToast.types';
import { useAppSelector } from '../../hooks/useAppSelector';

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

const initialState: ToastState = {
    open: false,
    Transition: SlideTransition,
    type: 'success',
    message: 'This is a success message!',
};



/** *
    useToast hook is used to show toast messages in the application.
    It returns a function showToast and a component ToastComponent.
    showToast function is used to show the toast message.
    @param message: string
    @param type: string
    @returns void
    ToastComponent is a component that is used to show the toast message.
    @returns JSX.Element
*/
export const ShowToast: React.FC<any> = () => {
    const [state, setState] = React.useState<ToastState>(initialState);

    const showToast: IShowToast = React.useCallback(
        (message: string, type: string) => {
            setState({ open: true, type, message, Transition: SlideTransition });
        }, []
    )

    const { error } = useAppSelector(state => state.errorsState)

    React.useEffect(() => {
        console.log(error, 'change');

        if (error) {
            showToast(error.message, error.success ? 'success' : "error")
        }
    }, [error?.message])

    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    };

    return (
        <Snackbar open={state.open} autoHideDuration={1500} onClose={handleClose} TransitionComponent={state.Transition} anchorOrigin={{ vertical: `top`, horizontal: `center` }}>
            <Alert onClose={handleClose} severity={state.type as AlertColor} sx={{ width: '100%' }}>
                {state.message}
            </Alert>
        </Snackbar >
    )
}
