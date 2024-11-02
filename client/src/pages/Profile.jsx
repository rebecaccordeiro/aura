import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

const Profile = () => {
  return (
    <>
      <Header />
      <Menu />
      <div className="profile">
        <img className="profile-pic" src="/images/profile-example.png" height="100px" alt="profile" />
        <div className="profile-text">
          <h1>Rebeca Cordeiro</h1>
          <h3>NÍVEL: 1</h3>
          <p>Mini biografia do usuário.</p>
        </div>
        <h2>Trabalhos Feitos</h2>
        <hr />
        <h2>Selos Conquistados</h2>
        <hr />
      </div>
      <Footer />
    </>
  );
};

export default Profile;
