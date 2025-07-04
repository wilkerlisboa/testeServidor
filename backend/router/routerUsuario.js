const express = require("express");
const routerUsuario = express.Router();
const UsuarioController = require("../controllers/usuarioController")

routerUsuario.get("/", UsuarioController.getAllUsuarios);
routerUsuario.post("/login", UsuarioController.getUsuarioLogin);
routerUsuario.post("/", UsuarioController.createUsuario);
routerUsuario.put("/:id", UsuarioController.updateUsuario);
routerUsuario.delete("/:id", UsuarioController.deleteUsuario);

module.exports = routerUsuario;
