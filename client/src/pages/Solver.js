import React, {useState} from "react"; //useMemo, useContext } from "react";
// import { APIContext } from "../Remote.js";
// import CachedSolverResults from '../components/CachedSolverResults.js'
import placeholder from '../assets/images/home.png';

// const solvedAPI = (remote) => ({
//     // create : (body) => remote.query('solve', { method : 'GET'} )
//     create : (body) => remote.query('users', { method : 'GET'} )
// });

function Solver() {
    // const SolverAPI = useContext(APIContext);
    // const { data } = SolverAPI.index;
    // console.log(data);

    const [input, setInput] = useState('');
    //const [results, setResults] = useState([]);

    console.log(input);
    // const cachedQuerying = useMemo(() => new CachedSolverResults(search, setResults)

    function handleChange(e) {
        //setInput(query);
        setInput(e.target.value);
    }

    // function 

    return (
        <div className="solver mt-2">
            <div className="text-center">
                <h1 className="text-bolder">Solver</h1>
                <p className="mx-auto w-75">
                    Using the inputted subword, the solver traverses a tree that
                    has been constructed from a dictionary, returning a list 
                    of winning moves. The solver assumes it is the user's move
                    to make. The server live updates the listings based
                    on user input. 
                </p> 
            </div>
            <div>
                <form className="mt-5">
                    <div className="d-flex flex-row justify-content-md-center">
                    {/* <div className="row align-items-lg-center"> */}
                        <div className="col col-md-6">
                            <div className="input-group input-group-lg">
                                <span className="input-group-text" id="inputGroup-sizing-lg">Solve</span>    
                                <input 
                                    type='text' 
                                    className='form-control' 
                                    placeholder="type a subword"
                                    aria-label="Sizing example"
                                    aria-describedby="inputGroup-sizing-lg"
                                    value={input} onChange={ handleChange } />
                            </div>
                        </div>
                    </div>
                </form>
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