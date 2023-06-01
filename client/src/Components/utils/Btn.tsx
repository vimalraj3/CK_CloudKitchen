
interface BtnFuns {
    className?: string;
    styles?: React.CSSProperties;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
    types?: 'success' | 'error' | 'warning'
}

interface BtnProps extends BtnFuns {
    label: string;
}

interface BtnsProps extends BtnFuns {
    labelArr: string[];
}

export const Btn: React.FC<BtnProps> = ({ label, styles, className, onClick, types }) => {
    const btnType = types || 'success'
    return (
        <button onClick={onClick} className={`px-4 py-1 rounded-md font-moutserrat text-gray border-gray border-2 cursor-pointer flex  items-center hover:border-${btnType} hover:text-${btnType}`} style={styles} role="button">
            <p> {label}</p>
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
