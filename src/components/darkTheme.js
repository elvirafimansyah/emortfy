import { extendTheme } from '@chakra-ui/react';
// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// 3. extend the theme
const darkTheme = extendTheme({ 
  config,
  fonts: {
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
    heading: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
  },
  colors: {
    bg_putih: "#F8FAFC",
    bg: "#121212",
    line: "#2D3748",
    primaryblue: "#0050FF",
    lightdark1: "#181818",
    ptext: "#CBD5E0",
    abu: "#9CA3AF" ,
    darkblue: "#0049EA",
    lightdark2: "#222222",
    lightgray: "#F1F2F6"
  },
  sizes: {
    test: "38rem",
    container: {
      'xs': "1210px"
    }
  },
  styles: {
    global: ({ colorMode }) => ({
      body: {
        bg: colorMode === "light" ? "white" : "bg",
      },
    }),
  }
})




export default darkTheme;