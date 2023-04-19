export interface IInput {
    name?: string;
    placeholder?: string;
    required?: boolean
}

const defaultProps: IInput = {
    name: 'email',
    placeholder: "Enter your email",
    required: false
}

export const TextInput: React.FC<IInput> = ({ name, placeholder, required }) => {
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
            <input type="text" name={props.name} id={props.name} className="py-2 mt-2 px-2 w-[100%] bg-[#f8f8f8] border-[#ff7e8b] border-2 rounded-md focus:outline-none" placeholder={props.placeholder} />
        </>
    )
}

