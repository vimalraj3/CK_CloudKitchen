import lightLogo from '../../assets/logos/ligthLogo.png'
import darkLogo from '../../assets/logos/darkLogo.png'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../hooks'

import { UserAvatarNav } from './UserAvatarNav'
import Cart from '../utils/IconBtn/CartIcon'

interface INavProps {
  dark?: boolean
  textColor?: string
  bgColor?: string
}

const desktopDropDown = [
  {
    name: 'account',
    to: '/account',
  },
  {
    name: 'settings',
    to: '/account#userSettings',
  },
]


const mobileNoUserDropDown = [
  {
    name: 'login',
    to: '/login',
  },
  {
    name: 'sign up',
    to: '/signup',
  },
  {
    name: 'add restaurant',
    to: '/restaurant/add',
  },
]

const mobileUserDropDown = [
  {
    name: 'cart',
    to: '/cart'
  },
  ...desktopDropDown,

]

const Nav: React.FC<INavProps> = ({
  dark = false,
  textColor = '#fff',
  bgColor = 'transparent',
}) => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
  const [isUserOptionOpen, setIsUserOptionOpen] = useState<boolean>(false)

  const { data } = useAppSelector((state) => state.userState)
  return (
    <div id='top' className={`w-[100%] bg-[${bgColor}] z-50`}>
      <header
        className={`flex justify-between mx-auto py-2 px-10 items-center relative w-[100%] max-w-[1200px] text-[${dark ? '#242424' : textColor
          }] `}
      >
        {/* Logo */}
        <section>
          <NavLink to={'/'}>
            <h1 className="LogoName z-[50] w-[36px] md:w-[52px] cursor-pointer relative">
              {!dark ? (
                <img src={lightLogo} alt="light_logo" width={'100%'} />
              ) : (
                <img src={darkLogo} alt="dark_logo" width={'100%'} />
              )}
            </h1>
          </NavLink>
        </section>

        {/* nav  links */}
        <section>
          {/* desktop nav  links */}
          {!data?.userName ? (
            <div className="md:flex justify-between items-center  hidden">
              <NavLink to={'/re'}>
                <button className="mr-5 text-xl">Add cloud kitchen</button>
              </NavLink>
              <NavLink to={'/login'}>
                <button className="mr-5 text-xl">Log in</button>
              </NavLink>
              <NavLink to={'/signup'}>
                <button className="text-xl">Sign up</button>
              </NavLink>
            </div>
          ) : (
            <>
              <div className="md:flex justify-between items-center gap-6 hidden">
                <Cart />
                <UserAvatarNav userName={data?.userName} src={data.avatar} dropDown={desktopDropDown} />
              </div>
            </>
          )}

          {/* Moblie Nav links */}

          <div className='md:hidden'>
            {
              !data.userName ? (
                <>
                  {/* Moblie nav links*/}
                  <UserAvatarNav userName={data?.userName} src={data.avatar} isHamBuger={true} dropDown={mobileUserDropDown} dark={dark} />
                </>
              ) :
                <>
                  <div className="mb-2">
                    <UserAvatarNav userName={data?.userName} src={data.avatar} dropDown={mobileUserDropDown} />
                  </div>
                </>
            }
          </div>

        </section>
      </header>
    </div>
  )
}
export default Nav
