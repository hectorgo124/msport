module.exports = (sequelize, Sequelize) => {
    const Album = sequelize.define("albums", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      enlace: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return Album;
  };
  