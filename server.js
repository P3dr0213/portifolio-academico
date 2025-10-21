const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Dados base
const estudante = {
  nome: "Pedro Miguel",
  curso: "Desenvovimento de software multiplataforma",
  instituicao: "Fatec",
  anoIngresso: 2025,
};

let disciplinas = [
  { id: 1, nome: "Programação Web II" },
  { id: 2, nome: "modelagem de Banco Dados" },
  { id: 3, nome: "Engenharia de Software II" },
];

let projetos = [
  {
    id: 1,
    titulo: "API Newe",
    descricao: "desenvolvimento de uma API para uma empresa chamada Newe",
    link: "https://github.com/CodexDSM/CodeX",
  },
  {
    id: 2,
    titulo: "Aero Code",
    descricao: "criação de um sistema inline para cadastrar avião",
    link: "https://github.com/P3dr0213/AV1",
  },
];

//ROTAS

//Página inicial
app.get("/", (req, res) => res.render("index", { nome: estudante.nome }));

//Sobre Mim
app.get("/sobre", (req, res) => res.render("sobre", { estudante }));

//Disciplians crud
app.get("/disciplinas", (req, res) => res.render("disciplinas", { disciplinas }));

app.post("/disciplinas", (req, res) => {
  const novaDisciplina = { id: Date.now(), nome: req.body.nome };
  disciplinas.push(novaDisciplina);
  res.redirect("/disciplinas");
});

app.put("/disciplinas/editar/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nome } = req.body;
  disciplinas = disciplinas.map((d) =>
    d.id === id ? { ...d, nome } : d
  );
  res.redirect("/disciplinas");
});

app.delete("/disciplinas/deletar/:id", (req, res) => {
  const id = parseInt(req.params.id);
  disciplinas = disciplinas.filter((d) => d.id !== id);
  res.redirect("/disciplinas");
});

//Projetos crud
app.get("/projetos", (req, res) => res.render("projetos", { projetos }));

app.post("/projetos", (req, res) => {
  const { titulo, descricao, link } = req.body;
  projetos.push({ id: Date.now(), titulo, descricao, link });
  res.redirect("/projetos");
});

app.put("/projetos/editar/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, descricao, link } = req.body;
  projetos = projetos.map((p) =>
    p.id === id ? { ...p, titulo, descricao, link } : p
  );
  res.redirect("/projetos");
});

app.delete("/projetos/deletar/:id", (req, res) => {
  const id = parseInt(req.params.id);
  projetos = projetos.filter((p) => p.id !== id);
  res.redirect("/projetos");
});

//Contato
app.get("/contato", (req, res) => {
  const contato = { email: "contato.pedronascimento2@gmail.com", telefone: "(12) 99161-0934" };
  res.render("contato", { contato });
});

//Dashboard
app.get("/dashboard", (req, res) => {
  const totalDisciplinas = disciplinas.length;
  const totalProjetos = projetos.length;
  const tecnologias = ["Node.js", "Express", "EJS", "HTML", "CSS"];
  res.render("dashboard", { totalDisciplinas, totalProjetos, tecnologias });
});

//Servidor
app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
