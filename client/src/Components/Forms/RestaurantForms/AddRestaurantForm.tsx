import { Form, Input, TextArea } from "../../utils/Form"
import * as yup from 'yup'
import { Text } from '../../utils/Text'
import { AddRestaurantFormValidationType } from '../../../types/Restaurant.types'
import { FileInput } from "../../utils/Form/FileInput/FileInput"
import { TimePicker } from "../../utils/Form/DateTimePicker/TimePicker"

type RestaurantFormFields = AddRestaurantFormValidationType

interface IUserAddressEditForm {
    restaurant?: AddRestaurantFormValidationType
    handleSubmit: (data: AddRestaurantFormValidationType) => void
}


const RestaurantSchema = yup.object().shape({
    restaurantName: yup.string().required('Restaurant name is required'),
    restaurantDescription: yup
        .string()
        .required('Restaurant description is required'),
    restaurantImage: yup
        .mixed()
        .test('required', 'Please select a file', value => (value as []).length > 0),
    restaurantAddress: yup
        .string()
        .required('Restaurant address is required'),
    restaurantRegion: yup.string().required("Restaurant region   is required"),
    restaurantCity: yup.string().required("City is required"),
    restaurantState: yup.string().required("state name is required"),
    restaurantZip: yup.string().required("Zip code is required").matches(/^\d{6}$/, 'Invalid zip code'),
    restaurantPhone: yup.string().required("Phone number is required").matches(/^\d{10}$/, 'Invalid Phone number'),
    open: yup.mixed().required("Open timing is required"),
    close: yup.mixed().required("close timing is required"),
})

const defaultRestaurant: AddRestaurantFormValidationType = {
    restaurantName: '',
    restaurantDescription: '',
    restaurantImage: [],
    restaurantAddress: '',
    restaurantRegion: '',
    restaurantState: '',
    restaurantCity: '',
    restaurantZip: '',
    restaurantPhone: '',
    open: new Date,
    close: new Date,
}

export const AddRestaurantForm: React.FC<IUserAddressEditForm> = ({ restaurant, handleSubmit }) => {


    return (
        <Form<RestaurantFormFields> defaultValues={restaurant?.restaurantCity ? restaurant : defaultRestaurant} onSubmit={handleSubmit} schema={RestaurantSchema}>
            {({ register, errors }) => {
                return (
                    <>
                        <div>
                            <Input aria-label={'Restaurant name'} label="Restaurant name"  {...register('restaurantName')} />
                            {errors.restaurantName && (
                                <Text
                                    message={errors.restaurantName.message as string}
                                    color="#EF4444"
                                    size="sm"
                                />
                            )}
                        </div>
                        <div>
                            <TextArea
                                aria-label={'restaurant Description  '} label="Restaurant description"   {...register('restaurantDescription')}
                            />
                            {errors.restaurantDescription && (
                                <Text
                                    message={errors.restaurantDescription.message as string}
                                    color="#EF4444"
                                    size="sm"
                                />
                            )}
                        </div>
                        <div>
                            <Input aria-label={'Phone Number'} label="Phone number"  {...register('restaurantPhone')} />
                            {errors.restaurantPhone && (
                                <Text
                                    message={errors.restaurantPhone.message as string}
                                    color="#EF4444"
                                    size="sm"
                                />
                            )}
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <TimePicker aria-label={'Open timing'} label="Open timing"  {...register('open')} />
                            {errors.open && (
                                <Text
                                    message={errors.open.message as string}
                                    color="#EF4444"
                                    size="sm"
                                />
                            )}
                            <TimePicker aria-label={'Close timing'} label="Close timing"  {...register('close')} />
                            {errors.close && (
                                <Text
                                    message={errors.close.message as string}
                                    color="#EF4444"
                                    size="sm"
                                />
                            )}
                        </div>
                        <div>
                            <FileInput aria-label={'restaurant image  '} label="Restaurant image"   {...register('restaurantImage')} />
                            {errors.restaurantImage && (
                                <Text
                                    message={errors.restaurantImage.message as string}
                                    color="#EF4444"
                                    size="sm"
                                />
                            )}
                        </div>
                        <div>
                            <Input aria-label={'Street'} label="Street name"   {...register('restaurantAddress')} />
                            {errors.restaurantAddress && (
                                <Text
                                    message={errors.restaurantAddress.message as string}
                                    color="#EF4444"
                                    size="sm"
                                />
                            )}
                        </div>
                        <div>
                            <Input aria-label={'City'} label="City"  {...register('restaurantCity')} />
                            {errors.restaurantCity && (
                                <Text
                                    message={errors.restaurantCity.message as string}
                                    color="#EF4444"
                                    size="sm"
                                />
                            )}
                        </div>
                        <div>
                            <Input aria-label={'Region'} label="Region"  {...register('restaurantRegion')} />
                            {errors.restaurantRegion && (
                                <Text
                                    message={errors.restaurantRegion.message as string}
                                    color="#EF4444"
                                    size="sm"
                                />
                            )}
                        </div>
                        <div>
                            <Input aria-label={'State'} label="State"  {...register('restaurantState')} />
                            {errors.restaurantState && (
                                <Text
                                    message={errors.restaurantState.message as string}
                                    color="#EF4444"
                                    size="sm"
                                />
                            )}
                        </div>
                        <div>
                            <Input aria-label={'Zip code'} label="Zip code"  {...register('restaurantZip')} />
                            {errors.restaurantZip && (
                                <Text
                                    message={errors.restaurantZip.message as string}
                                    color="#EF4444"
                                    size="sm"
                                />
                            )}
                        </div>

                        <Input
                            type="submit"
                            value={'Create restaurant'}
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