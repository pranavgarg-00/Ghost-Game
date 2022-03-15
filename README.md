# Ghost-Game

Ghost is a simple word game where players take turns adding letters to a growing word fragment, trying not to be the one to complete a valid word. 
You don't need anything special to play, just a friend and a mutual excess of time to burn. The rules are pretty simple: just don't complete a word, 
and every fragment must be the beginning of an actual word. Of course, you can still bluff your way through a round, which is where challenges come in. 
On your turn, you can challenge the previous player to name their word, afterwhich you win if they can't name a valid word, and vice versa. 

The solver I've implemented was inspired by the countless number of losses I've had to my sister, and with the help 
of a fellow student, we've implemented a solution that implements a dictionary-based trie search to find winning moves, 
i.e forcing moves that make your opponent complete a word.

I built the Application on the PERN Stack (PostgreSQL, Express, React, Node). The application is currently fully functional, with the next step being to deploy on Heroku 

**Ghost Summary**
