import React from 'react'
import { AddRestaurantForm } from '../../../Forms/RestaurantForms/AddRestaurantForm'
import { AddRestaurantFormValidationType } from '../../../../types/Restaurant.types'


const AddResForm = () => {

    const handleSubmit = (data: AddRestaurantFormValidationType) => {
        console.log(data);
    }


    return (
        <div className='w-[90%] md:w-[50%] max-w-md mx-auto mt-7 md:mt-10'>
            <AddRestaurantForm handleSubmit={handleSubmit} />
        </div>
    )
}

export default AddResForm