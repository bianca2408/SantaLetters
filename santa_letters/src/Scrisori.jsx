import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Stiluri pentru vizualizarea scrisorilor
const LetterList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #b1cd8d;
  height: 100vh; /* Ocupă întreaga înălțime a ecranului */
  width: 100vw; /* Ocupă întreaga lățime a ecranului */
  display: flex; /* Folosește flexbox */
  justify-content: center; /* Centrează pe orizontală */
  align-items: center; /* Centrează pe verticală */
  flex-direction: column; /* Aliniază elementele pe verticală */
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
  const [userRole, setUserRole] = useState('user'); // Rolul utilizatorului
  const navigate = useNavigate();

  useEffect(() => {
    // Simulăm rolul utilizatorului
    const role = localStorage.getItem('role') || 'user'; // 'admin' sau 'user'
    setUserRole(role);

    // Aici vom încărca scrisorile dintr-o sursă externă (ex: API)
    // Exemplu static de scrisori
    const fetchedLetters = [
      { id: 1, title: "Scrisoare pentru Moș Crăciun", content: "Dragă Moș Crăciun, îți doresc să fiu mai bun anul acesta.", user: 'user1' },
      { id: 2, title: "Mersul la școală", content: "În acest an vreau să învăț mai mult la școală.", user: 'user1' },
      { id: 3, title: "Vreau un câine", content: "Mi-aș dori un câine ca animal de companie.", user: 'user3' },
    ];
    
    // Dacă utilizatorul este admin, se vor încărca toate scrisorile
    if (role === 'admin') {
      setLetters(fetchedLetters);
    } else {
      // Dacă nu este admin, doar scrisorile utilizatorului curent
      const userLetters = fetchedLetters.filter(letter => letter.user === 'user1'); // Exemplu pentru utilizatorul 'user1'
      setLetters(userLetters);
    }
  }, []);

  const handleDeleteLetter = (letterId) => {
    // Filtrăm scrisoarea care trebuie ștearsă
    setLetters((prevLetters) => prevLetters.filter((letter) => letter.id !== letterId));
    console.log('Scrisoare ștearsă:', letterId);
  };

  const handleCreateLetter = () => {
    navigate('/home');
  };

  return (
    <LetterList>
      <Title>Scrisorile tale</Title>
      {letters.length === 0 ? (
        <p>Nu ai scris încă nici o scrisoare!</p>
      ) : (
        letters.map((letter) => (
          <LetterItem key={letter.id}>
            <h3>{letter.title}</h3>
            <Content>{letter.content}</Content>
            {/* Dacă este admin, afișăm butonul de ștergere */}
            {userRole === 'admin' && (
              <Button onClick={() => handleDeleteLetter(letter.id)}>Șterge scrisoarea</Button>
            )}
          </LetterItem>
        ))
      )}
      <Button onClick={handleCreateLetter}>Creează o nouă scrisoare</Button>
    </LetterList>
  );
};

export default Letters;
