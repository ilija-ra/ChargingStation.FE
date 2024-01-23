import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../services/AuthService';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';

const Register = props => {
    const [user, setUser] = useState({ firstName: "", lastName: "", dateOfBirth: "", username: "", emailAddress: "", password: "", role: "driver", isBlocked: false });
    const [message, setMessage] = useState(null);
    let timerId = useRef(null);
    let navigate = useNavigate();

    useEffect(() => {
        return () => {
            clearTimeout(timerId);
        }
    }, [timerId]);

    const onChange = e => {
        setUser({ ...user, [e.target.name] : e.target.value, role: 'driver' });
    }

    const resetForm = () => {
        setUser({ firstName: "", lastName: "", dateOfBirth: "", username: "", emailAddress: "", password: "", role: "driver", isBlocked: false });
    }

    const onSubmit = e => {
        e.preventDefault();
        // Set a default role if not provided in the form
        if (!user.role) {
            setUser({ ...user, role: 'driver' });
        }
        console.log("user before registration:", user);
        AuthService.register(user).then(data => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if (!message.msgError) {
                timerId = setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        });
    }

    return (
        <div>
            <form onSubmit={ onSubmit } style={{ maxWidth: '50%', margin: 'auto' }}>
                <h3>Please register</h3>

                <label htmlFor="firstName" className="sr-only">First name:</label>
                <input type="text" name="firstName" onChange={ onChange } className="form-control" placeholder="Enter first name"></input>
                
                <label htmlFor="lastName" className="sr-only">Last name:</label>
                <input type="text" name="lastName" onChange={ onChange } className="form-control" placeholder="Enter last name"></input>

                <label htmlFor="dateOfBirth" className="sr-only">Date of birth:</label>
                <input type="date" name="dateOfBirth" onChange={ onChange } className="form-control" placeholder="Enter date of birth"></input>
                
                <label htmlFor="username" className="sr-only">Username:</label>
                <input type="text" name="username" onChange={ onChange } className="form-control" placeholder="Enter Username"></input>

                <label htmlFor="emailAddress" className="sr-only">Email address:</label>
                <input type="text" name="emailAddress" onChange={ onChange } className="form-control" placeholder="Enter email address"></input>

                <label htmlFor="password" className="sr-only">Password:</label>
                <input type="password" name="password" onChange={ onChange } className="form-control" placeholder="Enter Password"></input>

                <label htmlFor="role" className="form-label">Role:</label>
                <select name="role" className="form-select mb-2" onChange={onChange}>
                    <option value="driver">Driver</option>
                </select>

                <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
                { message ? <Message message={ message }/> : null }
            </form>
        </div>
    );
}

export default Register;