import React from 'react';
import { BrowserRouter, Routes as Switch, Route} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from './components/Navbar.js';
import Home from './pages/Home.js'
import Play from './pages/Play.js';
import Solver from './pages/Solver.js';
import Remote from './Remote.js'

import './App.css';

function App() {

  return (
  
    <Remote url={new URL('/api', document.location.origin)}> 
      <BrowserRouter>
        <header>
          <Navbar/>
        </header>
        <main>
          <Switch>
            <Route exact path={'/'} element={<Home/>} />
            <Route exact path={'/play'} element={<Play/>} />
            <Route exact path={'solve'} element={<Solver/>} />
          </Switch>
        </main>
      </BrowserRouter>
    </Remote>
    
  )
}

export default App;
