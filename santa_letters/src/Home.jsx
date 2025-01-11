import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: #7dac41;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background-color: #6a9c37;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const PopupContent = styled.div`
  background-color: #db4c4c;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrează elementele pe axa orizontală */
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  align-self: center; /* Centrează textarea în interiorul PopupContent */
`;

const Pagina = styled.div`
  background: #9fc5e8;
  height: 100vh; /* Ocupă întreaga înălțime a ecranului */
  width: 100vw; /* Ocupă întreaga lățime a ecranului */
  display: flex; /* Folosește flexbox */
  justify-content: center; /* Centrează pe orizontală */
  align-items: center; /* Centrează pe verticală */
  flex-direction: column; /* Aliniază elementele pe verticală */
`;

const Title = styled.h2`
  font-size: 46px;
  font-family: 'Mountains of Christmas';
  margin-bottom: 20px;
`;

const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [letterContent, setLetterContent] = useState('');
  const [userRole, setUserRole] = useState('user'); // Valoare implicită
  const navigate = useNavigate();

  // Simulăm un mecanism de autentificare și roluri
  useEffect(() => {
    // Aici, de obicei, am verifica rolul utilizatorului (de exemplu, dintr-un context sau localStorage)
    const role = localStorage.getItem('role') || 'user'; // 'admin' sau 'user'
    setUserRole(role);
  }, []);

  const handleCreateLetter = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmitLetter = () => {
    // Aici poți adăuga logica pentru a trimite scrisoarea
    console.log('Scrisoare trimisă:', letterContent);
    setLetterContent('');
    setIsPopupOpen(false);
  };

  const handleViewLetters = () => {
    navigate('/scrisori');
  };

  const handleViewAllLetters = () => {
    navigate('/scrisori'); // Aceasta va fi pagina cu toate scrisorile
  };

  return (
    <Pagina>
      <Title>Santa Letters</Title>

      {/* Verificăm dacă utilizatorul este admin */}
      {userRole === 'admin' ? (
        <Button onClick={handleViewAllLetters}>Vizualizează toate scrisorile</Button>
      ) : (
        <>
          <Button onClick={handleCreateLetter}>Creează o scrisoare către Moș Crăciun</Button>
          <Button onClick={handleViewLetters}>Vizualizează scrisorile mele</Button>
        </>
      )}

      {/* Popup pentru crearea scrisorii */}
      {isPopupOpen && (
        <Popup>
          <PopupContent>
            <h2>Creează scrisoarea ta</h2>
            <TextArea
              value={letterContent}
              onChange={(e) => setLetterContent(e.target.value)}
              placeholder="Scrie-ți scrisoarea aici..."
            />
            <div>
              <Button onClick={handleSubmitLetter}>Trimite scrisoarea</Button>
              <Button onClick={handleClosePopup}>Închide</Button>
            </div>
          </PopupContent>
        </Popup>
      )}
    </Pagina>
  );
};

export default Home;
