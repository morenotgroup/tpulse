import React from 'react';
import { Link } from 'react-router-dom';

function BottomMenu() {
  const menuStyle = {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff8f0", // Offwhite/bege
    display: "flex",
    justifyContent: "space-around",
    padding: "10px 0",
    borderTop: "1px solid #ddd"
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#ff7a00", // Laranja vibrante do T Group
    fontSize: "14px"
  };

  return (
    <div style={menuStyle}>
      <Link style={linkStyle} to="/">Home</Link>
      <Link style={linkStyle} to="/eventos">Eventos</Link>
      <Link style={linkStyle} to="/news">Notícias</Link>
      <Link style={linkStyle} to="/ia">IA</Link>
      <Link style={linkStyle} to="/perfil">Perfil</Link>
    </div>
  );
}

export default BottomMenu;
