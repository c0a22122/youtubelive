import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LiveStreamList from './components/LiveStreamList';
import OpeningAnimation from './components/OpeningAnimation';
import ClickEffect from './components/ClickEffect';
import Header from './components/Header';
import Register from './components/Register';
import './App.css';

const App = () => {
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);

  return (
    <Router>
      <div className="App">
        <Header />
        <ClickEffect />
        {!isAnimationEnd && (
          <OpeningAnimation onAnimationEnd={() => setIsAnimationEnd(true)} />
        )}
        {isAnimationEnd && (
          <>
            <Routes>
              <Route path="/" element={<LiveStreamList />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <RegisterButton />
          </>
        )}
      </div>
    </Router>
  );
};

const RegisterButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="register-button"
      onClick={() => navigate('/register')}
    >
      登録
    </button>
  );
};

export default App;
