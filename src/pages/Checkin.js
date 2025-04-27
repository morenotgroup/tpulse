import React from 'react';

function Checkin() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Check-in do Almoço</h2>
      <p style={{ marginBottom: "20px" }}>Clique abaixo para fazer seu check-in:</p>
      <a href="https://script.google.com/macros/s/AKfycbw2nUG1r-_051Lbb6RBxuUHyqLRsBYq99hNB2panv8bbGryplPMzZo6yN8HCLg13tKR/exec" target="_blank" rel="noopener noreferrer" style={botao}>
        Fazer Check-in
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

export default Checkin;
