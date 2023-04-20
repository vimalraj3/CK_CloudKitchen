import Container from "../Container"
import Nav from "../Nav"
import thaliImg from '../../assets/utils/thaliBig.png'
import './styles.css'
import { PasswordInput, TextInput } from "../utils/Input"
import { useState } from 'react'
import { Form } from "../utils/Input/Form/Form"
import { Btn } from "../utils/Btn"
import { Divider } from "../utils/Divider"
import { Link } from "react-router-dom"
import GoogleIcon from '@mui/icons-material/Google';
interface Login {
    email: string;
    password: string;
}
function index() {
    const [user, setUser] = useState<Login>({
        email: '',
        password: ''
    })

    const handleChange = (key: string, value: string) => {
        setUser(prev => {
            return prev = {
                ...prev,
                [key]: value
            }
        })
        console.log(user);
    }

    return (
        <>
            <Nav dark={true} bgColor={"#f8f8f8"} />
            <Container>
                <div className="flex  justify-center">
                    <div className="w-[50%] flex justify-center items-center">
                        <Form width="60%" >
                            <TextInput onChange={handleChange} name="username" required />
                            <TextInput onChange={handleChange} required />
                            <PasswordInput onChange={handleChange} required />
                            <Btn label="Login" styles={{
                                width: "100%",
                                border: '#ff7e8b 2px solid',
                                display: "flex",
                                justifyContent: "center",
                                margin: '  0',
                                color: '#000',
                                fontFamily: "montserrat",
                                backgroundColor: '#f8f8f8',
                                fontWeight: '500'
                            }} />
                            <div className="flex justify-center text-center">
                                <div className="w-[calc(50%-18px)]">
                                    <Divider color="#c1c1c1" size="1px" />
                                </div>
                                <p className="w-[36px] bg-[#eee] px-1.5 py-1 rounded-full">OR</p>
                                <div className="w-[calc(50%-18px)]">
                                    <Divider color="#c1c1c1" size="1px" />
                                </div>
                            </div>
                            <button className="rounded-md p-1" style={{
                                width: "100%",
                                border: '#ff7e8b 2px solid',
                                display: "flex",
                                justifyContent: "center",
                                margin: '  0',
                                color: '#000',
                                fontFamily: "montserrat",
                                backgroundColor: '#f8f8f8',
                                fontWeight: '500'
                            }} >
                                <div className="flex gap-1 items-center justify-center">
                                    {`Google `} <GoogleIcon fontSize="small" sx={{ color: '#222', fontSize: '16px' }} />
                                </div>
                            </button>
                            <Divider margin="0" color="#c1c1c1" size="1px" />
                            <div className="flex items-center justify-center">
                                <p className="text-[#9c9c9c] text-sm">have account already? </p>
                                <Link to={'/login'}>
                                    <span className="text-[#000] hover:underline cursor-pointer ml-1.5">login</span>
                                </Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default index