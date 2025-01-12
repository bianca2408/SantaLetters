import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LetterList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #b1cd8d;
  height: 100vh;
  width: 100vw;
`;

const LetterItem = styled.div`
  background-color: #f9f9f9;
  margin: 10px 0;
  padding: 15px;
  width: 80%;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 30px;
  margin-bottom: 15px;
  font-family: 'Mountains of Christmas';
`;

const Content = styled.p`
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #db4c4c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #6a9c37;
  }
`;

const Letters = () => {
  const [letters, setLetters] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('role'); // Presupunem că rolul este salvat în localStorage

    if (!userId) {
      setMessage('Eroare: Nu ești autentificat!');
      return;
    }

    const fetchLetters = async () => {
      try {
        const url = userRole === 'admin' ? 'http://localhost:3002/letters' : `http://localhost:3002/letters/${userId}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Eroare la preluarea scrisorilor');
        }

        const data = await response.json();
        setLetters(data);
      } catch (err) {
        setMessage(err.message);
      }
    };

    fetchLetters();
  }, []);

  const handleDeleteLetter = async (letterId) => {
    try {
      const response = await fetch(`http://localhost:3002/letters/${letterId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Eroare la ștergerea scrisorii');
      }

      setMessage('Scrisoarea a fost ștearsă cu succes!');
      setLetters((prevLetters) => prevLetters.filter((letter) => letter.id !== letterId));
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleCreateLetter = () => {
    navigate('/home');
  };

  return (
    <LetterList>
      <Title>Scrisorile tale</Title>

      {message && <p style={{ color: 'red' }}>{message}</p>}

      {letters.length === 0 ? (
        <p>Nu ai scris încă nici o scrisoare!</p>
      ) : (
        letters.map((letter) => (
          <LetterItem key={letter.id}>
            <h3>Scrisoare #{letter.id}</h3>
            <Content>{letter.content}</Content>
            <Button onClick={() => handleDeleteLetter(letter.id)}>Șterge</Button>
          </LetterItem>
        ))
      )}

      <Button onClick={handleCreateLetter}>Creează o nouă scrisoare</Button>
    </LetterList>
  );
};

export default Letters;
