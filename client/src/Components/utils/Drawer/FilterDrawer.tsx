import React, { Children } from 'react'
import { Drawer } from './Drawer'
import { Btn } from './../Btn'

export const FilterDrawer = () => {
    return (
        <div>
            <Drawer anchor={'right'} handleListClick={() => {
                console.log()
            }} lists={[[{ name: 'vimal', value: 'vimalr', checked: false }]]} checkBox >
                <Btn label={"Rating 4.0+"} />
            </Drawer>
        </div>
    )
}


// TODO customized the filter btns