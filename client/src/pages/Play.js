import React from "react";
import placeholder from '../assets/images/home.png';

function Play() {
    return (
        <div className="play">
            <div class="container">
                <div class="row align-items-center my-5">
                    <div class="col-lg-7">
                        <img src={placeholder} alt='Play' class='img-fluid'/>
                    </div>
                </div>
                <div class="col-lg-5">
                    <h1 class="font-weight-light">Play</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Duis congue ante nulla, id pretium augue elementum et. 
                        Etiam convallis, neque sit amet vulputate tincidunt, 
                        quam purus vehicula nibh, sit amet placerat nisi nisi id mi.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Play;