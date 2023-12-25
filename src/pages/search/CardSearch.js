import { 
  Stack,
  Box,
  Image,
  Heading,
  Text,
  SimpleGrid,
  chakra,
  useColorMode, 
} from "@chakra-ui/react";
import Empty from "../../components/Empty";

const CardArtists = ({value, data, type}) => {
  const { colorMode } = useColorMode()
  const followers = data.map((item) => {
    const lenFollowers = item.followers?.total.toString().length
    if (lenFollowers <= 4) {
      return item.followers?.total.toLocaleString("id-ID") 
    } else if (lenFollowers === 5) {
      return item.followers?.total.toString().slice(0, 2) + "K"
    } else if(lenFollowers === 6) {
      return item.followers?.total.toString().slice(0, 3) + "K"
    } else if (lenFollowers === 7) {
      return item.followers?.total.toString().slice(0, 1) + "M"
    } else if (lenFollowers === 8) {
      return item.followers?.total.toString().slice(0, 2) + "M"
    }  else if (lenFollowers === 9) {
      return item.followers?.total.toString().slice(0, 3) + "M"
    } else if (lenFollowers === 10) {
      return item.followers?.total.toString().slice(0, 1) + "B"
    } else if (lenFollowers === 11) {
      return item.followers?.total.toString().slice(0, 2) + "B"
    }

    return "N/A";
  })

  return (
    <>
      <SimpleGrid
        columns={[2, 3, 4, 5]}
        spacing={{ base: 5, xl: 7 }}
      >
        {
          data.map((data, i) => (
            <chakra.a href={data.external_urls?.spotify} target="_blank">
              <Box bg="lightgray" _dark={{ bg: "lightdark1", borderColor: "whiteAlpha.200" }} border="1px" borderColor="gray.200" rounded="lg" p={{ base: 4, md: 5 }} key={data.id} >
                <Box display="flex" justifyContent="space-between"  >
                  <Box _hover={{ cursor: "pointer" }} textAlign="center" >
                    <Image width={{base: "80px", md: "100px"}} height={{base: "80px", md: "100px"}}  src={data.images[0]?.url.length > 0 ? data.images[0]?.url : "https://i.scdn.co/image/ab6761610000e5ebc2fb4b8e035fbdad27da865f"} />
                  </Box>
                  <Image src={`/assets/spotify_icons/icons/${colorMode === "dark" ? `white.png` : `black.png`}`} width={{base: "26px",md: "30px"}} height={{base: "26px",md: "30px"}} />
                </Box>

                <Stack spacing={1} display="flex" mt={5} alignItems={{base: "center", md:"baseline"}} textAlign={{base: "center", md:"left"}}>
                  <Heading fontSize={{ base: 'sm', lg: 'md' }} fontWeight="semibold" noOfLines={1} textOverflow="ellipsis" >{data.name ? data.name : "-"}</Heading>
                  <Text fontSize={{ base: "xs", lg: "sm" }} color="gray.700" _dark={{ color: "ptext" }} textTransform="capitalize">{data.type ? data.type : "-"}</Text>
                </Stack>

                <Stack mt={2} spacing={2}>
                  <Stack direction={{base: "column" ,md:"row"}} alignItems={"center"} textAlign={{base: 'center', md: "left"}} border="1px" px={3} py={2} fontSize={{base: 'xs',lg:'13px'}} borderColor="gray.300" _dark={{borderColor: "whiteAlpha.200", color: "ptext"}} fontWeight="medium" rounded="md" color="gray.700"  _focus={{ boxShadow: "none" }}>
                    <chakra.svg xmlns="http://www.w3.org/2000/svg" width={{base: "5", md: "6"}} height={"6"} fill="#0050FF" className="bi bi-person-fill" viewBox="0 0 16 16">
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </chakra.svg>
                    <Stack direction={{base: "row",md:"column", lg: "row"}} spacing={{base: 1, md: 0, lg: 1}}>
                      <Text color="black" _dark={{ color: "white" }}>{followers[i] ? followers[i] : "-"}</Text>
                      <Text>Followers </Text>
                    </Stack>
                  </Stack>

                  <Stack direction={{base: "column" ,md:"row"}} alignItems={"center"} textAlign={{base: 'center', md: "left"}} border="1px" px={3} py={2} fontSize={{base: 'xs',lg:'13px'}} borderColor="gray.300" _dark={{borderColor: "whiteAlpha.200", color: "ptext"}} fontWeight="medium" rounded="md" color="gray.700"  _focus={{ boxShadow: "none" }}>
                    <Box px={1} color="primaryblue">
                      <i className="fa-solid fa-music fa-lg"></i>
                    </Box>
                    <Text color="black" _dark={{ color: "white" }} textTransform="capitalize" noOfLines={1} textOverflow="ellipsis">{data.genres[0] ? data.genres[0] : "-"}</Text>
                  </Stack>
                  
                </Stack>
              </Box>
            </chakra.a>
          ))
        }
      </SimpleGrid>
    </>
  )
}

