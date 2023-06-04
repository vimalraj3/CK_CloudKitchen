function PageLoading() {
  return (
    <div className="flex justify-center items-center min-h-[100svh] min-w-full">
      <div className="custom-loader mr-3"></div>
      <div>
        <h1>Loading...</h1>
        <p>Please wait while we fetch the data for you.</p>
      </div>
    </div>
  )
}

export default PageLoading