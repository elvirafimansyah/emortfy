import { useEffect, useState } from "react";
import { 
  Stack,
  Skeleton, 
  useColorModeValue,
} from "@chakra-ui/react";
import TableChart from "../../components/TableChart";
import TitleChart from "../../components/TitleChart";
import FilterSearch from "../../components/Filter";
import Empty from "../../components/Empty";
import Pagination from "../../components/Pagination";
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

  useEffect(() => {
    async function getListener() {
      try {
        const api_listeners = "https://script.google.com/macros/s/AKfycbwr_SaQR8_8Ufz9Aoil9HFkQP_m-44s5FRReVUflHHdyVHryG12jmrvGWriKuA-T6TMmw/exec"
        const req = await fetch(api_listeners)
        const resp = await req.json()
        setListener(resp.data)
        setLoading(false)
      } catch(err) {
        console.error("error")
      }
    }
    getListener()
    
  }, [listener])

  useEffect(() => {
    if (listener.length > 0) {
      const lastUpdate = listener[0].lastupdate;
      const dateUpdate = new Date(lastUpdate).toLocaleString("en-US");
      setUpdate(dateUpdate);
    }
  }, [listener]); 
  
  const itemsPerPage = 50;
  const lastIndex = curPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(listener.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const arrayPageNumber = pageNumbers.map((number) => number) // [1,2,3,4,5]
  const lastIndexNumber = arrayPageNumber[arrayPageNumber.length - 1] // 5

  useEffect(() => {
    const paginationListener = listener.slice(firstIndex, lastIndex)
    setRecentListener(paginationListener)
    const filteredData = recentListener.filter(({ artist, id }) => artist.toLowerCase().trim().includes(value.toLowerCase().trim()) || id.toString().includes(value))
    setFilterListener(filteredData)
  }, [curPage ,listener, value,firstIndex, lastIndex, recentListener ])

  
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

  return (
    <Stack mx={-4}>
      <TitleChart title="Spotify Top Artists by Monthly Listeners" time={update} />
      <Skeleton rounded="md" startColor={useColorModeValue('lightgray','lightdark2')} endColor={useColorModeValue('gray.100','lightdark1')} isLoaded={!loading}>
        <FilterSearch  handleSearchKey={handleSearchKey}  />
      </Skeleton>
      <Skeleton rounded="md" startColor={useColorModeValue('lightgray', 'lightdark2')} endColor={useColorModeValue('gray.100', 'lightdark1')} isLoaded={!loading}>
        {
          !filterListener.length ? <Empty /> : <TableChart type="listener" data={filterListener} />
        }
      </Skeleton>
      <Skeleton rounded="md" startColor={useColorModeValue('lightgray', 'lightdark2')} endColor={useColorModeValue('gray.100', 'lightdark1')} isLoaded={!loading} >
        <Pagination 
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handleChangePage={handleChangePage}
          curPage={curPage}
          pageNumbers={pageNumbers}
          
        />
      </Skeleton>
    </Stack>
  )
}
export default Listeners;