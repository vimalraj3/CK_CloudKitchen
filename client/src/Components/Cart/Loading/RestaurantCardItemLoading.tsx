import { Skeleton } from "@mui/material"
import React from "react"

export const RestaurantCardItemLoading: React.FC = React.memo(
    () => {
        return (
            <>
                <div className="flex flex-col md:flex-row items-center justify-between mt-2 gap-2 bg-secondary py-4 px-6 rounded-lg">
                    <div className="flex items-center gap-2">
                        <Skeleton variant="rounded" height={'4rem'} width={'100%'} animation='wave' />
                        <div className="w-[150px] md:w-[250px] ml-2 ">
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation='wave' />
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation='wave' />
                        </div>
                    </div>

                    <Skeleton variant="rectangular" width={210} height={40} />
                </div>
            </>
        )
    }
)