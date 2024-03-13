module.exports = (sequelize, Sequelize) => {
  const Categoria = sequelize.define("categorias", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  });

  return Categoria;
};
