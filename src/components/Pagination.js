import {
  Flex,
  Icon,
  Button,
  Box,
  useColorMode
} from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
const Pagination = ({handlePrevPage, pageNumbers, handleChangePage, curPage, handleNextPage}) => {
  const { colorMode } = useColorMode()
  return (
    <Flex
      w="full"
      alignItems={{ md: "center" }}
      justifyContent={{ md: "center" }}
      overflowY={"auto"}
      my={3}
    >
      <Flex>
        <Button
          onClick={handlePrevPage}
          mx={1}
          px={4}
          py={2}
          rounded="md"
          bg="lightgray"
          _dark={{
            bg: "lightdark1",
            color: "ptext"
          }}
          color="gray.700"
        >
          <Icon
            as={IoIosArrowBack}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
            boxSize={4}
          />
        </Button>
        {pageNumbers.map((number) => (
          <Box
            mx={1}
            px={4}
            py={2}
            rounded="md"
            key={number}
            onClick={() => handleChangePage(number)}
            bg={curPage === number ? "primaryblue" : colorMode === "dark" ? "lightdark1" : "lightgray"}
            color={curPage === number ? "white" : colorMode === "dark" ? "ptext" : "gray.700"}
            _hover={{ cursor: "pointer", bg: curPage === number ? null : colorMode === "dark" ? "lightdark2" : "gray.200", color: curPage === number ? null : colorMode === "dark" ? "white" : "black" }}
          >
            {number}
          </Box>
        ))}
        <Button
          onClick={handleNextPage}
          mx={1}
          px={4}
          py={2}
          rounded="md"
          bg="lightgray"
          _dark={{
            bg: "lightdark1",
            color: "ptext"
          }}
          color="gray.700"
        >
          <Icon
            as={IoIosArrowForward}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
            boxSize={4}
          />
        </Button>
      </Flex>
    </Flex>
  )
}

export default Pagination