const CardTracks = ({ value, data, type }) => {
  const { colorMode } = useColorMode()
  const nameArtist = data.map((item) => {
    return item.artists.map((artist) => {
      return artist.name;
    });
  }); // ['artist1', 'artist2', 'artist3']  

  const duration = data.map((item) => {
    const ms = item.duration_ms
    const second = Math.floor(ms / 1000)
    const minute = Math.floor(second / 60)
    const hour = Math.floor(minute / 60)

    const minuteToSecond = minute * 60
    const hourToMinute = hour * 60
    const remainSecond = second - minuteToSecond
    const remainMinute = minute - hourToMinute

    if (hour !== 0) {
      if (remainSecond.toString().length <= 1) {
        if(remainMinute.toString().length <= 1) {
          return `${hour}:0${remainMinute}:0${remainSecond}`
        }

        return `${hour}:${remainMinute}:0${remainSecond}`
      }

      if (remainMinute.toString().length <= 1) {
        return `${hour}:0${remainMinute}:${remainSecond}`
      }

      return `${hour}:${remainMinute}:${remainSecond}`
    } else {
      if(remainSecond.toString().length <= 1) {
        return `${minute}:0${remainSecond}`
      } 

      return `${minute}:${remainSecond}`
    }
  })

  return (
    <>
      {
        value.length > 0 && data ?
          <SimpleGrid
            columns={[1, 1, 2, 3]}
            spacing={{ base: 3, xl: 5 }}
          >
            {
              data.map((data, i) => (
                <chakra.a href={data.external_urls?.spotify} target="_blank">
                  <Box bg="lightgray" _dark={{ bg: "lightdark1", borderColor: "whiteAlpha.200" }} 
                  border="1px" borderColor="gray.200" rounded="lg" p={{ base: 3, md: 3 }} key={data.id}>
                    <Stack mb={3} direction="row" alignItems="center" justifyContent="space-between">
                      <Image src={`/assets/spotify_icons/logos/${colorMode === "dark" ? `white.png` : `black.png`}`} width="90px" />
                      <Box fontSize={"xs"} _dark={{ borderColor: "whiteAlpha.200" }} px={3} py={2} rounded="md"
                        border="1px" borderColor="gray.200" fontWeight="medium" textTransform="capitalize" >LISTEN ON SPOTIFY
                      </Box>
                    </Stack>
                    <Stack direction="row" color="gray.700" _dark={{ color: "ptext" }} spacing={3} alignItems="center" justifyContent="space-between" >
                      <Stack direction="row" alignItems="center" spacing={3}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                          <Box boxSize={"55px"} _hover={{ cursor: "pointer" }} textAlign="center">
                            <Image width="55px" height="55px" src={data.album?.images[0]?.url.length > 0 ? data.album?.images[0]?.url : "https://i.scdn.co/image/ab6761610000e5ebc2fb4b8e035fbdad27da865f"} />
                          </Box>
                        </Box>
                        <Stack spacing={1} display="flex" mt={3} alignItems="baseline" textAlign="left">
                          <Heading fontSize={'sm'} fontWeight="semibold" noOfLines={1} maxW="170px" textOverflow="ellipsis" >{data.name ? data.name : "-"}</Heading>
                          <Text fontSize={'xs'} color="gray.700" _dark={{ color: "ptext" }} noOfLines={1} textOverflow="ellipsis" maxW="150px" textTransform="capitalize">{nameArtist[i] ? nameArtist[i].join(', ') : "-"}</Text>
                        </Stack>
                      </Stack>

                      <Text fontSize={'xs'} color="gray.700" _dark={{ color: "ptext" }} maxW="50px" noOfLines={1} textOverflow="ellipsis" textTransform="capitalize">{duration[i] ? duration[i] : "-"}</Text>

                    </Stack>
                  </Box>
                </chakra.a>
              ))
            }
          </SimpleGrid>
          : <Empty />
      }
    </>
  )
}


