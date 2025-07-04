/*
|-----------------------------------------------|
|                                               |
|     SERVIDOR PARA UMA PAPELARIA               |
|                                               |
|     LEITURA DA DOCUMENTAÇAO PARA MODIFICAR    |
|                                               |
|     AUTOR : @Wilkerlisboa_                    |
|                                               |
|-----------------------------------------------|
*/

// IMPORTANDO EXPRESS, SQLITE E O CORS
const express = require("express");
const cors = require("cors");

// CRIA UMA INSTANCIA DA APLICACAO EXPRESS
const banco = express();

// IMPORTANDO ROUTES e DATABASE
const materialRoutes = require("./router/routerMaterial");
const usuarioRoutes = require("./router/routerUsuario");
const vendasRoutes = require("./router/routerVenda");
const fileDatabase = require("./database/fileDatabase");

// INICIALIZA O CORS
banco.use(cors());

// APLICA O FORMATO JSON
banco.use(express.json());

// ROTAS 
banco.use("/materiais", materialRoutes);
banco.use("/usuario", usuarioRoutes);
banco.use("/vendas", vendasRoutes);

// INICIA UM SERVIDOR
banco.listen(3000, () => {
  console.log("SERVIDOR RODANDO EM http://localhost:3000");
});
