module.exports = (sequelize, Sequelize) => {
  const Club = sequelize.define("clubs", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Club;
};
