import React, { useContext, useState, useEffect } from "react"; 
import { APIContext } from "../Remote.js";
import cardImage from '../assets/images/card.png';

const dictionaryAPI = (remote) => ({
    retrieve : (id) => remote.query('solve/dictionary', { method : 'GET', params: {id} })
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
                <div className='collapse show' id='define'>
                    <p className='card-text'>
                        {props.definition}
                    </p>
                </div>
                <div className='btn btn-secondary' 
                    data-bs-toggle='collapse' 
                    data-bs-target='#define'
                    aria-expanded='true'
                    aria-controls='define'>
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

function Play() {
    const api = dictionaryAPI(useContext(APIContext));

    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        console.log(input);
        
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

    return (
        <div className="solver mt-3">
            <div className="text-center">
                <h1 className="text-bolder">Dictionary</h1>
                <p className="mx-auto w-75">
                    A side effect of creating the Ghost solver was the implementation
                    of a simple dictionary word lookup client. This queries the same
                    dictionary that the Solver uses to return results, for fast and 
                    simple retrieval.
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
                        Not a Word
                    </div>
                    )}    
            </div>
        </div>
    )
}

export default Play;