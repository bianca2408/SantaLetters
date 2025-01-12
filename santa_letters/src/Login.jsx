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

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    navigate('/home');
    try {
      const response = await fetch('http://10.96.17.40:80/login', {
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
        throw new Error('Autentificare eșuată');
      }

      const data = await response.json();
      console.log('Login reușit:', data);
      // Salvează token-ul sau redirecționează utilizatorul
      //MUTA PE LINIA ASTA NAVIGATE HOME
    } catch (err) {
      setError(err.message);
      console.log('Eroare la login:', err);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Mergi la pagina de registru
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
      <p>Nu ai cont? Creează-ți unul apăsând pe butonul de mai jos!</p>
      <Button onClick={handleRegisterRedirect}>Register</Button>
      {error && <p>{error}</p>}
    </Page>
  );
};

export default Login;
