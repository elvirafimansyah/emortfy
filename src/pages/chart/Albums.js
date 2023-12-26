import { useState, useEffect, useRef} from "react"
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

const Albums = () => {
  const [album, setAlbum] = useState([]);
  const [filterAlbum, setFilterAlbum] = useState([]);
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
    async function getAlbum() {
      try {
        const api_album = "https://script.google.com/macros/s/AKfycbyD56Ghjjhii-UEJy596Clw-tamtqKyVNrHlZVQxnZjepukSKNor1O-yaMbLkVk3Atr8A/exec"
        const req = await fetch(api_album)
        const resp = await req.json()
        setAlbum(resp.data)
        setLoading(false)
      } catch (err) {
        console.error('error')
      }
    } 
    getAlbum()
  }, [])

  useEffect(() => {
    if (album.length > 0) {
      const lastUpdate = album[0].lastupdate;
      const dateUpdate = new Date(lastUpdate).toLocaleString("en-US");
      setUpdate(dateUpdate);
    }
  }, [album]);
  
  const itemsPerPage = 50;
  const lastIndex = curPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(album.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const arrayPageNumber = pageNumbers.map((number) => number) // [1,2,3,4,5]
  const lastIndexNumber = arrayPageNumber[arrayPageNumber.length - 1] // 5

  useEffect(() => {
    const paginationAlbum = album.slice(firstIndex, lastIndex);
    setRecentListener(paginationAlbum);
  }, [album, firstIndex, lastIndex]);

  useEffect(() => {
    const filteredData = recentListener.filter(({ album, id }) => album.toLowerCase().trim().includes(value.toLowerCase().trim()) || id.toString().includes(value))
    setFilterAlbum(filteredData);
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



  return (
    <Stack mx={-4}>
      <TitleChart title="Spotify Most Streamed Albums" time={update} />

      <Skeleton rounded="md" startColor={useColorModeValue('lightgray', 'lightdark2')} endColor={useColorModeValue('gray.100', 'lightdark1')} isLoaded={!loading}>
        <FilterSearch handleSearchKey={handleSearchKey} handleRef={filterRef} />
      </Skeleton>
      <Skeleton rounded="md" startColor={useColorModeValue('lightgray', 'lightdark2')} endColor={useColorModeValue('gray.100', 'lightdark1')} isLoaded={!loading}>
        {!filterAlbum.length ? <Empty /> : <TableChart type="album" data={filterAlbum} />}
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
export default Albums;