import { Skeleton } from "@mui/material";
import React from "react";

export const CardItemLoading: React.FC = React.memo(() => {
  return (
    <>
      <div className="mt-2 flex flex-col items-center justify-between gap-2 rounded-lg bg-secondary px-6 py-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Skeleton
            variant="rounded"
            height={"4rem"}
            width={"100%"}
            animation="wave"
          />
          <div className="ml-2 w-[150px] md:w-[250px] ">
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem" }}
              width={"100%"}
              animation="wave"
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem" }}
              width={"100%"}
              animation="wave"
            />
          </div>
        </div>

        <Skeleton variant="rectangular" width={210} height={40} />
      </div>
    </>
  );
});
