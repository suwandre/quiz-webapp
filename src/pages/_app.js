import CustomFonts from '@/components/Globals/CustomFonts'
import GlobalStyles from '@/components/Globals/Styles'
// import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
        fontFamily: 'Chakra Petch, sans-serif',
        loader: 'oval', 
      }}
    >
      <GlobalStyles />
      <CustomFonts />
      <Component {...pageProps} />
    </MantineProvider>
  )
}
