import React from "react";
import placeholder from '../assets/images/home.png';

function Solver() {
    return (
        <div className="solver">
            <div className="text-center">
                <h1 className="text-bolder">Solver</h1>
                <p className="mx-auto w-50">
                    Using the inputted subword, the solver traverses a tree that
                    has been constructed from a dictionary, returning a list 
                    of winning moves. The solver assumes it is the user's move
                    to make. The server live updates the listings based
                    on user input. 
                </p> 
            </div>

            <div className="container">
                <div className="row align-items-center my-5">
                    <div className="col-lg-7">
                        <img src={placeholder} alt='Solver' className='img-fluid'/>
                    </div>
                
                    <div className="fw-bolder col-lg-5">
                        <h1>Solver</h1>
                        <p className="fw-lighter">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Duis congue ante nulla, id pretium augue elementum et. 
                            Etiam convallis, neque sit amet vulputate tincidunt, 
                            quam purus vehicula nibh, sit amet placerat nisi nisi id mi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Solver;