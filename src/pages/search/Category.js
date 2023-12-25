import {
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";

const SearchCategory = ({all, artists, tracks, albums, playlists}) => {
  return (
    <>
      <Tabs variant='unstyled ' >
        <TabList >
          <Stack direction="row" pt="2" pb="5" spacing={{ base: 2, md: 3 }} overflowY={"auto"}>
            <Tab
              _selected={{ color: 'white', bg: "primaryblue", }}
              bg={useColorModeValue('#F1F2F6', "whiteAlpha.200")}
              rounded="lg"
              _focus={{ boxShadow: "none" }}
              fontSize="13px"
            >
              All
            </Tab>
            <Tab
              _selected={{ color: 'white', bg: "primaryblue", }}
              bg={useColorModeValue('#F1F2F6', "whiteAlpha.200")}
              rounded="lg"
              pb={2}
              _focus={{ boxShadow: "none" }}
              fontSize="13px"
            >
              Artists
            </Tab>
            <Tab
              _selected={{ color: 'white', bg: "primaryblue" }}
              bg={useColorModeValue('#F1F2F6', "whiteAlpha.200")}
              rounded="lg"
              _focus={{ boxShadow: "none", outline: "none" }}
              fontSize="13px"
            >
              Songs
            </Tab>
            <Tab
              _selected={{ color: 'white', bg: "primaryblue" }}
              rounded="lg"
              bg={useColorModeValue('#F1F2F6', "whiteAlpha.200")}
              _focus={{ boxShadow: "none", outline: "none" }}
              fontSize="13px"
            >
              Albums
            </Tab>
            <Tab
              _selected={{ color: 'white', bg: "primaryblue" }}
              rounded="lg"
              mt={2}
              bg={useColorModeValue('#F1F2F6', "whiteAlpha.200")}
              _focus={{ boxShadow: "none", outline: "none" }}
              fontSize="13px"
            >
              Playlists
            </Tab>
          </Stack>
        </TabList>


        <Divider />

        <TabPanels align="start" >
          <TabPanel>
            {all}
          </TabPanel>
          <TabPanel>
            {artists}
          </TabPanel>
          <TabPanel>
            {tracks}
          </TabPanel>
          <TabPanel>
            {albums}
          </TabPanel>
          <TabPanel>
            {playlists}
          </TabPanel>
        </TabPanels>

      </Tabs>
    </>
  )
}
export default SearchCategory;