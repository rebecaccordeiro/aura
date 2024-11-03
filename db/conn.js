import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('aura', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => {
        console.log("Conectado com sucesso.");
    })
    .catch(err => {
        console.error("Erro ao conectar:", err);
    });

export default sequelize;
