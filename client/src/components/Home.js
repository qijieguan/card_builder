import React, { useState, useEffect } from 'react';
import Login from './Login.js'
import Form from './Form.js';

export default function Home() {
    const [isLogged, setLogin] = useState(localStorage.getItem('isLogged'));
    const [showLogin, setShowLogin] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [buttonText, setBtnText] = useState("Add");

    const toggleLogin = () => {
        setShowLogin(!showLogin);
    }

    const toggleAdd = () => {  
        setShowAdd(!showAdd);
        setBtnText(!showAdd ? 'Hide' : 'Add');
    }

    return (
        <div>
            {isLogged ?
                <div>
                    <button className="start-btn" style={{
                            background: showAdd ? 'red' : 'green',
                        }}
                        onClick={toggleAdd}
                    >
                        {buttonText}
                    </button>
                    {showAdd ? <Form /> : ''}
                </div>
                :
                <div>
                    <div style={{display: showAdd ? '' : 'none'}}>
                    <button className="login-Btn" style={{
                            background: 'green',
                        }}
                        onClick={toggleLogin}
                    >
                        Login
                    </button>
                    <Login />
                    </div>
                </div>
            }
        </div>
    );
}