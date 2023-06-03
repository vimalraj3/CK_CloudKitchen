
interface Props {
    children: React.ReactNode;
    bgColor?: string;
    mt?: number
}

const defaultProps: Props = {
    children: <></>,
    bgColor: '#ffffff',
    mt: 10,
}

function Container({ children, bgColor, mt }: Props) {

    const props: Props = {
        ...defaultProps,
        children,
        bgColor: bgColor ?? defaultProps.bgColor,
        mt: 10
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