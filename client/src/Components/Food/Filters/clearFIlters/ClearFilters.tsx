import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { CloseIconBtn } from '../../../UI/IconBtn/CloseIconBtn'
import { setClear } from '../../../../state/slices/food.slice'

export const ClearFilters = () => {
  const dispatch = useAppDispatch()
  const { canClear } = useAppSelector((state) => state.foodState)
  const handleClear = () => {
    dispatch(setClear())
  }
  return (
    <>
      {canClear && (
        <div
          className="bg-primary rounded-[4px] flex py-[.45rem] px-1 items-center justify-between"
          onClick={() => handleClear()}
          role="button"
          aria-label="Clear"
        >
          <p className="text-white font-semibold font-para mx-2">{`Clear`}</p>
          <div>
            <CloseIconBtn className="text-white" />
          </div>
        </div>
      )}
    </>
  )
}
