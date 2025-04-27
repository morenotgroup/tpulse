import React from 'react';

function News() {
  const noticias = [
    { titulo: "Novo Festival Confirmado!", resumo: "Em junho, prepare-se para o Arraiá do T Group!" },
    { titulo: "Parceria com novas marcas", resumo: "Toy Produções fecha novas parcerias para 2025." }
  ];

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Notícias</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
        {noticias.map((n, index) => (
          <div key={index} style={cardStyle}>
            <h3 style={{ margin: "0" }}>{n.titulo}</h3>
            <p style={{ margin: "5px 0 0", fontSize: "14px", color: "#666" }}>{n.resumo}</p>
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

export default News;
