module.exports = (sequelize, Sequelize) => {
  const Sesion = sequelize.define("sesiones", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    semana: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    anyo: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    lunes: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    martes: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    miercoles: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    jueves: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    viernes: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    sabado: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    domingo: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    enlace: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });


  return Sesion;
};
