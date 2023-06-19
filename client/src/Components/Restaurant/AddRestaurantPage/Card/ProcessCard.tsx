import React, { useId } from 'react'
import { processSteps } from '../../../../data/restaurant.json'
function ProcessCard() {
    return (
        <div className='flex flex-col md:flex-row justify-between w-[100%] md:w-[100%] lg:w-[70%] mx-auto mt-4 md:mt-10 gap-4 md:gap-4 lg:gap-8 flex-nowarp'>
            {
                processSteps.map(({ step, imageUrl, title, description }) => {
                    return (
                        <div className='bg-[#fff] min-w-[200px] w-[100%] max-w-[300px] aspect-[3/4] rounded-lg py-2 px-4 flex flex-col justify-center items-center gap-2' key={useId()}>
                            <div className="w-[75px] rounded-full bg-secondary py-3 px-3">
                                <img src={imageUrl} alt={title + "img"} />
                            </div>
                            <h5 className='font-head text-lg '>{step}</h5>
                            <p className='font-para text-sm text-center text-gray-500 '>{title}</p>
                            <p className='font-para text-gray-400 text-xs text-center'>{description}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProcessCard