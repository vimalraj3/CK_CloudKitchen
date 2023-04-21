import { useState } from "react";
import { IInput } from "../TextInput/TextInput"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


// TODO button styles
export const PasswordInput: React.FC<IInput> = ({ name = "password", placeholder = "Enter your password", required = false, onChange }) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [value, setValue] = useState<string>("")


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.name, e.target.value);
        setValue(e.target.value);
    }


    return (
        <div>
            <label htmlFor={name} className="capitalize mt-2">
                {`${name}: `}
                {required && <sup className="text-[#9c9c9c] text-md">*</sup>}
            </label>
            <div className="w-[100%] flex  border-[#ff7e8b] border-2 rounded-md bg-[#f8f8f8] justify-between items-center mt-2 py-2 px-2 ">
                <input
                    onChange={e => handleChange(e)}
                    type={visible ? "text" : "password"}
                    value={value}
                    name={name}
                    id={name}
                    className="bg-[#f8f8f8] w-[90%] focus:outline-none"
                    placeholder={placeholder}
                    required={required}
                />
                <button
                    className="px-2 bg-[#f8f8f8]"
                    onClick={() => setVisible(!visible)}
                >
                    {
                        visible ?
                            <VisibilityOffIcon /> :
                            <VisibilityIcon />
                    }
                </button>
            </div>
        </div>
    )
}

