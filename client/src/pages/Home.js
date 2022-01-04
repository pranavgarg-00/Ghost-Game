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
                            The solver I've implemented was inspired by the countless 
                            number of losses I've had to my sister, and with the help 
                            of a fellow CS Student @Pranav Garg, we've implemented a 
                            solution that implements a dictionary-based trie search to
                            find winning moves, i.e forcing moves that make your opponent
                            complete a word.
                        </p>
                    </div>
                </div>    
            </div>
        </div>
    )
}

export default Home;
