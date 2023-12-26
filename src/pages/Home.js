import { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom"
import {
  Text,
  Heading,
  useColorModeValue,
  Stack,
  Button,
} from "@chakra-ui/react"
import Main from '../layouts/Main';
import Charts from './chart/Charts'
import Footer from '../components/Footer';

export default function Home() {
  const mediaMatch = window.matchMedia('(min-width: 900px)');
  const [matches, setMatches] = useState(mediaMatch.matches);
  const matchHandler = e => setMatches(e.matches);
  const chartRef = useRef(null)
  const sourceRef = useRef(null)

  const handleScroll = () => {
    chartRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const handleSourceCode = () => {
    sourceRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(function () {
    document.title = 'Emortfy';
    mediaMatch.addEventListener('change', matchHandler);
    return () => mediaMatch.removeEventListener('change', matchHandler);
  }, [mediaMatch]);

  return (
    <>
    <Main>
      <Stack direction="column" spacing={3} py={{base: 10, md: 20, xl: 24}} alignItems="center" >
        <Text align="center" color="primaryblue" fontWeight="semibold">Spotify Charts</Text>
        <Heading fontSize={{base: '32px', md: '38px', lg: "45px", xl: "48px"}} align="center" fontWeight="bold" >Explore Chart-Topping Artists and Dive into the Pulse of Popularity</Heading>
        <Text  color={useColorModeValue("gray.700", "ptext")} fontSize={{ base: '14px', md: '16px', lg: "16px" }} align="center">
          Embark on an exhilarating journey through Spotify's top-tier talent, from the hottest tracks to the
          most-{matches ? <br /> : null} followed  artists  all on our immersive platform.</Text>
        <Stack direction={{base: "column", sm: "row"}} alignItems="center" spacing={{base: 0, sm: 3}}>
          <Link to={'/'} >
            <Button onClick={handleScroll} rounded="lg" bg="primaryblue" my={{base: 3, md: 4}} color="white" _hover={{ bg: "darkblue" }} _focus={{ boxShadow: "none" }} >Get Started</Button>
          </Link>
          <Button onClick={handleSourceCode} variant="outline" fontWeight="medium" display="flex" alignItems="center" rounded="lg" my={{ base: 0, sm: 3, md: 4 }} _hover={{ bg: useColorModeValue("lightgray", "lightdark1") }} _focus={{ boxShadow: "none" }}><i className="fa-brands fa-github fa-lg"></i>&nbsp;&nbsp;Source Code</Button>
        </Stack>
      </Stack>
    
      <div ref={chartRef}>
        <Charts  />
      </div>
    </Main>

    <div ref={sourceRef}>
      <Footer ref={handleSourceCode} />
    </div>
    </>
  );
}
