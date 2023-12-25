import { 
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Divider,
  useColorModeValue
} from "@chakra-ui/react";

import Artists from "./Artists";
import Listeners from "./Listeners"
import Song from "./Song"
import Albums from "./Albums";

const TabsCharts = (props) => {
  return(
    <>
      <Stack {...props}>
        <Tabs variant='unstyled ' >
          <TabList >
            <Stack direction="row" pt="2" pb="5" spacing={{ base: 2, md: 3 }} overflowY={"auto"} >
              <Tab
                _selected={{ color: 'white', bg: "primaryblue", }}
                bg={useColorModeValue('#F1F2F6', "whiteAlpha.200")}
                rounded="lg"
                _focus={{ boxShadow: "none"}}
                fontSize="13px"
              >
                Listeners
              </Tab>
              <Tab
                _selected={{ color: 'white', bg: "primaryblue" }}
                bg={useColorModeValue('#F1F2F6', "whiteAlpha.200")}
                rounded="lg"
                _focus={{ boxShadow: "none", outline: "none" }}
                fontSize="13px"
              >
                Artists
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
                bg={useColorModeValue('#F1F2F6', "whiteAlpha.200")}
                _focus={{ boxShadow: "none", outline: "none" }}
                fontSize="13px"
              >
                Songs
              </Tab>
            </Stack>
          </TabList>

          <Divider />

          <TabPanels align="start" >
            <TabPanel>
              <Listeners />
            </TabPanel>
            <TabPanel>
              <Artists />
            </TabPanel>
            <TabPanel>
              <Albums />
            </TabPanel>
            <TabPanel>
              <Song />
            </TabPanel>
          </TabPanels>

        </Tabs>
      </Stack>
    </>
  )
}
export default TabsCharts;