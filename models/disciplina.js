module.exports = (sequelize, DataTypes) => {
  const Disciplina = sequelize.define(
    "Disciplina",
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: "Disciplinas"
    }
  );

  return Disciplina;
};