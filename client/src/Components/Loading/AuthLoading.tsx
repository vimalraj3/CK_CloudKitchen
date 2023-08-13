import React from "react";
import Container from "../Container";

export const AuthLoading = () => {
  return (
    <Container>
      <div className="flex min-h-[90svh] min-w-full flex-col items-center justify-center md:min-h-[100svh]">
        <div className="mb-3 flex flex-col items-center justify-start gap-2 md:flex-row ">
          <h1>Verifying Your Identity...</h1>
        </div>
      </div>
    </Container>
  );
};
