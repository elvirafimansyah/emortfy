import {
  Button
} from "@chakra-ui/react";

const Loading = (props) => {
  return (
    <Button
      isLoading
      _dark={{ bg: "lightdark2" }}
      bg="lightgray"
      loadingText='Loading Data'
      spinnerPlacement='start'
      fontWeight="normal"
    >
      loading
    </Button>
  )
}
export default Loading;