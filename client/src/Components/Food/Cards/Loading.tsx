import { Grid, Skeleton } from "@mui/material";

export const FoodCardSkeleton: React.FC = () => (
  <Grid container spacing={2}>
    {new Array(6).fill(0).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <div className="aspect-[4/3] w-[100%] cursor-pointer rounded-lg px-4 py-3 transition-shadow ease-in-out hover:shadow-xl">
          <section className="w-[100%]">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={"200px"}
              className="rounded-lg"
            />
          </section>
          <section className="mt-1.5">
            <div className="flex items-center justify-between">
              <Skeleton
                animation="wave"
                variant="text"
                width={"30%"}
                height={"2rem"}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={"15%"}
                height={"2rem"}
              />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton
                animation="wave"
                variant="text"
                width={"45%"}
                height={"1rem"}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={"15%"}
                height={"1rem"}
              />
            </div>
          </section>
          <section className="mt-4 flex items-center  justify-end">
            <div className="h-[2.1rem] w-full">
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={"100%"}
                animation="wave"
              />
            </div>
          </section>
        </div>
      </Grid>
    ))}
  </Grid>
);
