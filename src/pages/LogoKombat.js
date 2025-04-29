import React, { useState } from 'react';

function LogoKombat() {
  const [logos, setLogos] = useState([
    "Criativa", "Hub", "Uma Uma", "TOP", "Ás", "Formô", "Influence", "Interativa", "Euforia", "G4"
  ]);

  const eliminarLogo = (logo, e) => {
    e.target.style.transform = "scale(1.1)";
    setTimeout(() => e.target.style.transform = "scale(1)", 100);
    setLogos(logos.filter(l => l !== logo));
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #ffffff 0%, #f9e4c8 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "20px",
      textAlign: "center"
    }}>
      <h2 style={{ marginBottom: "10px" }}>Logo Kombat!</h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}>
        Clique nas logos para eliminá-las!
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
        {logos.map((logo, index) => (
          <button
            key={index}
            onClick={(e) => eliminarLogo(logo, e)}
            style={botaoStyle}
          >
            {logo}
          </button>
        ))}
      </div>
      <p style={{ marginTop: "30px", fontSize: "14px", color: "#999" }}>
        Logos eliminadas: {10 - logos.length}
      </p>
    </div>
  );
}

const botaoStyle = {
  padding: "10px 20px",
  backgroundColor: "#ff7a00",
  color: "#fff",
  borderRadius: "12px",
  border: "none",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease",
  marginBottom: "8px"
};

export default LogoKombat;
