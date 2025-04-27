import React from 'react';
import { Link } from 'react-router-dom';
import { MdEvent, MdCelebration } from 'react-icons/md';
import { IoNewspaper } from 'react-icons/io5';

function Home() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      
      {/* Boas-vindas */}
      <h2 style={{ color: "#333", marginBottom: "10px" }}>Bem-vindo(a) ao T Pulse!</h2>
      <p style={{ color: "#666", fontSize: "14px", marginBottom: "30px" }}>
        Sua intranet oficial do T Group
      </p>

      {/* Destaques Rápidos */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        <Link to="/eventos" style={cardStyle}>
          <MdEvent style={iconStyle} />
          <span>Eventos do Mês</span>
        </Link>

        <Link to="/aniversariantes" style={cardStyle}>
          <MdCelebration style={iconStyle} />
          <span>Aniversariantes</span>
        </Link>

        <Link to="/news" style={cardStyle}>
          <IoNewspaper style={iconStyle} />
          <span>Notícias</span>
        </Link>

      </div>

      {/* Espaço final */}
      <div style={{ marginTop: "40px", fontSize: "12px", color: "#999" }}>
        Powered by T Group
      </div>
      
    </div>
  );
}

// Estilos
const cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "20px",
  textDecoration: "none",
  color: "#333",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: "600"
};

const iconStyle = {
  fontSize: "32px",
  color: "#ff7a00",
  marginBottom: "10px"
};

export default Home;
