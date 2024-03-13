module.exports = (sequelize, Sequelize) => {
  const Notificacion = sequelize.define("notificaciones", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: false,
    },
    fechaInicio: {
      type: Sequelize.DATE,
      allowNull: false,
      unique: false,
    },

    fechaFin: {
      type: Sequelize.DATE,
      allowNull: true,
      unique: false,
    },
    enlace: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false,
    },
  });

  return Notificacion;
};
