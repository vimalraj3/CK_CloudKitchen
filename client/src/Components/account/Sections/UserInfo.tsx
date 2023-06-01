import { IAddress, UserSession } from '../../../types/user.types'
import { Form, Input, PasswordInput } from '../../utils/Form'
import * as yup from 'yup'
import { Text } from '../../utils/Text'
import EditIcon from '@mui/icons-material/Edit'
import Avatar from '@mui/material/Avatar'
import { CardContianer } from '../Cards/CardContianer'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { fetchUserAddress } from '../../../state/slices/user.slice'

import { DialogBox } from '../../utils/DialogBox'

interface IUserInfo {
  user: UserSession
}

interface FormFields {
  email: string
  password: string
  repassword: string
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters'),
  repassword: yup
    .string()
    .required('New Password is required')
    .min(5, 'Password must be at least 5 characters'),
})

const UserAvatar = memo(
  ({ userName }: { userName: string }) => {
    return (
      <>
        <Avatar
          sx={{
            bgcolor: '#ff8e7b',
            width: { xs: '50px', md: '75px' },
            height: { xs: '50px', md: '75px' },
            fontSize: { xs: '40px', md: '51px' },
          }}
        >
          {userName[0]}
        </Avatar>
      </>
    )
  }
)

const UserInfoForm: React.FC<IUserInfo> = ({ user }) => {
  const handleSubmit = (data: FormFields) => {
    console.log(data)
  }
  return (
    <Form<FormFields> onSubmit={handleSubmit} schema={schema}>
      {({ register, errors }) => {
        return (
          <>
            <div>
              <Input type="email" value={user.email} {...register('email')} />
              {errors.email && (
                <Text
                  message={errors.email.message as string}
                  color="#EF4444"
                  size="sm"
                />
              )}
            </div>
            <div className="">
              <PasswordInput {...register('password')} />
              {errors.password && (
                <Text
                  message={errors.password.message as string}
                  color="#EF4444"
                  size="sm"
                />
              )}
            </div>
            <div className="">
              <PasswordInput
                {...register('repassword')}
                name="repassword"
                label="New Password"
              />
              {errors.repassword && (
                <Text
                  message={errors.repassword.message as string}
                  color="#EF4444"
                  size="sm"
                />
              )}
            </div>
            <Input
              type="submit"
              value={'Edit'}
              role="button"
              style={{
                cursor: 'pointer',
              }}
            />
          </>
        )
      }}
    </Form>
  )
}


interface IUserEmail {
  email: string
  userName: string
}

const UserEmail: React.FC<IUserEmail> = memo(
  ({ email, userName }) => {
    return (
      <div>
        <h4 className='text-lg font-medium font-head'>{email}</h4>
        <p className='text-md font-thin capitalize'>{userName}</p>
      </div>
    )
  }
)


type IUserAddress = IAddress & {
  editAddress: (addressId: string) => void
}

const UserAddress: React.FC<IUserAddress> = memo(
  ({ houseNo, streetName, city, state, addressName, zipCode, editAddress, _id }) => {
    return (
      <div className='bg-[#F8F8F8] aspect-video p-3 md:p-5 w-[90%] max-w-[250px] rounded-lg'>
        <div className="flex items-center gap-2">
          <h5 className='text-lg font-medium font-head capitalize'>{`${addressName} `}</h5>
          <div onClick={() => { editAddress(_id) }}>
            <EditIcon fontSize='small' className='cursor-pointer' />
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


export const UserInfo: React.FC<IUserInfo> = memo(
  ({ user }) => {

    const useDispatch = useAppDispatch()
    const userAddress = useAppSelector(state => state.userState.data.address)
    const [dialogBoxOpen, setDialogBoxOpen] = useState(false)

    const editAddress = useCallback((addressId: string) => {
      // * show dialog box to edit address
      setDialogBoxOpen(true)
      console.log('edit address', addressId);
    }, [])

    useEffect(() => {
      useDispatch(fetchUserAddress())
      console.log('fecting user address');
      console.log(userAddress);
    }, [])

    return (
      <CardContianer title="">
        <h4 className='text-lg font-semibold font-head'>User info</h4>
        <div className="flex md:flex-row gap-5 md:gap-6 items-center w-[90%] max-w-[600px] mt-5">
          <UserAvatar userName={user.userName || 'ck'} />
          {user.email && <UserEmail email={user.email} userName={user.userName || 'ck'} />}
        </div>
        <h4 className='text-lg font-semibold mt-7 font-head'>Address</h4>
        <div className="flex flex-col md:flex-row gap-4 md:gap-7 mt-5">
          {
            userAddress.map((v, i) => {
              return (
                <UserAddress {...v} key={i} editAddress={editAddress} />
              )
            })
          }
        </div>

        {
          dialogBoxOpen && (
            <DialogBox open={dialogBoxOpen} setOpen={setDialogBoxOpen} title='Change address' >
              <p className='min-w-[450px]'>Hlleo ada</p>
            </DialogBox>
          )
        }
      </CardContianer>
    )
  }
)
