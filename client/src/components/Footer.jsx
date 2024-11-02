import React from 'react';

const Footer = () => {
  return (
    <div className="container" id="footer">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-muted">© 2024 Aura Social App</p>
        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Home</a></li>
          <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Sobre Nós</a></li>
          <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Contato</a></li>
          <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">FAQs</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
