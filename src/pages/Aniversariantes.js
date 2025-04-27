import React from 'react';

function Aniversariantes() {
  const aniversariantes = [
    { nome: "Maria Silva", data: "02/04" },
    { nome: "João Pedro", data: "10/04" },
    { nome: "Fernanda Costa", data: "22/04" }
  ];

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Aniversariantes</h2>
      <div style={{ marginTop: "20px", textAlign: "left" }}>
        {aniversariantes.map((a, index) => (
          <div key={index} style={linhaStyle}>
            <strong>{a.data}</strong> — {a.nome}
          </div>
        ))}
      </div>
    </div>
  );
}

const linhaStyle = {
  padding: "10px 0",
  borderBottom: "1px solid #ddd"
};

export default Aniversariantes;
