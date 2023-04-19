import Container from "../Container"
import Nav from "../Nav"
import thaliImg from '../../assets/utils/thaliBig.png'
import './styles.css'
import { PasswordInput, TextInput } from "../utils/Input"

function index() {
    return (
        <>
            <Nav dark={true} />
            <Container>
                <div className="flex overflow-hidden">
                    <div className="w-[50%] rotate-img">
                        <img src={thaliImg} alt="thali_image" width={'100%'} />
                    </div>
                    <div className="w-[50%]">
                        <TextInput />
                        <PasswordInput />
                    </div>
                </div>
            </Container>
        </>
    )
}

export default index