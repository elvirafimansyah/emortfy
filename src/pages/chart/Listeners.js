import { useEffect, useState } from "react";
import { 
  Stack,
  Skeleton, 
  useColorModeValue,
  Flex,
  Icon,
  Button,
  Box,
  useColorMode
} from "@chakra-ui/react";
import TableChart from "../../components/TableChart";
import Loading from "../../components/Loading";
import TitleChart from "../../components/TitleChart";
import FilterSearch from "../../components/Filter";
import Empty from "../../components/Empty";
import Pagination from "../../components/Pagination";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
const Listeners = () => {
  const [listener, setListener] = useState([]);
  const [filterListener, setFilterListener] = useState([]);
  const [recentListener, setRecentListener] = useState([])
  const [update, setUpdate] = useState(null)
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("")
  const [curPage, setCurPage] = useState(1);
  const { colorMode } = useColorMode()

  const handleSearchKey = (e) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    async function getListener() {
      try {
        const api_listeners = "https://script.google.com/macros/s/AKfycbwr_SaQR8_8Ufz9Aoil9HFkQP_m-44s5FRReVUflHHdyVHryG12jmrvGWriKuA-T6TMmw/exec"
        const req = await fetch(api_listeners)
        const resp = await req.json()
        setListener(resp.data)
        if(listener) {
          const lastUpdate = listener[0].lastupdate
          const dateUpdate = new Date(lastUpdate).toLocaleString("en-US")
          setUpdate(dateUpdate)
        }
        setLoading(false)
      } catch(err) {
        console.error("error")
      }
    }
    getListener()
    
  }, [listener])
  
  const itemsPerPage = 5;
  const lastIndex = curPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  const pageNumbers = [];

  useEffect(() => {
    const filteredData = listener.filter(({ artist, id }) => artist.toLowerCase().trim().includes(value.toLowerCase().trim()) || id.toString().includes(value))
    setFilterListener(filteredData)

    const paginationListener = filterListener.slice(firstIndex, lastIndex)
    setRecentListener(paginationListener)
  }, [listener, value, filterListener, firstIndex, lastIndex, recentListener ])

  for (let i = 1; i <= Math.ceil(filterListener.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const arrayPageNumber = pageNumbers.map((number) => number) // [1,2,3,4,5]
  const lastIndexNumber = arrayPageNumber[arrayPageNumber.length - 1] // 5

  const handleChangePage = (number) => {
    setCurPage(number)
  }
  const handleNextPage = () => {
    if (curPage !== lastIndexNumber) {
      setCurPage(curPage + 1)
    }
  }
  const handlePrevPage = () => {
    if (curPage !== 1) {
      setCurPage(curPage - 1)
    }
  }

  return(
    <Stack mx={-4}>
      <TitleChart title="Spotify Top Artists by Monthly Listeners" time={update} />
      <Skeleton rounded="md" startColor={useColorModeValue('lightgray','lightdark2')} endColor={useColorModeValue('gray.100','lightdark1')} isLoaded={!loading}>
        <FilterSearch  handleSearchKey={handleSearchKey}  />
      </Skeleton>
      <Skeleton rounded="md" startColor={useColorModeValue('lightgray', 'lightdark2')} endColor={useColorModeValue('gray.100', 'lightdark1')} isLoaded={!loading}>
        {
          !filterListener.length ? <Empty /> : <TableChart type="listener" data={recentListener} />
        }
      </Skeleton>
      <Flex
        w="full"
        alignItems={{md:"center"}}
        justifyContent={{md: "center"}}
        overflowY="auto"
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
              bg={curPage === number ? "primaryblue" : colorMode === "dark" ?  "lightdark1" : "lightgray"}
              color={curPage === number ? "white" : colorMode === "dark" ? "ptext" : "gray.700"}
              _hover={{cursor: "pointer",  bg: curPage === number ? null : colorMode === "dark" ? "lightdark2" : "gray.200", color: curPage === number ? null : colorMode === "dark" ? "white" : "black"}}
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
    </Stack>
  )
}
export default Listeners;