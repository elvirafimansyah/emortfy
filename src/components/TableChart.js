import { useEffect, useState } from 'react';
import {
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useColorModeValue,
} from "@chakra-ui/react"

const TableChart = ({type, data}) => {
  const mediaMatch = window.matchMedia('(min-width: 900px)');
  const [matches, setMatches] = useState(mediaMatch.matches);
  const matchHandler = e => setMatches(e.matches);

  const tableRow = desktop => ({
    textTransform: 'capitalize',
    fontSize: desktop ? '15px' : '13px',
    paddingBottom: desktop ? "15px" : null,
    paddingTop: desktop ? "15px" : null,
    whiteSpace: desktop ? "normal" : null,
  });
  const headerStyle = ({
    color: useColorModeValue("gray.700", "ptext"),
    fontWeight: "500",
  });
  const midStyle = ({
    color: useColorModeValue("#1A202C", "white"),
    fontWeight: "500",
  });
  const rankStyle = ({
    color: "#0050FF",
    fontWeight: "500",
  })
  const borderSytle = ({
    borderBottom: "border",
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    borderBottomColor: "whiteAlpha.200"
  })

  useEffect(() => {
    mediaMatch.addEventListener('change', () => {
      window.location.reload()
      return matchHandler
    } );
  
    return () => mediaMatch.removeEventListener('change', matchHandler)
    
  })

  return (
    <>
      <TableContainer rounded="md"  >
        <Table variant='variant' >
          <Thead bg={useColorModeValue("lightgray", "lightdark2")} key={type}>
            {type === "listener" ? 
              <Tr >
                <Th style={Object.assign(headerStyle, tableRow(matches))}>#</Th>
                <Th style={Object.assign(headerStyle, tableRow(matches))}>Artist Name</Th>
                <Th isNumeric style={Object.assign(headerStyle, tableRow(matches))}>Listeners</Th>
                <Th isNumeric style={Object.assign(headerStyle, tableRow(matches))}>Peak</Th>
                <Th isNumeric style={Object.assign(headerStyle, tableRow(matches))}>Daily Trend</Th>
                <Th isNumeric style={Object.assign(headerStyle, tableRow(matches))}>PkListeners</Th>
              </Tr>
              : type === "artist" ? 
              <Tr >
                <Th style={Object.assign(headerStyle, tableRow(matches))}>#</Th>
                <Th style={Object.assign(headerStyle, tableRow(matches))}>Artist Name</Th>
                <Th isNumeric style={Object.assign(headerStyle, tableRow(matches))}>Streams</Th>
                <Th isNumeric style={Object.assign(headerStyle, tableRow(matches))}>Daily</Th>
                <Th isNumeric style={Object.assign(headerStyle, tableRow(matches))}>AsLead</Th>
                <Th isNumeric style={Object.assign(headerStyle, tableRow(matches))}>Solo</Th>
                <Th isNumeric style={Object.assign(headerStyle, tableRow(matches))}>AsFeature</Th>
              </Tr> 
              : type === "album" ?
              <Tr >
                <Th style={Object.assign(headerStyle, tableRow(matches))}>#</Th>
                <Th style={Object.assign(headerStyle, tableRow(matches))}>Album</Th>
                <Th isNumeric style={Object.assign(headerStyle, tableRow(matches))}>Streams</Th>
                <Th isNumeric style={Object.assign(headerStyle, tableRow(matches))}>Daily</Th>
              </Tr> 
              :
              <Tr >
                <Th style={Object.assign(headerStyle, tableRow(matches))}>Category</Th>
                <Th style={Object.assign(headerStyle, tableRow(matches))}>Artist Name</Th>
                <Th style={Object.assign(headerStyle, tableRow(matches))}>Title</Th>
                <Th isNumeric style={Object.assign(headerStyle, tableRow(matches))}>Streams</Th>
              </Tr>
            }
              
          </Thead>
          <Tbody bg={useColorModeValue("gray.50", "lightdark1")}>
            {data.map((data, index) => (
              data &&
              <Tr key={data.id}>
                {type === "listener" || type === "artist" || type === "album" ? <Th style={Object.assign(rankStyle, tableRow(matches), borderSytle)}>{data.id}</Th> : null}
                <Th style={Object.assign(type === "song" ?  rankStyle : midStyle, tableRow(matches), borderSytle)}>
                  {
                    type === "listener" ? data.artist :
                    type === "artist" ? data.artist :
                    type === "album" ? data.album :
                    data.category
                  }
                </Th>
                <Th isNumeric style={Object.assign(midStyle, tableRow(matches), borderSytle)}>
                  {
                    type === "listener" ? data.listeners : 
                    type === "artist" ? data.streams : 
                    type === "album" ? data.streams ? data.streams.toLocaleString('id-ID') : "-" :
                    data.title.split(' - ')[0]
                  }
                </Th>
                <Th isNumeric style={Object.assign(midStyle, tableRow(matches), borderSytle)}>
                  {
                    type === "listener" ? data.peak : 
                    type === "artist" ? data.daily ? data.daily.toLocaleString('id-ID') : "-" :  
                    type === "album" ? data.daily ? data.daily.toLocaleString("id-ID") : "-" :
                    data.title.split(' - ')[1]
                  }
                </Th>
                {
                  type !== "album" ? 
                    <Th isNumeric style={Object.assign(midStyle, tableRow(matches), borderSytle)}>
                      {
                        type === "listener" ? data.dailytrend :
                        type === "artist" ? data.aslead :
                        data.streams
                      }
                  </Th> 
                  : null
                }
                {type === "artist" ? 
                  <Th isNumeric style={Object.assign(midStyle, tableRow(matches), borderSytle)}>
                    {
                      data && typeof data.solo === "string" ? data.solo.includes('-') ? "-" : 
                      data.solo : 
                      "-" 
                    }
                  </Th> 
                  : null 
                }
                {type === "listener" || type === "artist" ? 
                  <Th isNumeric style={Object.assign(midStyle, tableRow(matches), borderSytle)}>
                    {
                      type === "listener" ? data.pklisteners :
                        type === "artist" ? data && typeof data.asfeature === "string" ? data.asfeature.includes('-') ? "-" :
                          data.asfeature :
                          "-" :
                          null
                    }
                  </Th> 
                  : null
                }

              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableChart;