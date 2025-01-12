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
  align-items: center;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Pagina = styled.div`
  background: #9fc5e8;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 46px;
  font-family: 'Mountains of Christmas';
  margin-bottom: 20px;
`;

const Message = styled.p`
  color: white;
  font-weight: bold;
  margin-top: 10px;
  background: ${({ success }) => (success ? 'green' : 'red')};
  padding: 10px;
  border-radius: 5px;
`;

const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [letterContent, setLetterContent] = useState('');
  const [userRole, setUserRole] = useState('user');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role') || 'user';
    setUserRole(role);
  }, []);

  const handleCreateLetter = () => {
    setIsPopupOpen(true);
    setMessage('');
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setLetterContent('');
  };

  const handleSubmitLetter = async () => {
    setMessage('');
    const userId = localStorage.getItem('userId'); // Presupunem că ID-ul utilizatorului e salvat în localStorage

    if (!userId) {
      setMessage('Eroare: Nu ești autentificat!');
      setSuccess(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3002/letters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: letterContent,
          user_id: userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Trimiterea scrisorii a eșuat.');
      }

      setMessage('Scrisoarea a fost trimisă cu succes!');
      setSuccess(true);
      setLetterContent('');
      setTimeout(() => {
        setIsPopupOpen(false);
        setMessage('');
      }, 2000);
    } catch (err) {
      setMessage(err.message);
      setSuccess(false);
    }
  };

  const handleViewLetters = () => {
    navigate('/scrisori');
  };

  return (
    <Pagina>
      <Title>Santa Letters</Title>

      {userRole === 'admin' ? (
        <Button onClick={() => navigate('/scrisori')}>Vizualizează toate scrisorile</Button>
      ) : (
        <>
          <Button onClick={handleCreateLetter}>Creează o scrisoare către Moș Crăciun</Button>
          <Button onClick={handleViewLetters}>Vizualizează scrisorile mele</Button>
        </>
      )}

      {message && <Message success={success ? 'true' : 'false'}>{message}</Message>}

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
