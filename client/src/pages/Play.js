import React from "react";
import placeholder from '../assets/images/home.png';

function Play() {
    return (
        <div className="play">
            <div className="container">
                <div className="row align-items-center my-5">
                    <div className="col-lg-7">
                        <img src={placeholder} alt='Play' className='img-fluid'/>
                    </div>
                
                    <div className="col-lg-5">
                        <h1 className="font-weight-light">Play</h1>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text
                            ever since the 1500s, when an unknown printer took a galley of
                            type and scrambled it to make a type specimen book
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Play;