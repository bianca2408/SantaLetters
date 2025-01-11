import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Page = styled.div`
    background: #db4c4c; 
    height: 100vh; /* Ocupă întreaga înălțime a ecranului */
    width: 100vw; /* Ocupă întreaga lățime a ecranului */
    display: flex; /* Folosește flexbox */
    justify-content: center; /* Centrează pe orizontală */
    align-items: center; /* Centrează pe verticală */
    flex-direction: column; /* Aliniază elementele pe verticală */
`;

const Input = styled.input`
    margin: 10px 0;
    background: #b1cd8d;
    padding: 10px;
    font-size: 16px;
    margin-right: 5px;
    border: 1px solid black;
    border-radius: 10px; /* Rotunjirea colțurilor */
    width: 200px;
    box-sizing: border-box; /* Previne depășirea dimensiunii specificate */
    outline: none; /* Elimină chenarul albastru în jurul inputului */
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #7dac41; /* Schimbă culoarea chenarului la focus */
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

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/');
      };

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError('Parolele nu corespund!');
            return;
        }
        try {
            const response = await fetch('http://10.96.17.40:80/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('Înregistrare eșuată');
            }

            const data = await response.json();
            console.log('Înregistrare reușită:', data);
            // Navighează la login după înregistrare
            navigate('/');
        } catch (err) {
            setError(err.message);
            console.log('Eroare la înregistrare:', err);
        }
    };

    return (
        <Page>
            <Title>Santa Letters - Register</Title>
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
            <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button onClick={handleRegister}>Register</Button>
            <p>Ai deja cont? Apasă pe butonul de mai jos!</p>
            <Button onClick={handleLogin}>Login</Button>
            {error && <p>{error}</p>}
        </Page>
    );
};

export default Register;
