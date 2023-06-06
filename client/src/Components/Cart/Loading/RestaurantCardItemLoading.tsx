import React from "react"

export const RestaurantCardItemLoading: React.FC = React.memo(
    () => {
        return (
            <>
                <div className="flex flex-col md:flex-row items-center justify-between mt-2 gap-2 bg-secondary py-4 px-6 rounded-lg">
                    <div className="flex items-center gap-2">
                        <div className="w-16 h-16 rounded-md skeleton" />
                        <div className="w-[150px] md:w-[250px] ml-2 ">
                            <p className="skeleton skeleton-text ">&#160;</p>
                            <p className="skeleton skeleton-text">&#160;</p>
                        </div>
                    </div>

                    <div className="w-[150px] h-13 md:h-15 mt-3 md:mt-0 flex items-center">
                        <p className="skeleton w-[100%] h-[100%]">&#160;</p>
                    </div>
                </div>
            </>
        )
    }
)