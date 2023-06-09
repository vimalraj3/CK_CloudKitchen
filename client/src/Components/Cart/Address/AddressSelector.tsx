import React, { useCallback, useState } from 'react'
import { AddUserAddress, UserAddress } from '../../account/Sections/UserInfo'
import { DialogBox } from '../../utils/DialogBox'
import { UserAddressEditForm } from '../../Forms/AddressForms/UserAddressEditForm'
import { IAddress } from '../../../types/user.types'
import { useAppSelector, useEditUserAddress } from '../../../hooks'

export const AddressSelector = () => {
    const [dialogBoxOpen, setDialogBoxOpen] = useState(false)
    const { address } = useAppSelector(state => state.addressState)

    const [selectedAddressId, setSelectedAddressId] = useState<string>("")

    const [handleSubmit] = useEditUserAddress()

    const handleUserAddressEvents = useCallback((addressId: string, isEditEvent: boolean) => {
        if (isEditEvent) {
            setSelectedAddressId(addressId)
            setDialogBoxOpen(true)
        }
    }, [])


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
        <div className='w-[100%] py-2 px-2 bg-secondary rounded-lg'>
            <div className="">
                <h3 className='font-head font-semibold md:text-lg text-md'>Select your Address</h3>
            </div>
            <div className="">
                {
                    address.map((v, i) => {
                        return (
                            <UserAddress {...v} key={i} handleEvents={handleUserAddressEvents} />
                        )
                    })
                }
                <AddUserAddress setDialogBoxOpen={setDialogBoxOpen} />
            </div>
            <DialogBox open={dialogBoxOpen} setOpen={setDialogBoxOpen} title='Change address' btns={false} >
                <UserAddressEditForm handleSubmit={handleSubmitEditForm} address={address.filter(addr => addr?._id === selectedAddressId)[0]} />
            </DialogBox>

        </div>
    )
}
