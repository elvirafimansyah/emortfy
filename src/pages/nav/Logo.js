import { Stack, Link, useColorModeValue, Image } from '@chakra-ui/react';
const Logo = (props) => {
  return(
    <Stack {...props} spacing={4} direction="row" >
      <Image src="/assets/img/logo.png" boxSize='30px'  />
      <Link _hover={{color: useColorModeValue("gray.700", "white")}} href="/" fontSize="xl" fontWeight="bold" color={useColorModeValue("gray.700", "white")} _focus={{ boxShadow: "none" }}>
        Emortfy
      </Link>
    </Stack>
  )
};

export default Logo;