import axios from 'axios';
import { useState } from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions';
// import ImageUploader from './imgUploader/ImageUploader';
import ImageSelector from './imgUploader/ImageSelector';
import { IShowToast } from '../types/showToast.types';

function ProductFrom() {
    const [image, setImage] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState<string>()
    const cloudName: string = "dd39ktpmz";
    const presetName: string = "jnniwa4k"

    const handleChange = (event: any) => {

        const formdata = new FormData()

        formdata.append("file", event.target.files[0])
        formdata.append('upload_preset', presetName)
        axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formdata)
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className=' flex-col w-[80%] max-w-[1000px]  mx-auto'>
            <div className="flex mx-auto justify-center items-center">

                <div className="w-[45%]  mr-[5%]">
                    <h3 className='bigText'>Add your food product</h3>
                    <p className='mt-1 para '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt nisi facere sunt possimus temporibus porro soluta cumque, unde exercitationem quam consequatur quibusdam obcaecati sequi sapiente labore rerum mollitia aliquam dicta?</p>
                </div>

                <div className="flex flex-col w-[50%]">
                    <p className='mt-4  '>Food details</p>
                    <input placeholder='Title' type="text" className='textBox' name="title" id="tile" />

                    <input type="number" placeholder='Price in INR' name="price" id="price" className="textBox" />

                    <div className={`select-menu w-[100%] border-[#ff7e8b] mt-4 border-solid ${isOpen ? 'active' : ""}`} onClick={() => { setIsOpen(prev => prev = !prev) }}>
                        <div className="select-btn">
                            <span className='sBtn-text'>{value}</span>
                            <i className={`fa-solid fa-chevron-down  ${isOpen ? 'rotate' : "reverse-rotate"}`} style={{ color: "#ff7e8b" }}></i>
                        </div>
                        <ul className="options  w-[50%] border-2 ">
                            <li className="option" onClick={(event) => { setValue("Puducherry") }}>
                                <span className="option-text">Puducherry</span>
                            </li>
                            <li className="option" onClick={(event) => { setValue("Villupuram") }}>
                                <span className="option-text">Villupuram</span>
                            </li>
                        </ul>
                    </div>

                    <textarea name="description" id="description" className='textBox h-[8rem]' cols={30} rows={10} placeholder='Description of your Food'></textarea>

                    <p className='mt-4'>Food selling time.</p>
                    <div className="w-[100%] mt-1">
                        <label htmlFor="open">Open</label>
                        <input type="time" name="open" id="open" className='textBox mt-2' />
                    </div>

                    <div className="w-[100%] mt-2">
                        <label htmlFor="close">Close</label>
                        <input type="time" name="close" id="close" className='textBox mt-2' />
                    </div>

                    <ImageSelector />

                    <button className='btn-full'>Submit</button>
                </div>
            </div>
        </div >
    )
}

export default ProductFrom