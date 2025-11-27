module.exports = (sequelize, DataTypes) => {
  const Projeto = sequelize.define(
    "Projeto",
    {
      titulo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: "Projetos"
    }
  );

  return Projeto;
};