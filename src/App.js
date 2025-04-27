import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomMenu from './components/BottomMenu';
// Importe abaixo todas as páginas da aplicação
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
        paddingBottom: '60px' // Espaço para o BottomMenu não cobrir o conteúdo
      }}>
        {/* Conteúdo principal centralizado */}
        <div style={{ width: '100%', maxWidth: '600px', flex: 1 }}>
          <Routes>
            {/* Mantenha todas as rotas existentes aqui, sem alterações */}
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
        {/* Menu de navegação inferior fixo */}
        <BottomMenu />
      </div>
    </Router>
  );
}

export default App;
