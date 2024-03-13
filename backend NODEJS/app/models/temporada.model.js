module.exports = (sequelize, Sequelize) => {
    const Temporada = sequelize.define("temporadas", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: Sequelize.STRING,
      },
    });
  
    return Temporada;
  };
  