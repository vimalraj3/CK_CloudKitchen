import { useAppSelector } from "../../../hooks";

const Title: React.FC = () => {
  const { data } = useAppSelector((state) => state.userState);
  return (
    <div>
      <h2 className="font-moutserrat text-xl font-[500] md:text-3xl">{`${data.geo.region}'s Cloud kitchen`}</h2>
    </div>
  );
};

export default Title;
