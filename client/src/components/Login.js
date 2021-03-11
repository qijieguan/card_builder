import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [showAuthBtn, setShowAuthBtn] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);
    
    const handleChange = event => {
        if (event.target.name == "username") {
            setUsername(event.target.value);
        }
        else {
            setPassword(event.target.value);
        }   
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (!username || !password) {
            setMessage('username/password field is empty!');
            setError(true);
            return;
        }
        axios.post('/api/login', {
            username: username,
            password: password  
        }).then((response) => {
            if (response.data.error) {
                setError(true);
                setLoginStatus(false);
            }
            else {
                setShowAuthBtn(true);
                localStorage.setItem("token", response.data.token);
            }
            setMessage(response.data.message);
            setError(response.data.error);
        });
    }

    const userAuthentication = () => {
        axios.get('/api/auth', {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            if (response.data.auth) {
                setLoginStatus(true);
                localStorage.setItem("isLogged", true);
                setMessage(response.data.message);
                setShowAuthBtn(false);
                window.location.href=process.env.BASE_URL;
            }
        });
    }

    return (
        <div className="login-container">
            <main style={{height: '600px'}}>
                <br/><br/>
                <form className="create-form" style={{height: '60vh'}} onSubmit={handleSubmit}>
                    <h1 style={{fontSize: '24px', marginBottom: '28px', color: 'green'}}>LOGIN</h1>
                    <div 
                        style={{
                            color: error ? 'red' : 'green', 
                            display: message ? '' : 'none',
                            marginBottom: '20px', 
                            fontSize: '16px'
                        }}
                    >{message}</div>
                    <input 
                        name="username"
                        value={username} 
                        placeholder="Enter username"
                        onChange={handleChange}
                        style={{marginBottom: '10px'}} 
                    ></input><br/><br/>
                    <input 
                        name="password"
                        type="password"
                        value={password}
                        placeholder="Enter password"
                        onChange={handleChange} 
                    ></input><br/><br/><br/><br/>
                    <Link to='/register' style={{fontSize: '14px', color: 'blue'}}>
                        Register
                    </Link>
                    <button type="submit" 
                        className="btn waves-effect green" 
                        style={{width: '100%', height: '50px', background: 'green', color: 'white'}}
                    >LOGIN</button>
                </form>
            </main>
                <button className="authenticate-btn" onClick={userAuthentication} 
                    style={{display: showAuthBtn ? 'flex' : 'none'}}
                >Click to Authenticate</button> 
        </div>
    );
}