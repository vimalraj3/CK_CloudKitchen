import { Form, Input } from '../../UI/Form'
import * as yup from 'yup'
import { Text } from '../../UI/Text'
import { IAddress } from '../../../types/user.types'

type UserAddressFormFields = IAddress

interface IUserAddressEditForm {
  address?: IAddress
  handleSubmit: (data: UserAddressFormFields) => void
}

const defaultAddress: Omit<IAddress, '_id'> = {
  addressName: '',
  houseNo: '',
  streetName: '',
  area: '',
  city: '',
  state: '',
  zipCode: '',
}

const userEditFormSchema = yup.object().shape({
  addressName: yup.string().required('address name is required'),
  houseNo: yup.string().required('houseNo is required'),
  streetName: yup.string().required('street name is required'),
  area: yup.string().required('area is required'),
  city: yup.string().required('city name is required'),
  state: yup.string().required('state name is required'),
  zipCode: yup
    .string()
    .required('Zip code is required')
    .matches(/^\d{6}$/, 'Invalid zip code'),
})

export const UserAddressEditForm: React.FC<IUserAddressEditForm> = ({
  address,
  handleSubmit,
}) => {
  return (
    <Form<UserAddressFormFields>
      defaultValues={address?.addressName ? address : defaultAddress}
      onSubmit={handleSubmit}
      schema={userEditFormSchema}
    >
      {({ register, errors }) => {
        return (
          <>
            <div>
              <Input
                aria-label={'address name'}
                label="Address name"
                {...register('addressName')}
              />
              {errors.addressName && (
                <Text
                  message={errors.addressName.message as string}
                  color="#EF4444"
                  size="sm"
                />
              )}
            </div>
            <div>
              <Input
                aria-label={'address name'}
                label="House no"
                {...register('houseNo')}
              />
              {errors.houseNo && (
                <Text
                  message={errors.houseNo.message as string}
                  color="#EF4444"
                  size="sm"
                />
              )}
            </div>
            <div>
              <Input
                aria-label={'street name'}
                label="Street name"
                {...register('streetName')}
              />
              {errors.streetName && (
                <Text
                  message={errors.streetName.message as string}
                  color="#EF4444"
                  size="sm"
                />
              )}
            </div>
            <div>
              <Input aria-label={'area '} label="area" {...register('area')} />
              {errors.area && (
                <Text
                  message={errors.area.message as string}
                  color="#EF4444"
                  size="sm"
                />
              )}
            </div>
            <div>
              <Input aria-label={'city'} label="city" {...register('city')} />
              {errors.city && (
                <Text
                  message={errors.city.message as string}
                  color="#EF4444"
                  size="sm"
                />
              )}
            </div>
            <div>
              <Input
                aria-label={'state'}
                label="state"
                {...register('state')}
              />
              {errors.state && (
                <Text
                  message={errors.state.message as string}
                  color="#EF4444"
                  size="sm"
                />
              )}
            </div>
            <div>
              <Input
                aria-label={'Zip code'}
                label="Zip code"
                {...register('zipCode')}
              />
              {errors.zipCode && (
                <Text
                  message={errors.zipCode.message as string}
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
