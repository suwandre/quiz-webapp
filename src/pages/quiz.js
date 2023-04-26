import { Box, Button, Checkbox, Flex, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';

const { useRouter } = require('next/router');

const Quiz = ({quizDatas}) => {
    const router = useRouter();
    const { isAuthenticated, user } = useMoralis();

    if (!isAuthenticated || !user) () => router.replace('/');

    const [timerSeconds, setTimerSeconds] = useState(0);
    const [clickedStart, setClickedStart] = useState(false);
    const [questionId, setQuestionId] = useState(1);
    // gets updated whenever the user clicks on a checkbox
    const [temporaryChosenAnswers, setTemporaryChosenAnswers] = useState([]);
    const [chosenAnswers, setChosenAnswers] = useState([]);
    // gets updated whenever the user clicks on a checkbox. only temporary, the final points will get added to 'points'.
    const [temporaryPoints, setTemporaryPoints] = useState(0);
    const [points, setPoints] = useState(0);
    // the amount of total points the user could've gotten if answered instantly so far
    const [totalPoints, setTotalPoints] = useState(5000);
    // gets updated whenever the user clicks on the correct checkbox(es). only temporary, the final correct choices will get added to 'correctChoices'.
    const [temporaryCorrectChoices, setTemporaryCorrectChoices] = useState(0);
    const [correctChoices, setCorrectChoices] = useState(0);
    // gets updated whenever the user clicks on the wrong checkbox(es). only temporary, the final wrong choices will get added to 'wrongChoices'.
    const [temporaryWrongChoices, setTemporaryWrongChoices] = useState(0);
    const [wrongChoices, setWrongChoices] = useState(0);
    const [totalCorrectChoices, setTotalCorrectChoices] = useState(0);
    const [quizEnded, setQuizEnded] = useState(false);
    const [removeButton, setRemoveButton] = useState(false);
    const [uploadedScore, setUploadedScore] = useState(false);

    useEffect(() => {
        let timerId;
        
        timerId = setInterval(() => {
            setTimerSeconds((timerSeconds) => timerSeconds - 1);
        }, 1000);
    
        return () => {
            console.log(`Clearing ${timerId}`);
            clearInterval(timerId);
        }
    }, [questionId]);

    const startQuiz = () => {
        setClickedStart(true);
        setTimerSeconds(quizDatas[questionId - 1].duration);
    }

    const finalizeQuiz = () => {
        finalizeCurrentQuestion();
        setQuizEnded(true);
    }

    const nextQuestion = () => {
        if (questionId <= quizDatas.length) {
            finalizeCurrentQuestion();
            setQuestionId(questionId + 1);
            setTemporaryChosenAnswers([]);
            setTemporaryPoints(0);
            setTemporaryCorrectChoices(0);
            setTemporaryWrongChoices(0);
            setTimerSeconds(quizDatas[questionId - 1].duration);
        }
    }

    const handleCheckboxChange = async (e) => {
        // get the time used in seconds
        const duration = quizDatas[questionId - 1].duration;
        const timeUsed = duration - timerSeconds;
        // calculate points earned (linear decrease depending on how much time is used)
        const maxPoints = quizDatas[questionId - 1].maximumPoints;
        const minPoints = quizDatas[questionId - 1].minimumPoints;
        const points = maxPoints - ((maxPoints - minPoints) / duration * timeUsed);

        // // if there are more than 1 correct answers, the logic is different for point deduction.
        const availableAnswers = quizDatas[questionId - 1].answers.length;
        // const correctAnswers = quizDatas[questionId - 1].correctAnswers.length;
        const isCorrect = quizDatas[questionId - 1].correctAnswer.includes(e.target.id);

        console.log('correctAnswer', quizDatas[questionId - 1].correctAnswer);
        console.log('e target id', e.target.id)

        if (e.target.checked) {
            // check if choice is correct
            if (isCorrect) {
                setTemporaryPoints(prevPoints => prevPoints + points);
                setTemporaryCorrectChoices(prevCorrectChoices => prevCorrectChoices + 1);
            } else {
                console.log('not correct!');
                setTemporaryChosenAnswers(answers => answers.filter(answer => answer !== e.target.id));

                // if the answer is wrong, we check first the amount of answers available
                // if there is only 1 answer available:
                // if (availableAnswers === 1) {
                    // remove 1000 points
                    setTemporaryPoints(prevPoints => prevPoints - 1000);
                    setTemporaryWrongChoices(prevWrongChoices => prevWrongChoices + 1);
                // if there is more than 1 answer available
                // } else {
                    console.log('here');
                    // // if correct answer amount is less than half of the available ones, remove only 1000 points
                    // if (correctAnswers < (availableAnswers /2)) {
                    //     setTemporaryPoints(prevPoints => prevPoints - 1000);
                    //     setTemporaryWrongChoices(prevWrongChoices => prevWrongChoices + 1);
                    // } else {
                    //     // if more than half or equal to half, we remove 2000 points.
                    //     setTemporaryPoints(prevPoints => prevPoints - 2000);
                    //     setTemporaryWrongChoices(prevWrongChoices => prevWrongChoices + 1);
                    // }
                // }
            }
            setTemporaryChosenAnswers([...temporaryChosenAnswers, e.target.id]);
        // if the user decides to uncheck the box, this logic will run
        } else {
            // remove points if correct.
            if (isCorrect) {
                setTemporaryPoints(prevPoints => prevPoints - points);
                setTemporaryCorrectChoices(prevCorrectChoices => prevCorrectChoices - 1);
            } else {
                if (availableAnswers === 1) {
                    setTemporaryPoints(prevPoints => prevPoints + 1000);
                    setTemporaryWrongChoices(prevWrongChoices => prevWrongChoices - 1);
                } else {
                    console.log('here');
                }
                // else {
                //     if (correctAnswers < (availableAnswers / 2)) {
                //         setTemporaryPoints(prevPoints => prevPoints + 1000);
                //         setTemporaryWrongChoices(prevWrongChoices => prevWrongChoices - 1);
                //     } else {
                //         setTemporaryPoints(prevPoints => prevPoints + 2000);
                //         setTemporaryWrongChoices(prevWrongChoices => prevWrongChoices - 1);
                //     }
                // }
            }
            // filter through the temporaryChosenAnswers and remove the unchecked answer
            setTemporaryChosenAnswers([...temporaryChosenAnswers.filter((answer) => answer !== e.target.id)]);
        }
    }

    const finalizeCurrentQuestion = () => {
        setPoints(prevPoints => prevPoints + temporaryPoints);
        setChosenAnswers([...chosenAnswers, ...temporaryChosenAnswers]);
        setCorrectChoices(prevCorrectChoices => prevCorrectChoices + temporaryCorrectChoices);
        setWrongChoices(prevWrongChoices => prevWrongChoices + temporaryWrongChoices);
        setTotalCorrectChoices(prevTotalCorrectChoices => prevTotalCorrectChoices + quizDatas[questionId - 1].correctChoices);
    }

    const uploadScore = async () => {
        try {
            const rawResponse = await fetch(`https://simple-quiz-webapp.herokuapp.com/quiz/uploadUserScore`, {
                method: 'POST',
                headers: {
                    'Accept': '*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'address': user && user.attributes.ethAddress,
                    'score': points,
                })
            })

            const response = await rawResponse.json();
            console.log(response);

            setUploadedScore(true);
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        if (quizEnded && !uploadedScore) {
            uploadScore();
        }
    }, [quizEnded])

    const CurrentQuestion = () => {
        if (!quizEnded) {
            return (
                <Box
                    sx={(theme) => ({
                    border: '3px solid #42ca9f',
                    borderRadius: theme.radius.md,
                    width: '40%',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 50,
                    })}
                >
                    <h1>{questionId}. {quizDatas[questionId-1].question}</h1>
                    <Text>Duration: {quizDatas[questionId-1].duration} seconds</Text>
                    <Text>Points obtainable: {quizDatas[questionId-1].minimumPoints} - {quizDatas[questionId-1].maximumPoints}</Text>
                    {timerSeconds > 0 ? <Text sx={(theme) => ({
                        marginBottom: 20,
                    })}>Time left: {timerSeconds} seconds</Text> : questionId < quizDatas.length ? nextQuestion() : <Text sx={(theme) => ({
                        marginBottom: 20,
                    })}>Time is up</Text>}
                    {quizDatas[questionId-1].answers.map((answer) => (
                        <Checkbox
                            sx={(theme) => ({
                                marginTop: 10,
                                height: 30,
                            })}
                            color='#42ca9f'
                            key={answer}
                            id={answer}
                            label={answer}
                            onChange={(e) => handleCheckboxChange(e)}
                            checked={temporaryChosenAnswers.lastIndexOf(answer) >= 0}
                        />
                    ))}
                    {!removeButton 
                        ? questionId !== quizDatas.length
                            ? <Button 
                                sx={(theme) => ({
                                    marginTop: 25,
                                    marginBottom: 25,
                                    backgroundColor: '#42ca9f',
                                    ':hover': {
                                        backgroundColor: '#42ca9f',
                                    }
                                })}
                                onClick={nextQuestion}
                                >
                                Submit answer(s)
                                </Button>
                            : <Button 
                                sx={(theme) => ({
                                    marginTop: 25,
                                    marginBottom: 25,
                                    backgroundColor: '#42ca9f',
                                    ':hover': {
                                        backgroundColor: '#42ca9f',
                                    }
                                })}
                                onClick={() => {finalizeQuiz(); setRemoveButton(true);}}
                                >
                                    End quiz
                                </Button>
                        : <></>
                    }
                </Box>
            );
        } else {
            return (
                <Box
                    sx={(theme) => ({
                    border: '3px solid #42ca9f',
                    borderRadius: theme.radius.md,
                    width: '40%',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    })}
                >
                    <h2>Quiz ended.</h2>
                    <h4>Thanks for playing!</h4>
                    {!quizEnded ? <></> : <Button sx={(theme) => ({
                        backgroundColor: '#42ca9f',
                        ':hover': {
                            backgroundColor: '#42ca9f',
                        },
                        marginTop: 25,
                    })} onClick={() => router.replace('/')}>Return to start page</Button>}
                </Box>
            )
        }
    };

    const CurrentStats = () => {
        return (
            <Box
                sx={(theme) => ({
                border: '3px solid #42ca9f',
                marginTop: 50,
                borderRadius: theme.radius.md,
                width: '35%',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                })}
            >
                <Text sx={(theme) => ({
                    fontSize: 44,
                    fontWeight: 700,
                })}>
                    CURRENT STATS
                </Text>
                <Flex
                    justify='center'
                    align='center'
                    direction='row'
                    sx={(theme) => ({
                        margin: 'auto'
                    })}
                >
                    <Flex
                    justify='center'
                    align='center'
                    direction='column'
                    >
                        <h3>TOTAL POINTS</h3>
                        <p>{points}/{totalPoints}</p>
                    </Flex>
                    <Flex
                    justify='center'
                    align='center'
                    direction='column'
                    sx={(theme) => ({
                        marginLeft: 80
                    })}
                    >
                        <h3>CORRECT CHOICES</h3>
                        <p>{correctChoices}/{correctChoices + wrongChoices}</p>
                    </Flex>          
                </Flex>
            </Box>
        )
    }

    const FinalStats = () => {
        return (
            <Box
                sx={(theme) => ({
                border: '3px solid #42ca9f',
                marginTop: 50,
                borderRadius: theme.radius.md,
                width: '35%',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                })}
            >
                <Text sx={(theme) => ({
                    fontSize: 44,
                    fontWeight: 700,
                })}>
                    FINAL STATS
                </Text>
                <Flex
                    justify='center'
                    align='center'
                    direction='row'
                    sx={(theme) => ({
                        margin: 'auto'
                    })}
                >
                    <Flex
                    justify='center'
                    align='center'
                    direction='column'
                    >
                        <h3>TOTAL POINTS</h3>
                        <p>{points}/{totalPoints}</p>
                    </Flex>
                    <Flex
                    justify='center'
                    align='center'
                    direction='column'
                    sx={(theme) => ({
                        marginLeft: 80
                    })}
                    >
                        <h3>CORRECT CHOICES</h3>
                        <p>{correctChoices}/{correctChoices + wrongChoices}</p>
                    </Flex>          
                </Flex>
            </Box>
        )
    }

    if (!clickedStart) {
        return (
            <Flex
                gap='md'
                justify='center'
                align='center'
                direction='column'
                style={{margin: 'auto', marginTop: '20%'}}
            > 
                <h4>Click the button below to start the quiz.</h4>
                <Button
                    sx={(theme) => ({
                        backgroundColor: '#42ca9f',
                        ":hover": {
                            backgroundColor: '#42ca9f',
                        }
                    })}
                    onClick={() => startQuiz()}
                >
                    Start quiz
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
                <CurrentQuestion />
                {!quizEnded ? <CurrentStats /> : <FinalStats />}
            </Flex>
        )
    }
}

export const getStaticProps = async () => {
    const rawResponse = await fetch(`https://simple-quiz-webapp.herokuapp.com/quiz/randomizeQuestions`, {
        method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
    });

    const quizDatas = await rawResponse.json();
    return {
        props: {
            quizDatas
        }
    }
}

export default Quiz