import { useColorMode, IconButton, useColorModeValue } from "@chakra-ui/react";

const DarkModeToggle = ({...props}) => {
  const { toggleColorMode } = useColorMode()
  return (
    <IconButton
      aria-label="Toggle theme"
      bg={useColorModeValue('#F1F2F6', "whiteAlpha.200")}
      color="primaryblue"
      icon={useColorModeValue(<i className="fa-solid fa-moon"></i>, <i className="fa-solid fa-sun"></i>)}
      onClick={toggleColorMode}
      _focus={{ boxShadow: "none"}}

    ></IconButton>
  )
}
export default DarkModeToggle;