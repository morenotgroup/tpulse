import React from 'react';
import { Link } from 'react-router-dom';
import { MdEvent, MdCelebration } from 'react-icons/md';
import { IoNewspaper } from 'react-icons/io5';

function Home() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #fef8f3 0%, #f9e4c8 100%)",
      minHeight: "100vh",
      padding: "20px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center"
    }}>
      
      {/* Boas-vindas */}
      <h2 style={{
        color: "#333",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: "8px",
        padding: "10px"
      }}>
        Bem-vindo(a) ao T Pulse!
      </h2>

      <p style={{
        color: "#666",
        fontSize: "14px",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderRadius: "8px",
        padding: "6px",
        marginTop: "10px",
        marginBottom: "30px"
      }}>
        Sua intranet oficial do T Group
      </p>

      {/* Cards principais */}
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

      {/* Rodapé interno */}
      <div style={{
        marginTop: "40px",
        fontSize: "12px",
        color: "#999",
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: "8px",
        padding: "5px"
      }}>
        Powered by T Group
      </div>

    </div>
  );
}

// Estilos
const cardStyle = {
  backgroundColor: "rgba(255,255,255,0.85)",
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
