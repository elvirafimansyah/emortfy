import { useEffect } from "react";
import { Container } from "@chakra-ui/react";

const Main = ({children}) => {
  useEffect(function() {
      document.title = 'Home';
    }, []);
  return(
    <>
      <Container maxW="container.xs" py={20} >
        {children}
      </Container>
    </>
  )
}


export default Main;