<h1 align="center"> Tic-Tac-Toe </h1>

This is a web application for the classic game Noughts and Crosses a.k.a Tic-Tac-Toe, Xs and Os.... It is built using JavaScript React libary and CSS3 for styling.

## Technologies used

<p align="left"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="60" height="60"/> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="60" height="60"/> <img src="https://cdn.worldvectorlogo.com/logos/react-2.svg" alt="React" width="60" height="60"/> <img src="https://cdn.freebiesupply.com/logos/large/2x/netlify-logo-png-transparent.png" alt="Netlify" width="60" height="60" /> </p>

I used React to create components for the Tic-Tac-Toe board and board squares. I also used JavaScript helper function to determine the winner of any given board state. This helper function was taken from the [React Tutorial](https://reactjs.org/tutorial/tutorial.html#declaring-a-winner).

I am hosting this web application on [Netlify](https://app.netlify.com/) straight from GitHub which allows for continuous deployment and automatic build upon new pushes to GitHub.


## Demonstration

The web application is mobile responsive, support up to 360px wide screen and above.

Video to be attached to demonstrate.

https://user-images.githubusercontent.com/84579000/164947476-a563ac14-a949-4247-947a-8e3a896568ad.mp4

## Features

Currently, the project is at a finished staged with the following features:

- Users can play against another person by toggling the game mode to "2 Players"
- Users can play against an AI Easy mode which makes move randomly.
- Users can play against an AI on Hard mode which makes move base on the MiniMax Algorithm to determine the best move.

### To be implemented

- Online mode to play real time against another person on the internet using WebSocket.
- Include dark and light theme toggling for the web application.


## Reflection

When I created this web application I was trying to solidify my knowledge around using React Hooks, useState and useEffect in particular. I had various state inside my web application, but as the web application was small it was managable. But in the future, I would consider a state management liabrary. 

I kept the User Interface simple, and I chose a lighter color scheme to experiement with color and simple layout.

One of the main challenges I ran into was coming up with a logic to determine a winner, upon research, I found a help function to calculate the winner base on the board arrangement from [React Tutorial](https://reactjs.org/tutorial/tutorial.html#declaring-a-winner). To make sure that I full understand it, I added comments on the code for future reference.

The second most difficult challenge was coming up with an algorithm for the AI to make optimal moves, I read about the MiniMax algorithm and with the help of some tutorials I was able to implement my own in React.

### Credits

- [The Coding Train](https://www.youtube.com/watch?v=trKjYdBASyQ&ab_channel=TheCodingTrain). Implementation of MiniMax was based on this video.
