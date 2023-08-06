import { Form, Input } from '../../UI/Form'
import * as yup from 'yup'
import { Text } from '../../UI/Text'
import { memo } from 'react'

interface UserFormFields {
  email: string
  userName: string
}

interface IUserEditForm extends UserFormFields {
  handleSubmit: (data: UserFormFields) => void
}

const userEditFormSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  userName: yup
    .string()
    .required('user name is required')
    .min(5, 'Password must be at least 5 characters'),
})

export const UserEditForm: React.FC<IUserEditForm> = memo(
  ({ email, userName, handleSubmit }) => {
    return (
      <Form<UserFormFields>
        defaultValues={{ email, userName }}
        onSubmit={handleSubmit}
        schema={userEditFormSchema}
      >
        {({ register, errors }) => {
          return (
            <>
              <div>
                <Input type="email" label="Email" {...register('email')} />
                {errors.email && (
                  <Text
                    message={errors.email.message as string}
                    color="#EF4444"
                    size="sm"
                  />
                )}
              </div>
              <div>
                <Input type="text" label="Username" {...register('userName')} />
                {errors.userName && (
                  <Text
                    message={errors.userName.message as string}
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
)
