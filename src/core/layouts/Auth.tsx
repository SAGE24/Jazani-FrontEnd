import { Outlet } from "react-router";
import Container from "react-bootstrap/Container";

const Auth = (): JSX.Element => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default Auth;
