import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

const Notification = () => {
  return (
    <>
      <Header />
      <Menu />
      <div className="notifications">
        <div className="notification">
          <img src="/images/profile-example.png" height="40px" alt="profile" />
          <p><strong>Rebeca Cordeiro</strong> fez alguma ação.</p>
          <hr />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Notification;
