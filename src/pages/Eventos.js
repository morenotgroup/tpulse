import React from 'react';

function Eventos() {
  const eventos = [
    { mes: "Abril", evento: "Festa Universitária Abril" },
    { mes: "Maio", evento: "Festival das Cores" },
    { mes: "Junho", evento: "Arraiá do T Group" }
  ];

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Eventos do Mês</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
        {eventos.map((e, index) => (
          <div key={index} style={cardStyle}>
            <h3 style={{ margin: "0" }}>{e.mes}</h3>
            <p style={{ margin: "5px 0 0" }}>{e.evento}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

export default Eventos;
