import {
  Flex,
  Icon,
  chakra
} from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
const Pagination = ({itemsPerPage,totalItems, changePage, prevPage, nextPage, curPage}) => {
  const pageNumbers = [];
  const activeStyle = {
    bg: "primaryblue",
    _dark: {
      bg: "primaryblue",
    },
    color: "white",
  };

  const normalStyle = {
    bg: "lightgray",
    _dark: {
      bg: "lightdark1",
      color: "ptext"
    },
    color: "gray.700",
  }

  const PagButton = (props) => {
    return (
      <chakra.button
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
        {props.children}
      </chakra.button>
    );
  };

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex>
        <PagButton onClick={prevPage}>
          <Icon
            as={IoIosArrowBack}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
            boxSize={4}
          />
        </PagButton>
        {pageNumbers.map((number) => (
          <PagButton key={number} onClick={() => changePage(number)} style={curPage === number ? activeStyle : normalStyle} >{number}</PagButton>
        ))}
        
        <PagButton onClick={nextPage}>
          <Icon
            as={IoIosArrowForward}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
            boxSize={4}
          />
        </PagButton>
      </Flex>
    </Flex>
  )
}

export default Pagination