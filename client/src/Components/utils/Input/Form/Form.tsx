interface Props {
    children: React.ReactNode;
    bgColor?: string;
    width?: string;
}

const defaultProps: Props = {
    children: <></>,
    bgColor: '#ffffff',
    width: "100%"
}

export const Form: React.FC<Props> = ({ children, bgColor = "#fff", width }) => {

    return (
        <div style={{
            backgroundColor: bgColor,
            width: width
        }} className={` flex flex-col gap-4 py-2 px-2 rounded-lg `}>
            {children}
        </div>
    )
}

