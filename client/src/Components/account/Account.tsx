import React from 'react'
import { useAppSelector } from '../../hooks'
import { IShowToast } from '../../types/showToast.types'
import { InitialUserState } from '../../types/user.types'
import Container from '../Container'
import Nav from '../Nav'
const Settings = React.lazy(() => import('./Sections/Settings'))
import { UserInfo } from './Sections/UserInfo'
import { UserOrders } from './Sections/UserOrders'

interface IAccountProps {
  showToast: IShowToast
}

const Account: React.FC<IAccountProps> = ({ showToast }) => {
  const user: InitialUserState = useAppSelector((state) => state.userState)
  return (
    <div>
      <Nav dark bgColor="#f8f8f8" />
      <Container>
        <h3 className="text-lg md:text-4xl text-black font-bold font-head">
          Account
        </h3>
        <UserInfo user={user.data} showToast={showToast} />
        <UserOrders />
        <Settings />
      </Container>
    </div>
  )
}
export default Account