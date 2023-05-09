import { UserSession } from '../../types/user.types'
import { Form, Input, PasswordInput } from '../utils/Form'
import * as yup from 'yup'
import { Text } from '../utils/Text'
import EditIcon from '@mui/icons-material/Edit'
import Avatar from '@mui/material/Avatar'
import { CardContianer } from './CardContianer'

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

const UserAvatar = ({ userName }: { userName: string }) => {
  return (
    <div className="relative">
      <Avatar
        sx={{
          bgcolor: '#ff8e7b',
          width: 170,
          height: 170,
          fontSize: '85px',
        }}
      >
        {userName[0]}
      </Avatar>
      <div className="absolute right-2 bottom-1">
        <div className="flex justify-center items-center aspect-square w-10 rounded-full bg-[#f8f8f8] cursor-pointer">
          <EditIcon />
        </div>
      </div>
    </div>
  )
}

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

export const UserInfo: React.FC<IUserInfo> = ({ user }) => {
  return (
    <CardContianer title="User Info">
      <div className="flex flex-col md:flex-row justify-between items-center w-[90%] max-w-[600px] mx-auto">
        <UserAvatar userName={user.userName || 'ck'} />
        <div className="md:mt-0 mt-3">
          <UserInfoForm user={user} />
        </div>
      </div>
    </CardContianer>
  )
}
