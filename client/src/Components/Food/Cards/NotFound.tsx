export const FoodNotFound: React.FC = () => (
  <div className="flex-col flex w-full gap-5 justify-center items-center">
    <div className="w-[80%] md:w-[500px]">
      <img
        src="/error.png"
        alt="Restaurant nor found image"
        width={'100%'}
        height={'100%'}
        loading={'lazy'}
      />
    </div>
  </div>
)
