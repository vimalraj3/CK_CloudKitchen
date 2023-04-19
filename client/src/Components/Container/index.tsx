
interface Props {
    children: React.ReactNode;
    bgColor?: string;
}

const defaultProps: Props = {
    children: <></>,
    bgColor: '#ffffff'
}

function Container({ children, bgColor }: Props) {

    const props: Props = {
        ...defaultProps,
        children,
        bgColor: bgColor ?? defaultProps.bgColor
    }

    return (
        <div className={`w-[100%] bg-[${props.bgColor}] mt-7 md:mt-10`}>
            <div className="w-[90%] max-w-[1200px] mx-auto md:px-[2rem] py-4">
                {children}
            </div>
        </div>
    )
}

export default Container