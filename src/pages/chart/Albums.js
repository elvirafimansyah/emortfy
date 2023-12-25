import { useState, useEffect } from "react"
import {
  Stack,
  Skeleton,
  useColorModeValue
} from "@chakra-ui/react";

import TableChart from "../../components/TableChart";
import Loading from "../../components/Loading";
import TitleChart from "../../components/TitleChart";
import FilterSearch from "../../components/Filter";
import Empty from "../../components/Empty";

const Albums = () => {
  const [album, setAlbum] = useState([]);
  const [filterAlbum, setFilterAlbum] = useState([]);
  const [update, setUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("")

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
        if (album) {
          const lastUpdate = album[0].lastupdate
          const dateUpdate = new Date(lastUpdate).toLocaleString("en-US")
          setUpdate(dateUpdate)
        }
        setLoading(false)
      } catch (err) {
        console.error('error')
      }
    } 
    getAlbum()
  }, [album])

  useEffect(() => {
    const filteredData = album.filter(({ album, id }) => album.toLowerCase().trim().includes(value.toLowerCase().trim()) || id.toString().includes(value))
    setFilterAlbum(filteredData)

  }, [album, value])

  return (
    <Stack mx={-4}>
      <TitleChart title="Spotify Most Streamed Albums" time={update} />

      <Skeleton rounded="md" startColor={useColorModeValue('lightgray', 'lightdark2')} endColor={useColorModeValue('gray.100', 'lightdark1')} isLoaded={!loading}>
        <FilterSearch handleSearchKey={handleSearchKey} />
      </Skeleton>
      <Skeleton rounded="md" startColor={useColorModeValue('lightgray', 'lightdark2')} endColor={useColorModeValue('gray.100', 'lightdark1')} isLoaded={!loading}>
        {!filterAlbum.length ? <Empty /> : <TableChart type="album" data={filterAlbum} />}
      </Skeleton>
    </Stack>
  )
}
export default Albums;