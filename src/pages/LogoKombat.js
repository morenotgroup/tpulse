import React, { useState } from 'react';

function LogoKombat() {
  const [logos, setLogos] = useState([
    "Criativa", "Hub", "Uma Uma", "TOP", "Ás", "Formô", "Influence", "Interativa", "Euforia", "G4"
  ]);

  const eliminarLogo = (logo) => {
    setLogos(logos.filter(l => l !== logo));
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Logo Kombat!</h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}>
        Clique para eliminar a concorrência!
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
        {logos.map((logo, index) => (
          <button key={index} onClick={() => eliminarLogo(logo)} style={botaoStyle}>
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
  padding: "10px 15px",
  backgroundColor: "#ff7a00",
  border: "none",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "14px",
  cursor: "pointer"
};

export default LogoKombat;
