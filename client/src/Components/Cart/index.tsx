import React, { useEffect } from 'react'
import Nav from '../Nav'
import Main from './Card'
import { fetchUserAddress } from '../../state/slices/address.slice'
import { useAppDispatch } from '../../hooks'
import { fetchCartByUserId } from '../../state/slices/cart.slice'

const index: React.FC = () => {

    const dispatch = useAppDispatch()
    useEffect(() => {

        dispatch(fetchCartByUserId())
        dispatch(fetchUserAddress())
    }, [])

    return (
        <div>
            <Nav bgColor='#f8f8f8' dark />
            <Main />
        </div>
    )
}

export default index