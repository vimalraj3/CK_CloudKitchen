import Container from "../Container"

function PageLoading() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-center min-h-[90svh] md:min-h-[100svh] min-w-full">
        <div className="flex flex-col justify-start items-center gap-2 mb-3 md:flex-row ">
          <div className="custom-loader mr-3"></div>
          <h1>Loading...</h1>
        </div>
        <div>
          <p>Please wait while we fetch the data for you.</p>
        </div>
      </div>
    </Container>
  )
}

export default PageLoading