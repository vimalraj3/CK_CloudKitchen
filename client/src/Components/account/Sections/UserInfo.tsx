import { IAddress, UserSession } from '../../../types/user.types'

import Avatar from '@mui/material/Avatar'
import { CardContianer } from '../Cards/CardContianer'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useEditUserAddress, useAppSelector, useDeleteUserAddress } from '../../../hooks'
import { fetchUserAddress } from '../../../state/slices/address.slice'

import { DialogBox } from '../../utils/DialogBox'
import { UserAddressEditForm } from '../../Forms/AddressForms/UserAddressEditForm'
import { IShowToast } from '../../../types/showToast.types'

import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { EditBtn } from '../../utils/IconBtn/EditBtn'
import { DeleteBtn } from '../../utils/IconBtn/DeleteBtn'
import { UserAvatar } from '../../utils/UserAvatar/UserAvatar'

interface IUserInfo {
  user: UserSession
}



interface IUserEmail {
  email: string
  userName: string
}

const UserEmail: React.FC<IUserEmail> = memo(
  ({ email, userName }) => {
    return (
      <div>
        <h4 className='text-md md:text-lg font-medium font-head'>{email}</h4>
        <p className='text-sm md:text-md font-thin capitalize'>{userName}</p>
      </div>
    )
  }
)

type IUserAddress = IAddress & {
  handleEvents: (addressId: string, isEditEvent: boolean) => void
}

const UserAddress: React.FC<IUserAddress> = memo(
  ({ houseNo, streetName, city, state, addressName, zipCode, handleEvents, _id }) => {
    return (
      <div className='bg-[#F8F8F8] aspect-video p-3 md:p-5 w-[90%] max-w-[250px] rounded-lg'>
        <div className="flex items-center justify-between gap-2">
          <h5 className='text-lg font-medium font-head capitalize'>{`${addressName} `}</h5>
          <div className='flex'>
            <div onClick={() => handleEvents(_id, true)}>
              <EditBtn />
            </div>
            <div onClick={() => handleEvents(_id, false)}>
              <DeleteBtn />
            </div>
          </div>
        </div>
        <div className="font-para">
          <p>{`${houseNo}, ${streetName},`}</p>
          <p className='capitalize'>{`${city},`}</p>
          <p className='capitalize'>{`${state} - ${zipCode}.`}</p>
        </div>
      </div>
    )
  }
)

interface IAddUserAddress {
  setDialogBoxOpen: (open: boolean) => void
}
const AddUserAddress: React.FC<IAddUserAddress> = memo(({ setDialogBoxOpen }) => {
  return (
    <div className='bg-[#F8F8F8] aspect-video p-3 md:p-5 w-[90%] max-w-[250px] rounded-lg flex justify-center items-center' >
      <div className="cursor-pointer gap-2" onClick={() => setDialogBoxOpen(true)}>
        <AddLocationAltIcon /> Add address
      </div>
    </div>
  )
})

export const UserInfo: React.FC<IUserInfo> = memo(
  ({ user }) => {

    const useDispatch = useAppDispatch()
    const { address } = useAppSelector(state => state.addressState)

    const [dialogBoxOpen, setDialogBoxOpen] = useState(false)
    const [selectedAddressId, setSelectedAddressId] = useState<string>("")

    const handleDeleteAddress = useDeleteUserAddress()

    const [handleSubmit] = useEditUserAddress()

    const handleUserAddressEvents = useCallback((addressId: string, isEditEvent: boolean) => {
      if (isEditEvent) {
        setSelectedAddressId(addressId)
        setDialogBoxOpen(true)
      }
      else {
        handleDeleteAddress(addressId)
      }
    }, [])


    const handleSubmitEditForm = (data: IAddress) => {
      if (selectedAddressId !== "") {
        handleSubmit(data, false)
        setSelectedAddressId('')
      }
      else {
        handleSubmit(data, true)
      }
      setDialogBoxOpen(false)
    }

    useEffect(() => {
      useDispatch(fetchUserAddress())
    }, [])


    console.log(user);

    return (
      <div id={'userInfo'}>
        <CardContianer title="">
          <h4 className='text-lg font-semibold font-head'>User info</h4>
          <div className="flex md:flex-row gap-3 md:gap-6 items-center w-[90%] max-w-[600px] mt-5">
            <UserAvatar userName={user.userName || 'ck'} src={user.avatar} />
            {user.email && <UserEmail email={user.email} userName={user.userName || 'ck'} />}
          </div>
          <h4 className='text-lg font-semibold mt-7 font-head'>Address</h4>
          <div className="flex flex-col md:flex-row gap-4 md:gap-7 mt-5">
            {
              address.map((v, i) => {
                return (
                  <UserAddress {...v} key={i} handleEvents={handleUserAddressEvents} />
                )
              })
            }
            <AddUserAddress setDialogBoxOpen={setDialogBoxOpen} />

            <DialogBox open={dialogBoxOpen} setOpen={setDialogBoxOpen} title='Change address' btns={false} >
              <UserAddressEditForm handleSubmit={handleSubmitEditForm} address={address.filter(addr => addr?._id === selectedAddressId)[0]} />
            </DialogBox>
          </div>
        </CardContianer>
      </div>
    )
  }
)
