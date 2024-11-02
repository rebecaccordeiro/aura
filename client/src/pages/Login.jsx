import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  return (
    <>
      <Header />
      <div className="container login-form col-lg-4">
        <form action="/login" method="POST">
          <img className="mb-4" src="/images/aura-logo.png" alt="" />
          <h1 className="h3 mb-3 fw-normal">Fazer login</h1>

          <div className="form-floating">
            <input type="email" className="form-control" placeholder="Insira seu e-mail" />
            <label>E-mail</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" placeholder="Insira sua senha" />
            <label>Senha</label>
          </div>

          <div className="form-check text-start my-3">
            <input className="form-check-input" type="checkbox" value="lembrar-login" />
            <label className="form-check-label">Lembrar-me</label>
          </div>
          <button className="btn btn-primary w-100 py-2" type="submit">Fazer Login</button>
          <p>Não possui cadastro? <a href="/register">Cadastre-se</a>.</p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
