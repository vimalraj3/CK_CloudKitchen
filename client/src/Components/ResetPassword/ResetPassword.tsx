import React from 'react'
import Container from '../Container'
import { Form, Input, PasswordInput } from '../utils/Form'
import Nav from '../Nav'
import * as yup from 'yup'
import { Text } from '../utils/Text'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { resetPasswordApi } from '../../state/slices/user.slice'
import { IShowToast } from '../../types/showToast.types'

interface IResetPassword {
  showToast: IShowToast
}

export const ResetPassword = ({ showToast }: IResetPassword) => {
  const navigate = useNavigate()
  const { token } = useParams()
  const appDispatch = useAppDispatch()
  const schema = yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .min(5, 'Password must be at least 5 characters'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .min(5, 'Confirm Password must be at least 5 characters')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })

  const onSubmit = async (data: any) => {
    if (token) {
      const resetpassword = await appDispatch(
        resetPasswordApi({ token, password: data.password })
      )
      if (
        resetPasswordApi.fulfilled.match(resetpassword) &&
        resetpassword.payload
      ) {
        showToast(resetpassword.payload.message, 'success')
        navigate(-1)
      } else {
        resetpassword.payload &&
          showToast(resetpassword.payload?.message, 'error')
      }
    }
  }

  return (
    <>
      <Nav dark={true} bgColor="#f8f8f8" />
      <Container>
        <div className="max-w-sm mx-auto ">
          <Text
            size="lg"
            message="Reset password"
            className="mb-4 font-cardo"
          />
          <Form<{ password: string; confirmPassword: string }>
            onSubmit={onSubmit}
            schema={schema}
          >
            {({ register, errors }) => (
              <>
                <div>
                  <PasswordInput
                    {...register('password', {
                      required: true,
                      minLength: 8,
                    })}
                  />
                  {errors.password && (
                    <Text
                      message={errors.password.message as string}
                      color="#EF4444"
                      size="sm"
                    />
                  )}
                </div>
                <div>
                  <PasswordInput
                    label="Confirm Password"
                    {...register('confirmPassword', {
                      required: true,
                      minLength: 8,
                    })}
                  />
                  {errors.confirmPassword && (
                    <Text
                      message={errors.confirmPassword.message as string}
                      color="#EF4444"
                      size="sm"
                    />
                  )}
                </div>
                <Input
                  type="submit"
                  role="button"
                  style={{
                    cursor: 'pointer',
                  }}
                />
              </>
            )}
          </Form>
        </div>
      </Container>
    </>
  )
}
