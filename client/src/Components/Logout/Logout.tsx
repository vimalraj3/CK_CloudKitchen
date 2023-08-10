import { useState } from 'react'
import { LogoutDialogBox } from './LogoutDialogBox'
import { useLogout } from '../../hooks/useLogout'

export const Logout: React.FC = () => {
  const { handleLogout } = useLogout()
  const [open, setOpen] = useState(false)

  const handleConfirm = async () => {
    setOpen(false)
    handleLogout()
  }

  return (
    <div>
      <div className="text-blue-400 underline mb-2 cursor-pointer" onClick={() => { setOpen(true) }}>Logout</div>
      <LogoutDialogBox open={open} setOpen={setOpen} handleConfirm={handleConfirm} />
    </div>
  )
}
