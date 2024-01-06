import React from "react";
import placeholder from '../assets/images/letters.jpg';

function Home() {
    return (
        <div className="home">
            <div className="container">
                <div className="row my-5">
                    <div className="col-lg-5">
                        <img src={placeholder} alt='Home' className='img-fluid'/>
                    </div>
                    <div className="col-lg-7">
                        <h1 className="font-weight-light">Home</h1>
                        <p>
                            Ghost is a simple word game where players take turns
                            adding letters to a growing word fragment, trying
                            not to be the one to complete a valid word.
                            You don't need anything special to play, just a friend
                            and a mutual excess of time to burn. The rules are 
                            pretty simple: just don't complete a word, and every
                            fragment must be the beginning of an actual word. 
                            Of course, you can still bluff your way through a round,
                            which is where challenges come in. On your turn, you
                            can challenge the previous player to name their word,
                            afterwhich you win if they can't name a valid word, and 
                            vice versa. 
                        </p>
                        <p>
                            As we can see, the goal of player 1 is to make sure the final word is of 
                            even length, while player 2 wants it to be odd length. While in real life we 
                            vary the starting letters upon each run of the game, there are only two starting
                            letters in which player 1 can force a victory. In the rest of them, player 2 wins
                            with optimal play. 
                            Try playing with the solver to figure out the two letters!
                        </p>
                    </div>
                </div>    
            </div>
        </div>
    )
}

export default Home;
