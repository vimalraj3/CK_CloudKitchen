import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { CloseIconBtn } from '../../../utils/IconBtn/CloseIconBtn'
import { setClear } from '../../../../state/slices/FilterAndSearch.slice'

export const ClearFilters = () => {

    const dispatch = useAppDispatch()
    const { canClear } = useAppSelector(state => state.filterAndSearchState)
    const handleClear = () => {
        dispatch(setClear())
    }
    return (
        <div>
            {
                canClear && (
                    <div className='bg-primary rounded-[4px] flex py-1.5 px-1 items-center justify-between'>
                        <p className='text-white font-semibold font-para mx-2'>{`Clear`}</p>
                        <div onClick={() => handleClear()}>
                            <CloseIconBtn className='text-white' />
                        </div>
                    </div>)
            }
        </div>
    )
}
