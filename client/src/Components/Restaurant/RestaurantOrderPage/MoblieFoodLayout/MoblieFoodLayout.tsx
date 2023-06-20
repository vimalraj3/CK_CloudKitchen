import React from 'react'
import FoodCardCon from '../FoodCards/FoodCard';
import { Reviews } from '../Reviews/Reviews';
import { Description } from '../Desciption/Description';
export const MoblieFood = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className='w-[100%] mt-4 flex flex-col gap-4 px-4'>
            <section>
                <h4 className='text-lg font-head font-semibold my-4'>
                    Menu
                </h4>
                <FoodCardCon />
            </section>
            <section>
                <h4 className='text-lg font-head font-semibold my-4'>
                    Reviews
                </h4>
                <Reviews />
            </section>
            <section>
                <h4 className='text-lg font-head font-semibold my-4'>
                    Description
                </h4>
                <Description />
            </section>
        </div >
    );
}