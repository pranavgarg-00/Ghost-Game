import React from 'react';
import {NavLink} from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
            <div className="container-fluid px-4 py-1">
                <NavLink className="navbar-brand" to="/">
                    Ghost Game
                </NavLink>
                <div>
                    <ul className = "navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">
                                Home
                                <span className="sr-only">(current)</span>
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