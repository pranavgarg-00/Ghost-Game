import React, { useContext, useState, useEffect } from "react"; 
import { APIContext } from "../Remote.js";
// import CachedSolverResults from '../components/CachedSolverResults.js'
import cardImage from '../assets/images/card.png';


const solvedAPI = (remote) => ({
    // index : (body) => remote.query('solve', { method : 'GET'} )
    index : () => remote.query('users/all', { method : 'GET'}),
    // retrieve : (id) => remote.query('users', { method : 'GET', params: {id} })
    retrieve : (id) => remote.query('solve', { method : 'GET', params: {id} })
});

const chunk = (arr, chunkSize, result = []) => {
    if (chunkSize < 1) throw new Error('bad')
    const temp = [...arr]
    while (temp.length) {
        result.push(temp.splice(0, chunkSize));
    }
    return result
};

const WordCard = (props) => {
    const card = (
        <div className='card bg-light'>
            <img className='card-img-top img-fluid' src={cardImage} alt='Card top'/>
            <div className='card-body'>
                <h5 className='card-title'>{props.word}</h5>
                <p className='card-text'>
                    {/* Lorem ipsum dolor sit amet. Duis tellus. */}
                    {props.definition}
                </p>
                <div className='btn btn-secondary'>
                    See definition
                </div>
            </div>
        </div>
    );
    return card;

}

// Change col col-md-x to set grid params
const WordList = (props) => {
    const wordsChunks = chunk(props.entries, 3);
    const rows = wordsChunks.map((wordsChunk, index) => {
        const wordCols = wordsChunk.map((entry) => {
            return (
                <div className='col col-sm-4' key={entry.id}>
                    <WordCard key={entry.id} word={entry.word} definition={entry.definition} />
                </div>
            );
        }); 
        return <div className='row mb-2' key={index}>{wordCols}</div>    
    });
    return (
        <div className='Container'>
            {rows}
        </div>
    )
}

function Solver() {

    const api = solvedAPI(useContext(APIContext));

    
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);

    console.log(input);

    useEffect(() => {
        console.log(input);
        //const timeOutId = setTimeOut(() => setDisplayMessage(input), 500);
        if (input !== '') {
            api.retrieve(input)
                .then((results) => {
                setResults(results);
            });
            console.log(results);
        }
        // DONT GET RID OF BELOW LINE

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input])

    function handleChange(e) {
        setInput(e.target.value);
    }

    // function 

    return (
        <div className="solver mt-3">
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
            
            <div className='container mt-5'> 
                {(results?.length) ? 
                    (<WordList entries={results} /> )    
                    :
                    (<div className={'list-group-item p-3 list-group-item-secondary text-muted'}>
                        No Solutions
                    </div>
                    )}    
            </div>

            {/* <div className="container">
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
            </div> */}
        </div>
    )
}

export default Solver;