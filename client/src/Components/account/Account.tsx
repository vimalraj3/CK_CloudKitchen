import React, { useEffect } from 'react'
import { useAppSelector } from '../../hooks'
import { IShowToast } from '../../types/showToast.types'
import { InitialUserState } from '../../types/user.types'
import Container from '../Container'
import Nav from '../Nav'
const Settings = React.lazy(() => import('./Sections/Settings'))
import { UserInfo } from './Sections/UserInfo'
import { UserOrders } from './Sections/UserOrders'


const Account: React.FC = () => {
  const { data, error }: InitialUserState = useAppSelector((state) => state.userState)

  return (
    <div>
      <Nav dark bgColor="#f8f8f8" />
      <Container>
        <h3 className="text-lg md:text-4xl text-black font-bold font-head">
          Account
        </h3>
        <UserInfo user={data} />
        <UserOrders />
        <Settings />
      </Container>
    </div>
  )
}
export default Account