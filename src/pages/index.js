import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Button, Flex, Text, createStyles } from '@mantine/core'
import { useMoralis } from 'react-moralis'
import { useRouter } from 'next/router'
import handleAuth from '@/utils/handleAuth'
import { useEffect, useState } from 'react'
import MetamaskLogo from '../../public/Metamask.png'

const useStyles = createStyles((theme) => ({
  walletButton: {
      marginTop: 10,
      backgroundColor: '#42ca9f',
      width: '20%',
      minHeight: '60px',

      '&:hover': {
          transform: 'scale(1.01) translate(1px, -3px)',
          transitionDuration: '200ms',
          backgroundColor: '#42ca9f',
      },

      '&:active': {
          transform: 'translateY(2px)',
      }
  },

  image: {
      marginRight: 15,
  }
}));

export default function Home() {
  const { enableWeb3, isAuthenticated, authenticate, user, Moralis } = useMoralis();
  const router = useRouter();

  const { classes } = useStyles();

  const [ authError, setAuthError ] = useState(false);
  const [ isAuthenticating, setIsAuthenticating ] = useState(false);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push('/start');
    }, 3000)

    return () => clearTimeout(redirectTimer);
  }, [router])

  if (!isAuthenticated || !user) {
    return (
      <Flex
          gap='md'
          justify='center'
          align='center'
          direction='column'
      >
        <Button className={classes.walletButton} onClick={() => handleAuth(
          setAuthError,
          setIsAuthenticating,
          enableWeb3,
          Moralis,
          authenticate,
          'metamask'
        )}>
          <Image src={MetamaskLogo} alt='metamask logo' width={48} height={48} className={classes.image} />
          Login with Metamask to start.
        </Button>
      </Flex>
    )
  } else {
    return (
      <Flex
          gap='md'
          justify='center'
          align='center'
          direction='column'
      >
        <Text>Welcome, <Text span c='#42ca9f'>{user && user.attributes.ethAddress}!</Text></Text>
        <Text>Logging you in. Please wait a few seconds...</Text>
      </Flex>
    )
  }
}
