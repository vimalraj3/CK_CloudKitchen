
interface BtnFuns {
    className?: string;
    styles?: React.CSSProperties;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    types?: 'success' | 'error' | 'warning'
    type?: "button" | "submit" | "reset" | undefined
}

interface BtnProps extends BtnFuns {
    label: string;
}

interface BtnsProps extends BtnFuns {
    labelArr: string[];
}

export const Btn: React.FC<BtnProps> = ({ label, styles, className, onClick, types, type = "button" }) => {
    const btnType = types || 'success'
    return (
        <button onClick={onClick} type={type} className="py-2 px-2 bg-secondary border-[#9c9c9c] border-2 rounded-md focus:outline-none text-sm font-para"
        >{label}</button>
    )
}

export const Btns: React.FC<BtnsProps> = ({ labelArr, styles, className, onClick }) => {
    return (
        <>
            <div className="flex gap-3 items-center">
                {
                    labelArr.map((v, i) => {
                        return (
                            <button key={i} onClick={onClick} className="py-2 px-2 bg-secondary border-[#9c9c9c] border-2 rounded-md focus:outline-none text-sm font-para"
                            >{v}</button>
                        )
                    })
                }
            </div>
        </>
    )

}
