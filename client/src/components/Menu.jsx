import React from 'react';

const Menu = () => {
  return (
    <div className="row">
      <div className="col-lg-3" id="sideMenu">
        <div className="logo"><img src="/images/aura-logo.png" alt="Aura Logo" /></div>
        <nav className="navbarText">
          <ul>
            <li><a href=""><i className="bi bi-search"></i> Pesquisar</a></li>
            <li><a href="/home"><i className="bi bi-house"></i> Home</a></li>
            <li><a href="/board"><i className="bi bi-clipboard-heart"></i> Fazer o Bem</a></li>
            <li><a href="/notifications"><i className="bi bi-bell"></i> Notificações</a></li>
            <li><a href="/profile"><i className="bi bi-person-circle"></i> Perfil</a></li>
          </ul>
        </nav>
        <div style={{ textAlign: 'right' }}>
          <p className="bottom-align"><a href=""><i className="bi bi-gear"></i> Configurações</a></p>
        </div>
      </div>
      <div className="col-sm-12 col-lg-9">
        {/* Conteúdo da página */}
      </div>
    </div>
  );
};

export default Menu;
