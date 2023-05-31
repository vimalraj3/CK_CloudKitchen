import { UserSession } from '../../../types/user.types'
import { Form, Input, PasswordInput } from '../../utils/Form'
import * as yup from 'yup'
import { Text } from '../../utils/Text'
import EditIcon from '@mui/icons-material/Edit'
import Avatar from '@mui/material/Avatar'
import { CardContianer } from '../Cards/CardContianer'
import React, { memo } from 'react'

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
const UserEmail: React.FC<IUserEmail> = ({ email, userName }) => {
  return (
    <div>
      <h4 className='text-lg font-medium'>{email}</h4>
      <p className='text-sm font-thin capitalize'>{userName}</p>
    </div>
  )
}

export const UserInfo: React.FC<IUserInfo> = ({ user }) => {
  return (
    <CardContianer title="">
      <h4 className='text-lg font-semibold'>User info</h4>
      <div className="flex md:flex-row gap-5 md:gap-6 items-center w-[90%] max-w-[600px] mt-2">
        <UserAvatar userName={user.userName || 'ck'} />
        <div className="">
          {user.email && <UserEmail email={user.email} userName={user.userName || 'ck'} />}
        </div>
      </div>
    </CardContianer>
  )
}
