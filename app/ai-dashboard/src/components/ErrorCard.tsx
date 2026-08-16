type ErrorCardProps = {
    errorMessage: string
  }
  
  function ErrorCard({ errorMessage }: ErrorCardProps) {
    return (
      <div>
        <h1>{errorMessage}</h1>
        <p>Try to relaunch the web page</p>
      </div>
    )
  }
  
  export default ErrorCard