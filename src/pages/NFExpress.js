import React from 'react';

function NFExpress() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>NF Express</h2>
      <p>Envie sua Nota Fiscal de maneira rápida e segura.</p>
      <a href="https://script.google.com/macros/s/AKfycbwKBz2xVqc_YqnAfE_cuIgm3ahbfFu-H9DI72Wxyy8JyaH9iG-hZNkgY2QinNBNba0e/exec" target="_blank" rel="noopener noreferrer" style={botao}>
        Enviar NF
      </a>
    </div>
  );
}

const botao = {
  display: "inline-block",
  padding: "10px 20px",
  backgroundColor: "#ff7a00",
  color: "#fff",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "600",
  marginTop: "10px"
};

export default NFExpress;
