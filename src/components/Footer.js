import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Image,
} from '@chakra-ui/react';

export default function Footer() {
  const SocialButton = ({ children, ...props }) => {
    return (
      <chakra.button
        bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
        rounded={'md'}
        w={8}
        h={8}
        cursor={'pointer'}
        as={'a'}
        href={props.href}
        target="_blank"
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        transition={'background 0.3s ease'}
        _hover={{
          bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
          color: "primaryblue"
        }}>
        <VisuallyHidden>{props.label}</VisuallyHidden>
        {children}
      </chakra.button>
    )
  }
  return (
    <Box
      color={useColorModeValue('gray.900', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={"container.xs"}
        py={6}
        spacing={4}
        justify={'center'}
        align={'center'}
        borderTop="1px"
        borderColor={useColorModeValue("blackAlpha.200", "whiteAlpha.200")}
      >
        <Stack direction={'row'} spacing={6} alignItems={"center"} >
          <a
            href="https://github.com/elvirafimansyah/emortfy"
            target="blank"
          >
            <chakra.span
              color={useColorModeValue("gray.800", "white")}
              _hover={{
                cursor: "pointer",
                textDecoration: "underline",
                textDecorationColor: "primaryblue",
                textDecorationThickness: "2px"
              }}
              textUnderlineOffset={3}>
              <i className="fa-brands fa-github"></i> &nbsp;Source Code
            </chakra.span>
          </a>
          <a
            href="https://www.buymeacoffee.com/elvira"
            target="blank"
          >
            <Image src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" rounded="md" />
          </a>
        </Stack>
      </Container>
      <Container
        as={Stack}
        maxW={'container.xs'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'start', md: 'center' }}
        bg={useColorModeValue("lightgray", "lightdark1")}
        rounded={{lg: "lg"}}
        mb={{lg: 4}}
      >
        <Text>© 2023 Emortfy by <chakra.a href="https://github.com/elvirafimansyah" target="_blank" _hover={{ textDecoration: "underline", textDecorationColor: "primaryblue", textUnderlineOffset: 3 }}>Elvira Firmansyah</chakra.a>. All rights reserved</Text>
        <Stack direction={'row'} spacing={3}>
          <SocialButton label={'Github'} href={'https://github.com/elvirafimansyah'}>
            <i className="fa-brands fa-github"></i>
          </SocialButton>
          <SocialButton label={'Twitter'} href={'https://twitter.com/elvirafirmansy1'}>
            <i className="fa-brands fa-twitter"></i>
          </SocialButton>
          <SocialButton label={'Instagram'} href={'https://www.instagram.com/virn_el'}>
            <i className="fa-brands fa-instagram"></i>
          </SocialButton>
          <SocialButton label={'Dribbble'} href={'https://dribbble.com/ElviraFir'}>
            <i className="fa-brands fa-dribbble"></i>
          </SocialButton>
        </Stack>
      </Container>
    </Box >
  );
}