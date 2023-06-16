import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserAvatar } from '../utils/UserAvatar/UserAvatar'

interface IUserAvatarNavLinks {
  name: string
  to: string
}

interface IUserAvatar {
  userName?: string
  src?: string
  dropDown: IUserAvatarNavLinks[]
  isHamBuger?: boolean
  dark?: boolean
}



export const UserAvatarNav: React.FC<IUserAvatar> = ({ userName, src, dropDown, isHamBuger = false, dark = false }) => {
  const [isUserOptionOpen, setIsUserOptionOpen] = React.useState<boolean>(false)
  return (
    <>
      {
        isHamBuger ? (<>
          <div
            className="flex flex-col justify-between w-[24px] h-[18px] overflow-hidden md:hidden z-20 relative"
            onClick={() => {
              setIsUserOptionOpen((prev) => (prev = !prev))
            }}
          >
            <div
              className={`w-[100%] h-[2px] my-0.5 absolute ${dark ? 'bg-black' : 'bg-white'
                } duration-500 ease-in-out transition-all ${isUserOptionOpen ? 'top-1.5 rotate-[135deg]' : 'rotate-0'
                }`}
            ></div>
            <div
              className={`w-[100%] h-[2px] my-0.5 absolute top-1.5 ${dark ? 'bg-black' : 'bg-white'
                } duration-700  ease-in-out transition-all ${isUserOptionOpen ? 'left-[-60px]' : 'left-0'
                }`}
            ></div>
            <div
              className={`w-[100%] h-[2px] my-0.5 absolute  ${dark ? 'bg-black' : 'bg-white'
                } duration-500 ease-in-out transition-all ${isUserOptionOpen ? 'top-1.5 -rotate-[135deg]' : 'rotate-0 top-3'
                }`}
            ></div>
          </div>
        </>) : (
          <div
            className="cursor-pointer px-1 py-1 z-50"
            onClick={() => setIsUserOptionOpen(!isUserOptionOpen)}
          >
            <UserAvatar userName={userName && userName[0] || "CK"} src={src} isNav={true} />
          </div>
        )
      }

      {isUserOptionOpen && (
        <div className="absolute top-[85%] right-10 transition-all z-50 ">
          <div className="flex flex-col items-center justify-center gap-2 bg-white rounded-md shadow-md p-2">
            {dropDown.map((item, index) => (
              <NavLink to={item.to} key={index} onClick={() => { setIsUserOptionOpen(false) }}>
                <div className="cursor-pointer px-3 py-1.5 text-black capitalize hover:bg-[#f8f8f8] rounded-md text-sm font-moutserrat">
                  <span>{item.name}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )}
      {
        isUserOptionOpen &&
        <div className="absolute h-[100vh] w-[100%] top-0 left-0" onClick={() => setIsUserOptionOpen(false)}></div>
      }
    </>
  )
}
