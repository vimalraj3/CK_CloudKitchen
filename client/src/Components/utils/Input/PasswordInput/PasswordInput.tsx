import { IInput } from "../TextInput/TextInput"

const defaultProps: IInput = {
    name: 'password',
    placeholder: "Enter your password",
    required: false
}

// TODO button styles
export const PasswordInput: React.FC<IInput> = ({ name, placeholder, required }) => {
    const props: IInput = {
        name: name || defaultProps.name,
        placeholder: placeholder || defaultProps.placeholder,
        required: required || defaultProps.required,
    }

    return (
        <>
            <label htmlFor={props.name} className="capitalize">
                {`${props.name}: `}
                {required && <sup className="text-[#9c9c9c] text-md">*</sup>}
            </label>
            <div className="w-[100%] flex">
                <input type="password" name={props.name} id={props.name} className="py-2 mt-2 px-2 w-[90%] bg-[#f8f8f8] border-[#ff7e8b] border-2 rounded-md focus:outline-none" placeholder={props.placeholder} />
                <button></button>
            </div>
        </>
    )
}

