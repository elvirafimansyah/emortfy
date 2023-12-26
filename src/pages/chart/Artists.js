import { useEffect, useState, useRef } from "react"
import { 
  Stack,
  Skeleton,
  useColorModeValue
} from "@chakra-ui/react";
import TableChart from "../../components/TableChart";
import TitleChart from "../../components/TitleChart";
import FilterSearch from "../../components/Filter";
import Empty from "../../components/Empty";
import Pagination from "../../components/Pagination";

const Artists = () => {
  const [artist, setArtist] = useState([]);
  const [filterArtist, setFilterArtist] = useState([]);
  const [recentListener, setRecentListener] = useState([])
  const [update, setUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("")
  const [curPage, setCurPage] = useState(1);
  const filterRef = useRef(null)

  const handleSearchKey = (e) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    async function getArtist() {
      try {
        const api_artist = "https://script.google.com/macros/s/AKfycbxVZpthZooptVQ9ZMI0IfNLYjS3VnG260UPdKvPRk0a-AzSs81LAqCuMV-n_tUeyrPMJQ/exec"
        const req = await fetch(api_artist)
        const resp = await req.json()
        setArtist(resp.data)
        setLoading(false)
      } catch(err) {
        console.error("error")
      }
    }
    getArtist()
    
  }, [])

  useEffect(() => {
    if (artist.length > 0) {
      const lastUpdate = artist[0].lastupdate;
      const dateUpdate = new Date(lastUpdate).toLocaleString("en-US");
      setUpdate(dateUpdate);
    }
  }, [artist]); 
  
  const itemsPerPage = 50;
  const lastIndex = curPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(artist.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const arrayPageNumber = pageNumbers.map((number) => number) // [1,2,3,4,5]
  const lastIndexNumber = arrayPageNumber[arrayPageNumber.length - 1] // 5

  useEffect(() => {
    const paginationArtist = artist.slice(firstIndex, lastIndex);
    setRecentListener(paginationArtist);
  }, [artist, firstIndex, lastIndex]);

  useEffect(() => {
    const filteredData = recentListener.filter(({ artist, id }) => artist.toLowerCase().trim().includes(value.toLowerCase().trim()) || id.toString().includes(value));
    setFilterArtist(filteredData);
  }, [value, recentListener]);


  const handleChangePage = (number) => {
    setCurPage(number)
    filterRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const handleNextPage = () => {
    if (curPage !== lastIndexNumber) {
      setCurPage(curPage + 1)
      filterRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }
  const handlePrevPage = () => {
    if (curPage !== 1) {
      setCurPage(curPage - 1)
      filterRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }


  return(
    <Stack mx={-4}>
      <TitleChart title="Spotify Most Streamed Artists of All Time" time={update} />
      <Skeleton rounded="md" startColor={useColorModeValue('lightgray', 'lightdark2')} endColor={useColorModeValue('gray.100', 'lightdark1')} isLoaded={!loading}>
        <FilterSearch handleSearchKey={handleSearchKey} handleRef={filterRef} />
      </Skeleton>
      <Skeleton rounded="md" startColor={useColorModeValue('lightgray', 'lightdark2')} endColor={useColorModeValue('gray.100', 'lightdark1')} isLoaded={!loading}>
        {!filterArtist.length ? <Empty /> : <TableChart type="artist" data={filterArtist} />}
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
export default Artists;