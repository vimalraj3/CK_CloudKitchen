import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { Typography } from '@mui/material'
import { Input } from '../utils/Form'
import { IShowToast } from '../../types/showToast.types'
import { useAppDispatch } from '../../hooks'
import { forgetPasswordApi } from '../../state/slices/user.slice'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function ForgetPassword({
  showToast,
}: {
  showToast: IShowToast
}) {
  const [open, setOpen] = React.useState<boolean>(false)
  const [email, setEmail] = React.useState<string>('')

  const appDispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = async () => {
    if (email === '') {
      showToast('Please enter the Email', 'error')
    }
    const forgetPassword = await appDispatch(forgetPasswordApi(email))
    if (forgetPasswordApi.fulfilled.match(forgetPassword)) {
      showToast(forgetPassword.payload.message, 'success')
      console.log(forgetPassword, 'fullfil')
      // navigate(-1)
    } else {
      console.log(forgetPassword, 'error')

      if (forgetPassword.payload?.message) {
        showToast(forgetPassword.payload.message, 'error')
      } else {
        showToast('something went wrong', 'error')
      }
    }
  }

  return (
    <div>
      <p
        className={`text-blue-300 cursor-pointer`}
        onClick={() => {
          setOpen(true)
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
            fontFamily: 'Montserrat',
          }}
        >
          {`Forget Password`}
        </DialogTitle>
        <DialogContent>
          <Input type="email" onChange={handleChange} name="email" />
        </DialogContent>
        <DialogActions
          sx={{
            padding: ' 0 1rem 1rem 1rem',
          }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
