import React from 'react'
import { IShowToast } from '../types/showToast.types'


interface IProps {
    showToast: IShowToast
}
function Products({ showToast }: IProps) {
    return (
        <div>Products</div>
    )
}

export default Products