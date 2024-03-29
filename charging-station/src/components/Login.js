import React, { useState, useContext } from 'react';
import AuthService from '../services/AuthService';
import Message from '../components/Message';
import { AuthContext } from '../context/AuthContext';

const Login = props => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e => {
        setUser({ ...user, [e.target.name] : e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            const { isAuthenticated, user, message } = data;
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                // props.history.push('/driver')
            } else {
                setMessage(message);
            }
        });
    }

    return (
        <div>
            <form onSubmit={ onSubmit } style={{ maxWidth: '50%', margin: 'auto' }}>
                <h3>Please sign in</h3>
                <label htmlFor="username" className="sr-only">Username:</label>
                <input type="text" name="username" onChange={ onChange } className="form-control" placeholder="Enter Username"></input>
                <label htmlFor="password" className="sr-only">Password:</label>
                <input type="password" name="password" onChange={ onChange } className="form-control" placeholder="Enter Password"></input>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
            </form>
            { message ? <Message message={ message }/> : null }
        </div>
    );
}

export default Login;