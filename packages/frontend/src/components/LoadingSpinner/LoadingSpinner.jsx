import { Container, Spinner } from "react-bootstrap"

const LoadingSpinner = () => {
    return (
        <Container className="text-center theme-primary-color">
          <Spinner animation="border" role="status" />
          <div className=" theme-primary-color">Carregando informações</div>
        </Container>
      );
}

export default LoadingSpinner