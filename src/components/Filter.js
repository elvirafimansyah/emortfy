import {
  Stack,
  Input,
  InputGroup,
  Box,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";

const FilterSearch = ({ value, handleSearchKey, focus }) => {
  return (
    <Stack pb={3} >
      <InputGroup maxW={{sm: "xs"}} alignSelf="end">
        <InputLeftElement
          pointerEvents="none"
          children={<Box as={IoSearch} color={focus ? 'primaryblue' : 'abu'} />}
        />
        <Input variant='filled' border="1px" borderColor={useColorModeValue("gray.200", "lightdark2")} bg={useColorModeValue("lightgray", "lightdark1")} focusBorderColor='primaryblue' type='text'  onChange={handleSearchKey} value={value} fontSize="14px" rounded="lg" placeholder='Filter' />
      </InputGroup>
    </Stack>

  )
}
export default FilterSearch;
