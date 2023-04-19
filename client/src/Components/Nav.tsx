import lightLogo from '../assets/logos/ligthLogo.png'
import { useState } from 'react'

const Nav: React.FC<any> = () => {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
    return (
        <header className='flex justify-between mx-auto py-2 px-10 items-center relative max-w-[1200px]'>
            <h1 className='LogoName z-20'>
                <img src={lightLogo} alt="light_logo" />
            </h1>

            <div className="md:flex justify-between items-center text-[#fff] hidden">
                <button className='mr-5 text-xl'>Add cloud kitchen</button>
                <button className='mr-5 text-xl'>Log in</button>
                <button className='text-xl'>Sign up</button>
            </div>
            <div className="flex flex-col justify-between w-[24px] h-[18px] overflow-hidden md:hidden z-20 relative" onClick={() => { setIsNavOpen(prev => prev = !prev) }}>
                <div className={`w-[100%] h-[2px] my-0.5 absolute bg-white duration-500 ease-in-out transition-all ${isNavOpen ? "top-1.5 rotate-[135deg]" : "rotate-0"}`}></div>
                <div className={`w-[100%] h-[2px] my-0.5 absolute top-1.5 bg-white duration-700  ease-in-out transition-all ${isNavOpen ? "left-[-60px]" : "left-0"}`}></div>
                <div className={`w-[100%] h-[2px] my-0.5 absolute  bg-white duration-500 ease-in-out transition-all ${isNavOpen ? "top-1.5 -rotate-[135deg]" : "rotate-0 top-3"}`}></div>
            </div>

            <div className={`absolute w-[100%] rounded-b-lg glassmorphism left-0 md:hidden transition-all duration-700 ease-in-out ${isNavOpen ? "top-0" : "-top-[500%]"}`}>
                <div className="flex flex-col justify-between items-center text-[#fff] mt-[3rem] py-3">
                    <button className='py-2.5 text-xl' onClick={() => { setIsNavOpen(prev => prev = !prev) }}>Add cloud kitchen</button>
                    <button className='py-2.5 text-xl' onClick={() => { setIsNavOpen(prev => prev = !prev) }}>Log in</button>
                    <button className='py-2.5 text-xl' onClick={() => { setIsNavOpen(prev => prev = !prev) }}>Sign up</button>
                </div>
            </div>
        </header >
    )
}
export default Nav