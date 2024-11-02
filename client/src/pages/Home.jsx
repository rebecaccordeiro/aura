import React from 'react';
import Header from './partials/Header';
import Menu from './partials/Menu';
import Footer from './partials/Footer';

const Home = () => {
  return (
    <>
      <Header />
      <Menu />

      <div className="notifications">
        <h1>Publique uma nova postagem</h1>

        <form>
          <div className="mb-3">
            <label htmlFor="postContent" className="form-label visually-hidden">Conteúdo da Postagem</label>
            <textarea className="form-control" id="postContent" rows="5" placeholder="Digite o conteúdo da postagem"></textarea>
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="postFile" className="btn btn-outline-secondary btn-icon me-2 mb-0">
              <i className="bi bi-paperclip"></i>
              <input type="file" id="postFile" className="d-none" />
            </label>
            <button type="submit" className="btn btn-secondary">Publicar</button>
          </div>
        </form>

        {/* Repetindo post */}
        <div className="individual-post">
          <div className="card">
            <div className="card-body">
              <div className="post-header-container">
                <img src="/images/profile-example.png" className="post-profile-image" alt="Profile" />
                <div className="post-header-text">
                  <p className="post-name-text"><a href="">Rebeca Cordeiro</a></p>
                  <p className="post-time-text"><small className="text-body-secondary">Há 3 horas</small></p>
                </div>
              </div>
              <p className="card-text">Lorem ipsum dolor sit amet...</p>
            </div>
            <img src="/images/job-img-example.jpeg" className="card-img-bottom" alt="Job Image" />
            <div className="card-body">
              <p className="card-text"><small className="text-body-secondary">23 curtidas | 4 comentários</small></p>
            </div>
            <div className="card-footer">
              <button type="button" className="btn btn-outline-secondary"><i className="bi bi-heart"></i> Curtir</button>
              <button type="button" className="btn btn-outline-secondary"><i className="bi bi-chat"></i> Comentar</button>
              <button type="button" className="btn btn-outline-secondary"><i className="bi bi-send"></i> Compartilhar</button>
            </div>
            <div className="form-floating post-comment">
              <form>
                <textarea className="form-control" placeholder="Deixe seu comentário" style={{ height: '100px' }}></textarea>
                <button type="submit" className="btn btn-secondary">Enviar comentário</button>
              </form>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default Home;