const CardAlbums = ({ value, data, type }) => {
  const { colorMode } = useColorMode()
  return (
    <>
        {
          value.length > 0 && data ? 
          <SimpleGrid
            columns={[2, 3, 4, 5]}
            spacing={{ base: 5, xl: 7 }}
          >
            {
              data.map((data) => (
                <chakra.a href={data.external_urls?.spotify} target="_blank">
                  <Box bg="lightgray" _dark={{ bg: "lightdark1", borderColor: "whiteAlpha.200" }} border="1px" borderColor="gray.200" rounded="lg" px={{ base: 3, md: 4 }} pt={{ base: 2, md: 3 }} pb={{ base: 3, md: 4 }}  key={data.id} >
                    <Box pb={3} display="flex" justifyContent="center" alignItems="center">
                      <Image src={`/assets/spotify_icons/logos/${colorMode === "dark" ? `white.png` : `black.png`}`} width="70px"  />
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                      <Box boxSize={"auto"}  _hover={{ cursor: "pointer" }} textAlign="center">
                        <Image src={data.images[0]?.url.length > 0 ? data.images[0]?.url : "https://i.scdn.co/image/ab6761610000e5ebc2fb4b8e035fbdad27da865f"}  />
                      </Box>
                    </Box>

                    <Stack spacing={1} display="flex" mt={3} alignItems="baseline" textAlign="left">
                      <Heading fontSize={{ base: 'sm', lg: 'md' }} fontWeight="semibold" noOfLines={1} textOverflow="ellipsis" >{data.name ? data.name : "-"}</Heading>
                      <Stack  direction={"row"} justifyContent="space-between" color="gray.700" _dark={{ color: "ptext" }} fontSize={{base: 'xs',lg:'13px'}}>
                        <Text noOfLines={1} textOverflow="ellipsis">{data.artists[0]?.name ? data.artists[0]?.name : "-"}</Text>
                        <Text>-</Text>
                        <Text>{data.release_date.split('-')[0] ? data.release_date.split('-')[0] : "-"}</Text>
                      </Stack>
                    </Stack>
                    
                    <Stack mt={2} direction={"row"} alignItems={"center"} textAlign={{ base: 'center', md: "left" }} border="1px" px={3} py={2} fontSize={{ base: 'xs', lg: '13px' }} borderColor="gray.300" _dark={{ borderColor: "whiteAlpha.200", color: "ptext" }} fontWeight="medium" rounded="md" color="gray.700" _focus={{ boxShadow: "none" }}>
                      <chakra.svg xmlns="http://www.w3.org/2000/svg" width={{ base: "5", md: "6" }} height={"5"} fill="#0050FF" className="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2" />
                        <path fill-rule="evenodd" d="M9 3v10H8V3z" />
                        <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5z" />
                      </chakra.svg>
                      <Stack direction={"row"} spacing={1} >
                        <Text color="black" _dark={{ color: "white" }} >{data.total_tracks ? data.total_tracks : "-"}</Text>
                        <Text>{data.total_tracks > 1 ? "Tracks"  : "Track"}</Text>
                      </Stack>
                    </Stack>

                  </Box>
                </chakra.a>
              ))
            }
          </SimpleGrid> 
          : <Empty />
        }
    </>
  )
}

const CardPlaylists = ({ value, data, type }) => {
  const { colorMode } = useColorMode()
  return (
    <>
      {
        value.length > 0 && data ?
        <SimpleGrid
          columns={[2, 3, 4, 5]}
          spacing={{ base: 5, xl: 7 }}
        >
          {
            data.map((data) => (
              <chakra.a href={data.external_urls?.spotify} target="_blank">
                <Box bg="lightgray" _dark={{ bg: "lightdark1", borderColor: "whiteAlpha.200" }} border="1px" borderColor="gray.200" rounded="lg" px={{ base: 3, md: 4 }} pt={{ base: 2, md: 3 }} pb={{ base: 3, md: 4 }} key={data.id} >
                  <Box pb={3} display="flex" justifyContent="center" alignItems="center">
                    <Image src={`/assets/spotify_icons/logos/${colorMode === "dark" ? `white.png` : `black.png`}`} width="70px" />
                  </Box>
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <Box boxSize={"auto"} _hover={{ cursor: "pointer" }} textAlign="center">
                      <Image src={data.images[0]?.url.length > 0 ? data.images[0]?.url : "https://i.scdn.co/image/ab6761610000e5ebc2fb4b8e035fbdad27da865f"}  />
                    </Box>
                  </Box>

                  <Stack spacing={1} display="flex" mt={3} alignItems="baseline" textAlign="left">
                    <Heading fontSize={{ base: 'sm', lg: 'md' }} fontWeight="semibold" noOfLines={1} textOverflow="ellipsis" >{data.name ? data.name : "-"}</Heading>
                    <Text fontSize={{ base: 'xs', lg: '13px' }} color="gray.700" _dark={{ color: "ptext" }} noOfLines={1} textOverflow="ellipsis" textTransform="capitalize">By {data.owner.display_name ? data.owner.display_name : "-"}</Text>
                  </Stack>

                  <Stack mt={2} direction={"row"} alignItems={"center"} textAlign={{ base: 'center', md: "left" }} border="1px" px={3} py={2} fontSize={{ base: 'xs', lg: '13px' }} borderColor="gray.300" _dark={{ borderColor: "whiteAlpha.200", color: "ptext" }} fontWeight="medium" rounded="md" color="gray.700" _focus={{ boxShadow: "none" }}>
                    <chakra.svg xmlns="http://www.w3.org/2000/svg" width={{ base: "5", md: "6" }} height={"5"} fill="#0050FF" className="bi bi-person-fill" viewBox="0 0 16 16">
                      <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2" />
                      <path fill-rule="evenodd" d="M9 3v10H8V3z" />
                      <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5z" />
                    </chakra.svg>
                    <Stack direction={"row"} spacing={1} >
                      <Text color="black" _dark={{ color: "white" }} >{data.tracks.total ? data.tracks.total : "-"}</Text>
                      <Text>{data.tracks.total > 1 ? "Tracks" : "Track"}</Text>
                    </Stack>
                  </Stack>

                </Box>
              </chakra.a>
            ))
          }
        </SimpleGrid>
        : <Empty />
      }
    </>
  )
}


export { CardArtists , CardAlbums, CardPlaylists, CardTracks};