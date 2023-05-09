import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import Avatar from '@mui/material/Avatar'
import { deepOrange, deepPurple } from '@mui/material/colors'
import { NavLink } from 'react-router-dom'

interface IUserAvatar {
  userName: string
  size: number
}

const dropDown = [
  {
    name: 'account',
    to: '/account',
  },
  {
    name: 'settings',
    to: '/settings',
  },
]

export const UserAvatar: React.FC<IUserAvatar> = ({ userName, size }) => {
  const [isUserOptionOpen, setIsUserOptionOpen] = React.useState<boolean>(false)
  return (
    <>
      <div
        className="cursor-pointer px-1 py-1"
        onClick={() => setIsUserOptionOpen(!isUserOptionOpen)}
      >
        <Avatar
          sx={{
            bgcolor: deepOrange[500],
            width: size,
            height: size,
            fontSize: '14px',
          }}
        >
          {userName && userName[0]}
        </Avatar>
      </div>

      {isUserOptionOpen && (
        <div className="absolute top-[85%] right-10 transition-all ">
          <div className="flex flex-col items-center justify-center gap-2 bg-white rounded-md shadow-md p-2">
            {dropDown.map((item, index) => (
              <NavLink to={item.to}>
                <div className="cursor-pointer px-3 py-1.5 text-black capitalize hover:bg-[#f8f8f8] rounded-md text-sm font-moutserrat">
                  <span>{item.name}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
