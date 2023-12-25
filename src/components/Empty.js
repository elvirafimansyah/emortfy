import {
  Stack,
  Heading,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

const Empty = (props) => {
  return (
    <Stack pt="16" pb={{ base: 12, sm: 30 }} spacing={7} direction="column" alignItems={"center"} justifyContent={"center"} textAlign="center">
      <i className="fa-solid fa-magnifying-glass fa-2xl" style={{
        color: "#0050FF"
      }} ></i>
      <Stack lineHeight="1">
        <Heading size="md" fontWeight={"semibold"} >No Results Found</Heading>
        <Text color={useColorModeValue("gray.700", "ptext")} fontSize="sm" lineHeight={{ base: "1.3", lg: "1" }}>No results match the filter criteria. Remove filter or clear all filters to show results.</Text>
      </Stack>
    </Stack>
  )
}
export default Empty;