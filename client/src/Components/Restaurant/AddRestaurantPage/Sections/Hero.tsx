import { Button } from '@mui/material'
import Container from '../../../Container'
import Nav from '../../../Nav'
function Hero() {
    return (
        <div className='relative  h-[40vh] w-[100%] text-white'>
            <div className="w-[100%] h-[100%] absolute -z-30 resimg bg-no-repeat bg-cover bg-top"></div>
            <div className="w-[100%] h-[100%] bg-black opacity-30 absolute inset-0 -z-10"></div>
            <div className="w-[100%] md:w-[90%]  h-[100%] mx-auto max-w-[1200px]">
                <Nav />
                <Container>
                    <div className="flex items-center justify-center">
                        <div className="">
                            <h2 className='font-head text-md text-center md:text-left font-bold md:text-4xl md:font-semibold'>Register your Cloud Kitchen on <span className='text-primary font-bold'> CK</span></h2>
                            <h4 className='md:text-2xl text-gray-200 md:text-gray-300 mt-1'>and get more customers</h4>
                            <div className="flex flex-col md:flex-row mt-4 gap-2">
                                <Button sx={{
                                    color: "#fff",
                                    bgcolor: '#2781E7',
                                    px: 3,
                                    ":hover": {
                                        bgcolor: "#2781e7"
                                    }
                                }}>
                                    Add restaurant
                                </Button>
                                <Button sx={{
                                    color: "#000",
                                    bgcolor: '#fff',
                                    px: 3,
                                    ":hover": {
                                        bgcolor: "#fff"
                                    }
                                }}>
                                    Restaurant already listed?
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Hero