import { useEffect, useState } from "react";
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

const Listeners = () => {
  const [listener, setListener] = useState([]);
  const [filterListener, setFilterListener] = useState([]);
  const [update, setUpdate] = useState(null)
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("")
  
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
  
  useEffect(() => {
    const filteredData = listener.filter(({ artist, id }) => artist.toLowerCase().trim().includes(value.toLowerCase().trim()) || id.toString().includes(value))
    setFilterListener(filteredData)
    
  }, [listener, value])

  return(
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
    </Stack>
  )
}
export default Listeners;