import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { MdEvent, MdLunchDining, MdOutlineReceiptLong } from 'react-icons/md';
import { IoNewspaper } from 'react-icons/io5';
import { FaUser, FaRobot } from 'react-icons/fa';
import { GiCrossedSwords } from 'react-icons/gi';

function BottomMenu() {
  const location = useLocation();

  const menuStyle = {
    position: "fixed",
    bottom: 0,
    width: "100%",
    background: "linear-gradient(135deg, #ffffff 0%, #fef8f3 100%)",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px 0",
    borderTop: "1px solid #eee",
    zIndex: 1000,
    boxShadow: "0 -2px 8px rgba(0,0,0,0.05)"
  };

  const linkStyle = (path) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: location.pathname === path ? "#ff7a00" : "#333",
    fontSize: "11px",
    gap: "2px"
  });

  const iconStyle = (path) => ({
    fontSize: "24px",
    marginBottom: "2px",
    color: location.pathname === path ? "#ff7a00" : "#999",
    transition: "color 0.3s ease"
  });

  return (
    <div style={menuStyle}>
      <Link style={linkStyle('/')} to="/">
        <AiFillHome style={iconStyle('/')} />
        Home
      </Link>

      <Link style={linkStyle('/eventos')} to="/eventos">
        <MdEvent style={iconStyle('/eventos')} />
        Eventos
      </Link>

      <Link style={linkStyle('/news')} to="/news">
        <IoNewspaper style={iconStyle('/news')} />
        Notícias
      </Link>

      <Link style={linkStyle('/checkin')} to="/checkin">
        <MdLunchDining style={iconStyle('/checkin')} />
        Check-in
      </Link>

      <Link style={linkStyle('/nfexpress')} to="/nfexpress">
        <MdOutlineReceiptLong style={iconStyle('/nfexpress')} />
        NF Express
      </Link>

      <Link style={linkStyle('/ia')} to="/ia">
        <FaRobot style={iconStyle('/ia')} />
        IA
      </Link>

      <Link style={linkStyle('/logokombat')} to="/logokombat">
        <GiCrossedSwords style={iconStyle('/logokombat')} />
        Kombat
      </Link>

      <Link style={linkStyle('/perfil')} to="/perfil">
        <FaUser style={iconStyle('/perfil')} />
        Perfil
      </Link>
    </div>
  );
}

export default BottomMenu;
