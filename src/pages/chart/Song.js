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

const Song = () => {
  const [song, setSong] = useState([]);
  const [filterSong, setFilterSong] = useState([]);
  const [update, setUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("")

  const handleSearchKey = (e) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    async function getSong() {
      try {
        const api_song = "https://script.google.com/macros/s/AKfycbxiD6uKlk1zeKUrDkLNw1tGqQA4tNoz5mgVBD4tHR9UNhH6PSOxVjK5kT_Ki7SdpP02OA/exec"
        const req = await fetch(api_song)
        const resp = await req.json()
        setSong(resp.data)
        if (song) {
          const lastUpdate = song[0].lastupdate
          const dateUpdate = new Date(lastUpdate).toLocaleString("en-US")
          setUpdate(dateUpdate)
        }
        setLoading(false)
      } catch(err) {
        console.error("error")
      }
    }
    getSong()

  }, [song])

  useEffect(() => {
    const filteredData = song.filter(({ category, title }) => category.toLowerCase().trim().includes(value.toLowerCase().trim()) || title.toLowerCase().trim().includes(value.toLowerCase().trim()))
    setFilterSong(filteredData)

  }, [song, value])

  return(
    <Stack mx={-4}>
      <TitleChart title="Spotify Most Streamed Songs" time={update} />
      <Skeleton rounded="md" startColor={useColorModeValue('lightgray', 'lightdark2')} endColor={useColorModeValue('gray.100', 'lightdark1')} isLoaded={!loading}>
        <FilterSearch handleSearchKey={handleSearchKey} />
      </Skeleton>
      <Skeleton rounded="md" startColor={useColorModeValue('lightgray', 'lightdark2')} endColor={useColorModeValue('gray.100', 'lightdark1')} isLoaded={!loading}>
        {!filterSong.length ? <Empty /> : <TableChart type="song" data={filterSong} />}
      </Skeleton>
    </Stack>
  )
}
export default Song;