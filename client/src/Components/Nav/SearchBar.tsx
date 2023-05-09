import React, { PropsWithChildren, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
interface ICity {
    setValue: (name: string) => void,
    isOpen: boolean
    region: string
}

const area = [{
    name: "puducherry"
},
{
    name: "villupuram"
}]


const City: React.FC<ICity> = ({ setValue, isOpen, region }) => {
    return (
        <ul className={`text-[#000] bg-[#fff] left-0 mt-4 p-4 rounded-md md:rounded-xl overflow-hidden absolute top-[100%] w-[100%] ${isOpen ? "block" : "hidden"} `}>
            {
                area.map(({ name }, i) => {
                    return (
                        <li key={i} className="hover:bg-[#f2f2f2] p-2 w-[100%] text-center" onClick={(event) => { setValue(name) }}>
                            <span className="capitalize">{name}</span>
                        </li>
                    )
                })}
        </ul>
    )
}

export const SearchBar = ({ region }: { region: string }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>(region);
    return (
        <section className=" md:h-[50px] w-[80%] max-w-[500px] md:mt-5 md:bg-[#fff] text-[#000] rounded-lg md:rounded-xl p-[6px] md:p-[12px] flex justify-center items-center shadow-inner flex-col md:flex-row font-moutserrat  ">
            <div className={`w-[100%] max-w-[250px] h-[50px] relative ${isOpen ? 'active' : ""}`} onClick={() => { setIsOpen(prev => prev = !prev) }}>
                <div className="flex justify-between items-center bg-[#fff] px-3 md:py-0 h-[90%] md:h-[100%] rounded-md md:rounded-none w-[100%] md:p-4">
                    <i className="fa-solid fa-location-dot" style={{ color: " #ff7e8b" }}></i>
                    <span className='capitalize'>{value}</span>
                    <i className={`fa-solid fa-chevron-down  ${isOpen ? 'rotate' : "reverse-rotate"}`} style={{ color: "#ff7e8b" }}></i>
                </div>
                <City setValue={setValue} isOpen={isOpen} region={region} />
            </div>

            <div className="w-[100%] max-w-[250px] bg-[#fff] mt-4 md:mt-0 rounded-md md:rounded-[0] flex justify-evenly items-center px-0 h-[45px] md:h-[50px]">
                <i className="fa-solid fa-magnifying-glass text-[#ff7e8b] "></i>
                <input type="text" className='px-4 w-[80%]  h-[90%] hover:outline-none focus:outline-none' placeholder='Search for cloud kitchen' />
            </div>
        </section>
    )
}
