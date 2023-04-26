import CustomFonts from '@/components/Globals/CustomFonts'
import GlobalStyles from '@/components/Globals/Styles'
// import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'
import { MoralisProvider } from 'react-moralis'

export default function App({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={`${process.env.NEXT_PUBLIC_MORALIS_APPID}`}
      serverUrl={`${process.env.NEXT_PUBLIC_MORALIS_SERVERURL}`}
    >
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
    </MoralisProvider>
  )
}
