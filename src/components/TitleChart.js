import {
  Stack,
  Heading,
  Text,
  useColorModeValue
} from "@chakra-ui/react";

const TitleChart = (props) => {
  return (
    <Stack {...props} mb={2}>
      <Heading fontSize="xl" fontWeight="semibold" align="start">{props.title}</Heading>
      <Text fontSize="xs" fontWeight="light" align="start"  color={useColorModeValue("gray.800", "ptext")}><i className="fa-regular fa-clock" ></i>&nbsp; <span></span>Last Updated : {props.time ? props.time : "-"}</Text>
    </Stack>
  )
}
export default TitleChart;