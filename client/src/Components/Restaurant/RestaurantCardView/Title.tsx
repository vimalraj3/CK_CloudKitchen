interface ITitle {
    city: string;
}

const Title: React.FC<ITitle> = ({ city }) => {
    return (
        <div>
            <h2 className="font-moutserrat font-[500] text-2xl md:text-3xl">{`${city}'s Cloud kitchen`}</h2>
        </div>
    )
}

export default Title