export const FoodNotFound: React.FC = () => (
  <div className="flex w-full flex-col items-center justify-center gap-5">
    <div className="w-[80%] md:w-[500px]">
      <img
        src="/error.png"
        alt="Restaurant nor found image"
        width={"100%"}
        height={"100%"}
        loading={"lazy"}
      />
    </div>
  </div>
);
