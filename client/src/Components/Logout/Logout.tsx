import { useState } from 'react'
import { useAppDispatch } from '../../hooks'
import { LogoutDialogBox } from './LogoutDialogBox'
import { userLogout } from '../../state/slices/user.slice'
import { useNavigate } from 'react-router-dom'

export const Logout: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const handleConfirm = async () => {
    setOpen(false)
    await dispatch(userLogout())
    navigate(-1)
  }
  return (
    <div>
      <div className="text-blue-400 underline mb-2 cursor-pointer" onClick={() => { setOpen(true) }}>Logout</div>
      <LogoutDialogBox open={open} setOpen={setOpen} handleConfirm={handleConfirm} />
    </div>
  )
}
