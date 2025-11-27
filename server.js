const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Importa Sequelize models
const db = require("./models");
const { Disciplina, Projeto } = db;

// Dados fixos
const estudante = {
  nome: "Pedro Miguel",
  curso: "Desenvovimento de software multiplataforma",
  instituicao: "Fatec",
  anoIngresso: 2025,
};

// Página inicial
app.get("/", (req, res) => res.render("index", { nome: estudante.nome }));

// Sobre Mim
app.get("/sobre", (req, res) => res.render("sobre", { estudante }));

// ------------------------------
// CRUD DISCIPLINAS
// ------------------------------

app.get("/disciplinas", async (req, res) => {
  const disciplinas = await Disciplina.findAll();
  res.render("disciplinas", { disciplinas });
});

app.post("/disciplinas", async (req, res) => {
  await Disciplina.create({ nome: req.body.nome });
  res.redirect("/disciplinas");
});

app.post("/disciplinas/editar/:id", async (req, res) => {
  const { nome } = req.body;
  await Disciplina.update({ nome }, { where: { id: req.params.id } });
  res.redirect("/disciplinas");
});

app.post("/disciplinas/deletar/:id", async (req, res) => {
  await Disciplina.destroy({ where: { id: req.params.id } });
  res.redirect("/disciplinas");
});

// ------------------------------
// CRUD PROJETOS
// ------------------------------

app.get("/projetos", async (req, res) => {
  const projetos = await Projeto.findAll();
  res.render("projetos", { projetos });
});

app.post("/projetos", async (req, res) => {
  const { titulo, descricao, link } = req.body;
  await Projeto.create({ titulo, descricao, link });
  res.redirect("/projetos");
});

app.post("/projetos/editar/:id", async (req, res) => {
  const { titulo, descricao, link } = req.body;
  await Projeto.update(
    { titulo, descricao, link },
    { where: { id: req.params.id } }
  );
  res.redirect("/projetos");
});

app.post("/projetos/deletar/:id", async (req, res) => {
  await Projeto.destroy({ where: { id: req.params.id } });
  res.redirect("/projetos");
});

// ------------------------------
// Contato
// ------------------------------

app.get("/contato", (req, res) => {
  const contato = {
    email: "contato.pedronascimento2@gmail.com",
    telefone: "(12) 99161-0934",
  };
  res.render("contato", { contato });
});

// ------------------------------
// Dashboard
// ------------------------------

app.get("/dashboard", async (req, res) => {
  const totalDisciplinas = await Disciplina.count();
  const totalProjetos = await Projeto.count();
  const tecnologias = ["Node.js", "Express", "EJS", "HTML", "CSS"];

  res.render("dashboard", {
    totalDisciplinas,
    totalProjetos,
    tecnologias,
  });
});

// Servidor
app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);