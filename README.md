Simple Webapp for trivia quiz

**NOTE: Please have a Metamask account to log in. You will NOT be required to sign any transactions; you are only required to sign a signin message request.**
This web app has minimal styling. It will be improved in the future.

## Features
- Connect with your Metamask account to keep track of your stats and play the quiz.
- ![image](https://user-images.githubusercontent.com/60882255/234656112-488f147c-7d5e-4630-a7f1-7c61dc45990b.png) See how many quizzes you've played and keep track of your best, worst and average scores so far.
- Time-limited questions with varying amounts of answers possible.


## Architecture used
### FRONTEND
- [Next.js](https://nextjs.org) - React framework for production
- [Mantine](https://mantine.dev) - Components library for React web apps
- [Emotion](https://emotion.sh/docs/introduction) - CSS styling library for JavaScript
- [React Moralis](https://www.npmjs.com/package/react-moralis) - React Wrapper for Moralis SDK
- [Vercel](https://vercel.com) - A platform to deploy the webapp (Specially made for Next.js)
### BACKEND
- [Node.js](https://nodejs.org/en/) - JS runtime environment
- [Express.js](https://expressjs.com) - Minimalist web framework for Node.js, used for building API
- [MongoDB](https://www.mongodb.com) - A NoSQL database program
- [Parse](https://parseplatform.org) - User authentication and dashboard for storing into MongoDB (backend infrastructure)
- [Heroku](https://www.heroku.com) - A cloud platform to host the backend API

## Available webpages and instructions
### `/` - index page 
If you're not logged in, it should show you this: ![image](https://user-images.githubusercontent.com/60882255/234662203-62b92fc9-6df9-41c1-93bc-d2b8e2555471.png)
Once you connect with Metamask, it will take a few seconds to show you this message:
![image](https://user-images.githubusercontent.com/60882255/234662025-f04829bf-7d33-4080-a770-0f9c499c3ac3.png)
Please wait 3 seconds until it brings you to:
### `/start` - the start page
![image](https://user-images.githubusercontent.com/60882255/234662953-9481aa86-ea88-48e4-8c7d-241fcefa48d4.png)
If you have not played a quiz before, then your stats will show 0. The moment you've played one, all these stats will update.
Click on the 'Start another quiz' button to start a quiz.
### `/quiz` - the quiz page
![image](https://user-images.githubusercontent.com/60882255/234663218-e081102a-6865-45c8-86f5-d12058bccaad.png)
The quiz will consist of 5 questions each time from a random selection of questions. Each question is currently 15 seconds long and you can get up to 100 points. The longer it takes for you to answer, the lower points you will get for a correct answer. **NOTE: a wrong answer will DEDUCT 1000 POINTS.** You will also be able to see your current total points and how many questions you've answered correctly.

Once you've finished all questions, you can click on 'End quiz' to end the quiz:
![image](https://user-images.githubusercontent.com/60882255/234663454-f3a911b4-f4f1-400c-a8c7-dd34c2ad60f1.png)
Your score will be uploaded to MongoDB and will be stored there for the `/start` page's dashboard stats.

## Access/Initialization
### DEPLOYED WEBSITE
The website is available here: [Visit Website](https://quiz-webapp-khaki.vercel.app) **IMPORTANT: PLEASE HAVE A METAMASK ACCOUNT TO LOGIN AND ACCESS THE QUIZ**

If you prefer to run a local instance of the web app, please install the following dependencies before continuing:
- A [Metamask wallet](https://metamask.io) installed into your browser to access the web app.
- If possible, the latest version of [Node.js](https://nodejs.org/en/), or at least v12.22.0.

Clone the repository via your terminal.
`git clone https://github.com/suwandre/quiz-webapp.git`

Open the folder and install the required dependencies using a new Terminal (note that this requires npm, if you want to use yarn, please use `yarn i`)
```sh
cd quiz-webapp
npm i
```

Before launching the localhost instance, it is important to note that this repo has a hidden .env file that contains variables required to connect to the MongoDB instance. Please contact me to gain access, OTHERWISE IT WON'T WORK (AND ERRORS WILL OCCUR!)

If you have these variables already, you are able to launch the localhost instance using `npm run dev` and go to `localhost:3000`.




