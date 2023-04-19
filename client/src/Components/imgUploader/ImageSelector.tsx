import { useEffect, useState } from "react";
import { ImageUploader } from "./ImageUploader"
import axios from "axios";
import DialogBox from "../DialogBox/Dialog";
import { shadow } from "@cloudinary/url-gen/actions/effect";
function ImageSelector() {
    const [image, setImage] = useState<string>()
    const [imageChanged, setImageChanged] = useState<boolean>(false)
    const cloudName: string = "dd39ktpmz";
    const presetName: string = "dub2mchk"

    const handleUpload = (files: File[]) => {
        setImage(URL.createObjectURL(files[0]))
        setImageChanged(true)

        const formdata = new FormData()
        formdata.append("file", files[0])
        formdata.append('upload_preset', presetName)
        axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formdata)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const ShowImg = () => {
        return <DialogBox isOpen={imageChanged} imgSrc={image} title="Confirm product image" />
    }

    useEffect(() => {
        ShowImg()
    }, [image])

    return (
        <div className="w-[100%] mt-4">
            <ImageUploader onUpload={handleUpload} />
            <ShowImg />
        </div>
    )
}

export default ImageSelector