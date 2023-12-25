import { useEffect, useState } from "react"
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

const Artists = () => {
  const [artist, setArtist] = useState([]);
  const [filterArtist, setFilterArtist] = useState([]);
  const [update, setUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("")

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
        if (artist) {
          const lastUpdate = artist[0].lastupdate
          const dateUpdate = new Date(lastUpdate).toLocaleString("en-US")
          setUpdate(dateUpdate)
        }
        setLoading(false)
      } catch(err) {
        console.error("error")
      }
    }
    getArtist()
    
  }, [artist])

  useEffect(() => {
    const filteredData = artist.filter(({ artist, id }) => artist.toLowerCase().trim().includes(value.toLowerCase().trim()) || id.toString().includes(value))
    setFilterArtist(filteredData)

  }, [artist, value])

  return(
    <Stack mx={-4}>
      <TitleChart title="Spotify Most Streamed Artists of All Time" time={update} />
      <Skeleton rounded="md" startColor={useColorModeValue('lightgray', 'lightdark2')} endColor={useColorModeValue('gray.100', 'lightdark1')} isLoaded={!loading}>
        <FilterSearch handleSearchKey={handleSearchKey} />
      </Skeleton>
      <Skeleton rounded="md" startColor={useColorModeValue('lightgray', 'lightdark2')} endColor={useColorModeValue('gray.100', 'lightdark1')} isLoaded={!loading}>
        {!filterArtist.length ? <Empty /> : <TableChart type="artist" data={filterArtist} />}
      </Skeleton>
    </Stack>
  )
}
export default Artists;