import { Box, Button, Flex, Text, createStyles } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';

const useStyles = createStyles((theme) => ({
    walletButton: {
        marginTop: 10,
        backgroundColor: '#42ca9f',
        width: '100%',
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

const Start = () => {
    const { classes } = useStyles();
    const [userStats, setUserStats] = useState({});
    const { isAuthenticated, user, logout } = useMoralis();

    const router = useRouter();

    if (!isAuthenticated || !user) () => router.replace('/')

    const getUserStats = async () => {
        try {
            const rawResponse = await fetch(`https://simple-quiz-webapp.herokuapp.com/quiz/getUserStats/${user && user.attributes.ethAddress}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            
            const response = await rawResponse.json();
            console.log(response)
            setUserStats({ 
                address: user && user.attributes.ethAddress, 
                highestPoints: response['highestPoints'], 
                lowestPoints: response['lowestPoints'], 
                quizzesDone: response['quizzesDoneAmount'], 
                averagePoints: response['averagePoints'] 
            });
        } catch (err) {
            throw err;
        }
    }

    const logoutUser = () => {
        logout();

        router.replace('/');
    }

    useEffect(() => {
        getUserStats();
    }, [])

    return (
        <Flex
          gap='md'
          justify='center'
          align='center'
          direction='column'
          style={{margin: 'auto', marginTop: '10%'}}
        >
            <Box
                sx={(theme) => ({
                    border: '3px solid #42ca9f',
                    borderRadius: theme.radius.md,
                    width: '40%'
                })}
            >
                <Flex
                    gap='md'
                    justify='center'
                    align='center'
                    direction='column'
                    style={{ marginBottom: 20}}
                >
                    <Text
                        sx={(theme) => ({
                            fontSize: 50,
                            fontWeight: 500,
                        })}
                    >
                        Your profile
                    </Text>
                    <Text>Quizzes played: {userStats['quizzesDone']}</Text>
                    <Text>Highest score: {userStats['highestPoints']}</Text>
                    <Text>Lowest score: {userStats['lowestPoints']}</Text>
                    <Text>Average score: {userStats['averagePoints']}</Text>
                    <Flex
                        gap='md'
                        justify='center'
                        align='center'
                        direction='row'
                    >
                        <Button
                            className={classes.walletButton}
                            style={{ marginRight: 50}}
                            onClick={() => router.push('/quiz')}
                        >
                            Start another quiz
                        </Button>
                        <Button 
                            className={classes.walletButton}
                            onClick={() => logoutUser()}
                        >
                            Logout of my wallet
                        </Button>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    )
}

export default Start