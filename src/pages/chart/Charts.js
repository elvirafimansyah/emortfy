import { 
  Stack,
  Heading,
  Text,
  useColorModeValue,
  chakra
} from "@chakra-ui/react";

import TabsCharts from "./Tabs";

const Charts = () => {
  return(
    <Stack mt={{base: '70px', lg: '48px'}}>
      <Stack direction="column" spacing={1} >
        <Heading fontSize={['22px', '29px', "32px"]}  fontWeight="semibold" >
          Charts
        </Heading>
        <Text color={useColorModeValue("gray.700", "ptext")} fontSize={{ base: '14px', md: '16px', lg: "16px" }} >Explore the dynamic rhythm of music trends with <chakra.a href="https://charts.spotify.com/" target="_blank" _hover={{ textDecoration: "underline", textDecorationColor: "primaryblue", textUnderlineOffset: 3 }}>Spotify Charts</chakra.a></Text>
      </Stack>
      <TabsCharts />
    </Stack>
  )
}
export default Charts;