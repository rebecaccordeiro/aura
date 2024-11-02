import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Register = () => {
  return (
    <>
      <Header />
      <div className="container login-form col-lg-4">
        <form action="/register" method="POST">
          <img className="mb-4" src="/images/logo.svg" alt="" />
          <h1 className="h3 mb-3 fw-normal">Fazer cadastro</h1>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Email</label>
              <input type="email" className="form-control" placeholder="Email" />
            </div>
            <div className="form-group col-md-6">
              <label>Senha</label>
              <input type="password" className="form-control" placeholder="*****" />
            </div>
          </div>

          <div className="form-group">
            <label>Endereço</label>
            <input type="text" className="form-control" placeholder="Rua/Avenida e número" />
          </div>
          <div className="form-group">
            <label>Complemento</label>
            <input type="text" className="form-control" placeholder="Apartamento, bloco" />
          </div>

          <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
