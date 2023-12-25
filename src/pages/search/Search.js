import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  Text,
  Heading,
  Stack,
  Skeleton,
  useToast
} from "@chakra-ui/react";
import queryString from 'query-string';
import SearchBar from '../../components/SearchBar'
import Main from '../../layouts/Main';
import LoginSpotify from '../../components/LoginSpotify';
import { CardArtists, CardAlbums, CardPlaylists, CardTracks } from './CardSearch';
import Loading from '../../components/Loading';
import SearchCategory from './Category';
import RateLimit from '../../components/RateLimit';
import { refreshAccessToken } from '../../spotify/RefreshToken';

const Search = () => {
  const accessToken = window.localStorage.getItem("token");
  const reToken = window.localStorage.getItem("refresh_token");
  const [value, setValue] = useState("taylorswift")
  const [loading, setLoading] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [tracks, setTracks] = useState([])
  const [retryAfter, setRetryAfter] = useState(false)
  const toast = useToast()

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  useEffect(() => {
    const handleAuth = async () => {
      const params = queryString.parse(window.location.search)
      const code = params.code;
      if (code) {
        await getToken(code);
      } else {
        if(reToken) {
          await refreshAccessToken(reToken)
        }
      }
    }

    handleAuth()
  }, [reToken])

  const getToken = async (code) => {
    const clientId = `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}`;
    const redirectUri = 'http://localhost:3000/search';
    const clientSecret = `${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`;
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`,
      });
      const data = await response.json();
      if(data.access_token !== undefined) {
        console.log(data)
        window.localStorage.setItem("token", data.access_token)
        window.localStorage.setItem("refresh_token", data.refresh_token)
        window.location.href = "/"
      } 
    } catch(err) {
      console.error("error")
    }
  };

  const handleLogin = () => {
    const clientId = 'ff5220ddf3304e469f8860007b924ffe';
    const redirectUri = 'http://localhost:3000/search';
    const scopes = ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-read-currently-playing'];
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scopes.join('%20')}`;

    window.location.href = authUrl;
  };

  const sortTopData = (data, max) => {
    const sortItems = data.sort((a, b) => b.value - a.value)
    return sortItems.slice(0, max) 
  }

  useEffect(() => {
    async function getSearch() {
      if(accessToken) {
        const authParamaters = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }
        try {
          if (value.length > 0 && artists) {
            const request = await fetch(`https://api.spotify.com/v1/search?q=${value}&type=artist%2Calbum%2Cplaylist%2Ctrack`, authParamaters)
            if (request.status === 429) {
              setRetryAfter(true)
            }
            const resp = await request.json()
            const dataArtists = resp.artists?.items
            const dataAlbums = resp.albums?.items
            const dataPlaylists = resp.playlists?.items
            const dataTracks = resp.tracks?.items
            setArtists(sortTopData(dataArtists, 5))
            setAlbums(sortTopData(dataAlbums, 5))
            setPlaylists(sortTopData(dataPlaylists, 5))
            setTracks(sortTopData(dataTracks, 3))
            setLoading(false)
          }
        } catch(err) {
          console.error("error")
        }
      }
    }

    getSearch()
  }, [artists, albums, playlists,value, accessToken, tracks]);

  useEffect(() => {
    document.title = `${accessToken ? `Search` : `Login`} | Emortfy`  
    if (retryAfter) {
      toast({
        position: 'bottom',
        duration: 6000,
        render: () => (
          <RateLimit />
        ),
      })
    }
  })
  return (
    <Main>
      {accessToken ? 
        <Stack direction="column" spacing={3} py={{ base: 0, sm: 2, md: 4, lg: 6 }} >
          <Heading size="lg" fontWeight="bold" >Search</Heading>
          <SearchBar
          
            value={value}
            handleSearchKey={handleChange}
            handleFocus={() => setIsFocused(true)}
            handleBlur={() => setIsFocused(false)}
            focus={isFocused}
          />

          <SearchCategory 
            all={
              <Stack spacing={8} mx={-4}>
                <Stack spacing={3}>
                  <Text fontSize="xl" fontWeight="semibold" >Artists</Text>
                  {loading ? <Loading /> : <CardArtists value={value} data={artists} type="artist" />}
                </Stack>

                <Stack spacing={3}>
                  <Text fontSize="xl" fontWeight="semibold" >Songs</Text>
                  {loading ? <Loading /> : <CardTracks value={value} data={tracks} type="track" />}
                </Stack>

                <Stack spacing={3}>
                  <Text fontSize="xl" fontWeight="semibold" >Albums</Text>
                  {loading ? <Loading /> : <CardAlbums value={value} data={albums} type="album" />}
                </Stack>

                <Stack spacing={3}>
                  <Text fontSize="xl" fontWeight="semibold" >Playlists</Text>
                  {loading ? <Loading /> : <CardPlaylists value={value} data={playlists} type="playlist" />}
                </Stack>

              </Stack> 
            }
            artists={
              <Stack spacing={3} mx={-4}>
                <Text fontSize="xl" fontWeight="semibold" >Artists</Text>
                {loading ? <Loading /> : <CardArtists value={value} data={artists} type="artist" />}
              </Stack>
            }

            tracks={
              <Stack spacing={3} mx={-4}>
                <Text fontSize="xl" fontWeight="semibold" >Songs</Text>
                {loading ? <Loading /> : <CardTracks value={value} data={tracks} type="track" />}
              </Stack>
            }
            albums={
              <Stack spacing={3} mx={-4}>
                <Text fontSize="xl" fontWeight="semibold" >Albums</Text>
                {loading ? <Loading /> : <CardAlbums value={value} data={albums} type="album" />}
              </Stack>
            }
            playlists={
              <Stack spacing={3} mx={-4}>
                <Text fontSize="xl" fontWeight="semibold" >Playlists</Text>
                {loading ? <Loading /> : <CardPlaylists value={value} data={playlists} type="playlist" />}
              </Stack>
            }
          />

        </Stack>
        : 
        <LoginSpotify handleClick={handleLogin} />
      }
    </Main>
  );
};

export default Search;