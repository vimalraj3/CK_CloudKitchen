import { useAppSelector } from '../../hooks'
import { IShowToast } from '../../types/showToast.types'
import { InitialUserState } from '../../types/user.types'
import Container from '../Container'
import Nav from '../Nav'
import { UserInfo } from './UserInfo'
import { UserOrders } from './UserOrders'

interface IAccountProps {
  showToast: IShowToast
}

export const Account: React.FC<IAccountProps> = ({ showToast }) => {
  const user: InitialUserState = useAppSelector((state) => state.userState)
  return (
    <div>
      <Nav dark bgColor="#f8f8f8" />
      <Container>
        <h3 className="text-lg md:text-4xl text-black font-bold font-cardo">
          Account
        </h3>
        <UserInfo user={user.data} />
        <UserOrders />
      </Container>
    </div>
  )
}

