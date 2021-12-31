import React from "react";
import placeholder from '../assets/images/home.png';

function Home() {
    return (
        <div className="home">
            <div className="container">
                <div className="row align-items-center my-5">
                    <div className="col-lg-7">
                        <img src={placeholder} alt='Home' className='img-fluid'/>
                    </div>
                </div>
                <div className="col-lg-5">
                    <h1 className="font-weight-light">Home</h1>
                    <p>
                        The game of ghost is usually a written or spoken word game in 
                        which players take turns adding letters to a growing word fragment, 
                        trying not to be the one to complete a valid word.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home;
