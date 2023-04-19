
interface BtnFuns {
    className?: string;
    styles?: React.CSSProperties;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

interface BtnProps extends BtnFuns {
    label: string;
}

interface BtnsProps extends BtnFuns {
    labelArr: string[];
}

export const Btn: React.FC<BtnProps> = ({ label, styles, className, onClick }) => {
    return (
        <button onClick={onClick} className={`px-4 py-1 rounded-md font-moutserrat text-[#9c9c9c] border-[#c1c1c1] border-2 cursor-pointer flex  items-center hover:border-[#ff7e8b] hover:text-[#ff7e8b] ${className ? className : ""} `} style={styles} role="button">
            {label}
        </button>
    )
}

export const Btns: React.FC<BtnsProps> = ({ labelArr, styles, className, onClick }) => {
    return (
        <>
            {
                labelArr.map((v, i) => {
                    return (
                        <Btn label={v} key={i} styles={styles} onClick={onClick} className={className ? className + " mr-3" : " mr-3"} />
                    )
                })
            }
        </>
    )

}
