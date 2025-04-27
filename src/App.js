import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomMenu from './components/BottomMenu';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import News from './pages/News';
import Eventos from './pages/Eventos';
import Checkin from './pages/Checkin';
import Aniversariantes from './pages/Aniversariantes';
import IA from './pages/IA';
import LogoKombat from './pages/LogoKombat';
import NFExpress from './pages/NFExpress';

function App() {
  return (
    <Router>
      <div style={{
        fontFamily: 'Montserrat, sans-serif',
        backgroundColor: '#fff8f0',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '60px'
      }}>

        {/* LOGO */}
        <img
          src="/TGroupLogo.png"
          alt="T Group Logo"
          style={{ width: "140px", marginTop: "20px", marginBottom: "10px" }}
        />

        {/* Rotas */}
        <div style={{ width: '100%', maxWidth: '600px', flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/news" element={<News />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/checkin" element={<Checkin />} />
            <Route path="/aniversariantes" element={<Aniversariantes />} />
            <Route path="/ia" element={<IA />} />
            <Route path="/logokombat" element={<LogoKombat />} />
            <Route path="/nfexpress" element={<NFExpress />} />
          </Routes>
        </div>

        <BottomMenu />
      </div>
    </Router>
  );
}

export default App;
