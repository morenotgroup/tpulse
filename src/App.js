import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Eventos from './pages/Eventos';
import Aniversariantes from './pages/Aniversariantes';
import News from './pages/News';
import Checkin from './pages/Checkin';
import NFExpress from './pages/NFExpress';
import IA from './pages/IA';
import LogoKombat from './pages/LogoKombat';
import Perfil from './pages/Perfil';

function App() {
  return (
    <Router>
      <div style={{ fontFamily: "Montserrat, sans-serif", textAlign: "center" }}>
        <h1>T Pulse - Intranet T Group</h1>

        {/* Menu de navegação */}
        <nav style={{ marginBottom: "30px" }}>
          <Link to="/" style={{ margin: "0 10px" }}>Home</Link>
          <Link to="/eventos" style={{ margin: "0 10px" }}>Eventos</Link>
          <Link to="/aniversariantes" style={{ margin: "0 10px" }}>Aniversariantes</Link>
          <Link to="/news" style={{ margin: "0 10px" }}>Notícias</Link>
          <Link to="/checkin" style={{ margin: "0 10px" }}>Check-in</Link>
          <Link to="/nfexpress" style={{ margin: "0 10px" }}>NF Express</Link>
          <Link to="/ia" style={{ margin: "0 10px" }}>IA T Pulse</Link>
          <Link to="/logokombat" style={{ margin: "0 10px" }}>Logo Kombat</Link>
          <Link to="/perfil" style={{ margin: "0 10px" }}>Perfil</Link>
        </nav>

        {/* Rotas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/aniversariantes" element={<Aniversariantes />} />
          <Route path="/news" element={<News />} />
          <Route path="/checkin" element={<Checkin />} />
          <Route path="/nfexpress" element={<NFExpress />} />
          <Route path="/ia" element={<IA />} />
          <Route path="/logokombat" element={<LogoKombat />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
