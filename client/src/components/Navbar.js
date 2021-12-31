import React from 'react';
import {NavLink} from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark p-0">
            <div className="container-fluid px-4 py-1">
                <NavLink className="navbar-brand" to="/">
                    Ghost Game
                </NavLink>
                <button 
                    type="button" 
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="#navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle Navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                    <ul className = "navbar-nav ms-auto gap-2 align-items-end">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">
                                Home
                                {/* <span className="sr-only">(current)</span> */}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/play">
                                Play
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/solve">
                                Solver
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>

        </nav>
    );
}

export default Navbar;