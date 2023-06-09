import React from 'react'
import { AddRestaurantForm } from '../../../Forms/RestaurantForms/AddRestaurantForm'
import { AddRestaurantFormValidationType } from '../../../../types/Restaurant.types'
import { useAppDispatch } from '../../../../hooks'
import { addRestaurant } from '../../../../state/slices/restaurant.slice'
import { useNavigate } from 'react-router-dom'
import { IShowToast } from '../../../../types/showToast.types'



const AddResForm: React.FC = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (data: AddRestaurantFormValidationType) => {
        const formData = new FormData()
        formData.append('close', data.close.toString())
        formData.append('open', data.open.toString())
        formData.append('restaurantName', data.restaurantName)
        formData.append('restaurantAddress', data.restaurantAddress)
        formData.append('restaurantCity', data.restaurantCity)
        formData.append('restaurantPhone', data.restaurantPhone)
        formData.append('restaurantDescription', data.restaurantDescription)
        formData.append('restaurantRegion', data.restaurantRegion)
        formData.append('restaurantState', data.restaurantState)
        formData.append('restaurantZip', data.restaurantZip)
        formData.append("priceRange", data.priceRange.toString())
        formData.append('restaurantImage', data.restaurantImage[0])


        const restaurant = await dispatch(addRestaurant(formData))
        if (addRestaurant.fulfilled.match(restaurant)) {
            console.log(restaurant);
            navigate(`/restaurant/${restaurant.payload._id}`)
        }
    }


    return (
        <div className='w-[90%] md:w-[50%] max-w-md mx-auto mt-7 md:mt-10'>
            <AddRestaurantForm handleSubmit={handleSubmit} />
        </div>
    )
}

export default AddResForm