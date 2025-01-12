import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Page = styled.div`
    background: #db4c4c; 
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Input = styled.input`
    margin: 10px 0;
    background: #b1cd8d;
    padding: 10px;
    font-size: 16px;
    border: 1px solid black;
    border-radius: 10px;
    width: 200px;
    box-sizing: border-box;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #7dac41;
    }
`;

const Button = styled.button`
    border: 1px solid black;
    border-radius: 10px;
    font-size: 20px;
    background: #b1cd8d;
    margin-top: 10px;
    padding: 10px;
`;

const Title = styled.h2`
    font-size: 46px;
    font-family: 'Mountains of Christmas';
    margin-bottom: 20px;
`;

const Message = styled.p`
    color: green;
    font-weight: bold;
    margin-top: 10px;
`;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError(null);
        setSuccessMessage('');
        
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Autentificare eșuată');
            }

            const data = await response.json();
            
            if (data.userId) {
                localStorage.setItem('userId', data.userId); // Salvează ID-ul utilizatorului
                setSuccessMessage('Autentificare reușită! Vei fi redirecționat.');
                setTimeout(() => navigate('/home'), 2000); // Așteaptă 2 secunde înainte de redirecționare
            } else {
                throw new Error('Răspuns invalid de la server');
            }
        } catch (err) {
            setError(err.message);
            console.error('Eroare la login:', err);
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <Page>
            <Title>Santa Letters</Title>
            <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>Login</Button>
            {successMessage && <Message>{successMessage}</Message>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>Nu ai cont? Creează-ți unul apăsând pe butonul de mai jos!</p>
            <Button onClick={handleRegisterRedirect}>Register</Button>
        </Page>
    );
};

export default Login;
