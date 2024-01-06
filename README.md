# Ghost-Game

Ghost is a simple word game where players take turns adding letters to a growing word fragment, trying not to be the one to complete a valid word. 
You don't need anything special to play, just a friend and a mutual excess of time to burn. The rules are pretty simple: just don't complete a word, 
and every fragment must be the beginning of an actual word. Of course, you can still bluff your way through a round, which is where challenges come in. 
On your turn, you can challenge the previous player to name their word, afterwhich you win if they can't name a valid word, and vice versa. 

As we can see, the goal of player 1 is to make sure the final word is of 
even length, while player 2 wants it to be odd length. While in real life we 
vary the starting letters upon each run of the game, there are only two starting
letters in which player 1 can force a victory. In the rest of them, player 2 wins
with optimal play. 
Try playing with the solver to figure out the two letters!

This Web Application is built on the PERN Stack (PostgreSQL, Express, React, Node). The application is currently fully functional, with the next step being to deploy it on Heroku.

## Running Locally

Step 1) Clone this repository using `git clone https://github.com/pranavgarg-00/Ghost-Game.git`.

Step 2) Create a file named `.env` at [/](/). Copy the contents of [/.env.example](/.env.example) in it and update DB_USER.

Step 3) In a terminal, navigate to this project's folder and run `yarn`.

Step 4) In the same terminal, run `yarn run dev`. Leave that running. 

Step 5) In a separate terminal, navigate to [/client](/client), and run `yarn`.

Step 6) In this second terminal, run `yarn run start`. The web app should be running on your browser.


