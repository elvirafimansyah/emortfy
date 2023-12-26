import { useEffect, useState, useRef } from "react";
import { 
  Stack,
  Skeleton, 
  useColorModeValue,
  chakra,
  Flex,
  Icon,
  Button
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

  const handleSearchKey = (e) => {
    setValue(e.target.value)
  }

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

  const arrayPageNumber = pageNumbers.map((number) => {
    return number
  })
  const lastIndexNumber = arrayPageNumber[arrayPageNumber.length - 1] 

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
        alignItems="center"
        justifyContent="center"
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
            <Button
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
              key={number} 
              onClick={() => handleChangePage(number)}
          
              style={curPage === number ? activeStyle : normalStyle} 
            >
              {number}
            </Button>
            
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