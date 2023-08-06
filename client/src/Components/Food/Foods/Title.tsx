import { useAppSelector } from "../../../hooks";

const Title: React.FC = () => {

    const { data } = useAppSelector(state => state.userState)
    return (
        <div>
            <h2 className="font-moutserrat font-[500] text-xl md:text-3xl">{`${data.geo.region}'s Cloud kitchen`}</h2>
        </div>
    )
}

export default Title