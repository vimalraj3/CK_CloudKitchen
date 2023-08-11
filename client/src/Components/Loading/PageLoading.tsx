import Container from "../Container";

function PageLoading() {
  return (
    <Container>
      <div className="flex min-h-[90svh] min-w-full flex-col items-center justify-center md:min-h-[100svh]">
        <div className="mb-3 flex flex-col items-center justify-start gap-2 md:flex-row ">
          <div className="custom-loader mr-3"></div>
          <h1>Loading...</h1>
        </div>
        <div>
          <p>Please wait while we fetch the data for you.</p>
        </div>
      </div>
    </Container>
  );
}

export default PageLoading;
