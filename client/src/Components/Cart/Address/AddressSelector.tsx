import { useState } from 'react'
import { AddUserAddress, UserAddress } from '../../account/Sections/UserInfo'
import { DialogBox } from '../../utils/DialogBox'
import { UserAddressEditForm } from '../../Forms/AddressForms/UserAddressEditForm'
import { IAddress } from '../../../types/user.types'
import { useAppSelector, useEditUserAddress } from '../../../hooks'
import { Skeleton } from '@mui/material'
import { useCheckout } from '../../../hooks/useCheckout'

export const AddressSelector = () => {
    const [dialogBoxOpen, setDialogBoxOpen] = useState(false)
    const { address } = useAppSelector(state => state.addressState)

    const { selectedAddressId, setSelectedAddressId } = useCheckout()

    const [handleSubmit] = useEditUserAddress()

    const handleSubmitEditForm = (data: IAddress) => {
        if (selectedAddressId !== "") {
            handleSubmit(data, false)
            setSelectedAddressId('')
        }
        else {
            handleSubmit(data, true)
        }
        setDialogBoxOpen(false)
    }

    return (
        <>
            {
                !address ? (
                    <div className='w-[100%] rounded-lg mt-2'>
                        <Skeleton variant="text" className='md:text-2xl text-md' />
                        <div className="flex gap-8 mt-5 flex-wrap">
                            {
                                Array(4).fill('sdfs').map((v, i) => {
                                    return (
                                        <Skeleton variant="rounded" height={150} key={i} className='aspect-video p-3 md:p-5 w-[90%] max-w-[250px] rounded-lg h-[350px]' />
                                    )
                                })
                            }
                        </div>
                    </div>
                ) : (
                    <div className='w-[100%] rounded-lg mt-2'>
                        <h3 className='font-head font-semibold md:text-2xl text-md'>Select your Address</h3>
                        <div className="flex gap-5 md:gap-8 mt-5 flex-wrap justify-center">
                            {
                                address.map((v, i) => {
                                    return (
                                        <UserAddress {...v} key={i} selector handleSelector={setSelectedAddressId} selectedId={selectedAddressId} />
                                    )
                                })
                            }
                            <AddUserAddress setDialogBoxOpen={setDialogBoxOpen} />
                        </div>
                        <DialogBox open={dialogBoxOpen} setOpen={setDialogBoxOpen} title='Change address' btns={false} >
                            <UserAddressEditForm handleSubmit={handleSubmitEditForm} />
                        </DialogBox>
                    </div>
                )
            }
        </>
    )
}
