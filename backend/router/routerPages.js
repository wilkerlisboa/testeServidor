const express = require("express");
const path = require("path");

const routerPages = express.Router();

routerPages.get('/perfil', (req, res) =>{
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'src', 'screens', 'admin', 'perfilAdmin.html'));
});

routerPages.get('/dashboard', (req, res) =>{
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'src', 'screens', 'admin', 'dashboard.html'));
});

routerPages.get('/produtos', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'src', 'screens', 'pages', 'paginaProdutos.html'));
});

routerPages.get('/relatorios', (req, res) =>{
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'src', 'screens', 'pages', 'paginaRelatorios.html'));
});

routerPages.get('/usuarios', (req, res) =>{
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'src', 'screens', 'pages', 'paginaUsuarios.html'));
});

routerPages.get('/home', (req, res) =>{
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'src', 'index.html'));
});

routerPages.get('/cadastro', (req, res) =>{
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'src', 'screens', 'cadastro.html'));
});
module.exports = routerPages;