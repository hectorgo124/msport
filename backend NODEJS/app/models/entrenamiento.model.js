module.exports = (sequelize, Sequelize) => {
  const Entrenamiento = sequelize.define("entrenamientos", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false
    },
    tipo : {
      type: Sequelize.INTEGER,
      allowNull: true,
      unique: false
    }
  });

  return Entrenamiento;
};
