import { useState } from "react";
export interface IInput {
    name?: string;
    placeholder?: string;
    required?: boolean
    onChange: (key: string, value: string) => void
}


export const TextInput = ({ name = "email", placeholder = "Enter your ", required = false, onChange }: IInput) => {
    const [value, setValue] = useState<string>("")


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        onChange(e.target.name, e.target.value);
        setValue(e.target.value);
    }

    return (
        <div>
            <label htmlFor={name} className="capitalize">
                {`${name}: `}
                {required && <sup className="text-[#9c9c9c] text-md">*</sup>}
            </label>
            <input value={value} type={name === "email" ? "email" : "text"} onChange={e => handleChange(e)} name={name} id={name} className="py-2 mt-1 px-2 w-[100%] bg-[#f8f8f8] border-[#ff7e8b] border-2 rounded-md focus:outline-none" placeholder={placeholder + name} required={required} />
        </div>
    )
}

