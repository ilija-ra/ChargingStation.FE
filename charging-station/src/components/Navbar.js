import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { AuthContext } from '../context/AuthContext';

const Navbar = props => {
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

    const onClickLogoutHandler = () => {
        AuthService.logout().then(data => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
        })
    }

    const authenticatedNavbar = () => {
        return (
            <>
                <Link to="/"><li className="nav-item nav-link">Home</li></Link>
                <Link to="/login"><li className="nav-item nav-link">Login</li></Link>
                <Link to="/register"><li className="nav-item nav-link">Register</li></Link>
                {
                    user.role === 'admin' ? <Link to="/users"><li className="nav-item nav-link">Users</li></Link> : null
                }
                {
                    user.role === 'admin' ? <Link to="/chargers"><li className="nav-item nav-link">Chargers</li></Link> : null
                }
                <button type="button" className="btn btn-link nav-item nav-link" onClick={ onClickLogoutHandler }>Logout</button>
            </>
        )
    }

    const unauthenticatedNavbar = () => {
        return (
            <>
                <Link to="/"><li className="nav-item nav-link">Home</li></Link>
                <Link to="/login"><li className="nav-item nav-link">Login</li></Link>
                <Link to="/register"><li className="nav-item nav-link">Register</li></Link>
            </>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/">
                    <div className="navbar-brand">Charging Stations</div>
                </Link>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        { isAuthenticated ? authenticatedNavbar() : unauthenticatedNavbar() }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;