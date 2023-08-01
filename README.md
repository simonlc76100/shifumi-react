# Rock, Paper, Scissors Online

This application allows you to play Rock Paper Scissors online. It supports two players per game, and each game is played over three rounds.

## Features

### User Registration and Authentication
- Users can register themselves with a username and a password.
- Users can authenticate themselves to access the application.

### Game Management
- Users can create a new game.
- Users can join an existing game that is waiting for a second player.
- Users can view the details of a game including the players, their moves, and the current state of the game.

### Gameplay
- Each game is played over three rounds.
- In each round, the players select their move (rock, paper, or scissors).
- The winner of the round is determined according to the standard rules of Rock Paper Scissors.

### Real-time Notifications
- Application uses the Server-Sent Events (SSE) protocol for real-time notifications.
- Users can subscribe to these notifications using the /matches/:id/subscribe endpoint.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need Git, Node.js and Docker installed on your machine.

### Installing

1. Clone the repository to your local machine.
    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project folder.
    ```bash
    cd shifumi-react
    ```

3. Rename `.env.example` to `.env`.
    ```bash
    mv .env.example .env
    ```

4. Open `.env` in your favorite text editor and fill in the environment variables.

   - `DB_HOSTNAME`: This is the hostname of your database. You can use any name you like, the connection string URI will be constructed based on this value.

   - `DB_NAME`: This is the name of your database. You can use any name you like.

   - `JWT_SECRET`: This is the secret key used to sign the JSON Web Tokens for authentication. This should be a long, random string. You can generate one by running `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` in your terminal.

5. Run docker-compose up at the root of the project to start the application.
    ```bash
    docker-compose up
    ```

The client should now be running on `http://localhost:3000`.

## Endpoints

- POST /register: Register a new user.
- POST /login: Authenticate a user.
- GET /matches: Get a list of all matches.
- GET `/matches/:id:` Get the details of a specific match.
- POST /matches: Create a new match or join an existing match that is waiting for a second player.
- POST /matches/:id/turns/:idTurn: Submit a move for the current round in a match.

## Notifications

Notifications types:

- PLAYER_JOIN: A player has joined a match.
- NEW_TURN: A new round has started.
- TURN_ENDED: A round has ended and the winner has been determined.
- PLAYER_MOVED: A player has made a move.
- MATCH_ENDED: The match has ended and the overall winner has been determined.

## Bonus Features

- Optimized routing: Redirect to the list of matches if the user is already logged in.
- Use of notification system for game events.
- Addition of animations to reveal the players' moves.
