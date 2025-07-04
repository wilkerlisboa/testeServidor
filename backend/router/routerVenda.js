const express = require("express");
const routerVendas = express.Router();
const vendasController = require("../controllers/vendaController");

routerVendas.get("/", vendasController.getAllVendas);
routerVendas.get("/:id", vendasController.getVendasById);
routerVendas.post("/", vendasController.createVendas);

module.exports = routerVendas;
