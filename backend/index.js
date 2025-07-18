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
const path = require("path");
// CRIA UMA INSTANCIA DA APLICACAO EXPRESS
const banco = express();

// IMPORTANDO ROUTES e DATABASE
const materialRoutes = require("./router/routerMaterial");
const usuarioRoutes = require("./router/routerUsuario");
const vendasRoutes = require("./router/routerVenda");
const pageRouter = require('./router/routerPages');



// INICIALIZA O CORS
banco.use(cors());

// APLICA O FORMATO JSON
banco.use(express.json());
banco.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta frontend/src
banco.use(express.static(path.join(__dirname, '..', 'frontend', 'src')));

// ROTAS 
banco.use("/materiais", materialRoutes);
banco.use("/usuarios", usuarioRoutes);
banco.use("/vendas", vendasRoutes);
// Usando o router de páginas:
banco.use('/pages', pageRouter);


// INICIA UM SERVIDOR
banco.listen(3000, () => {
  console.log("SERVIDOR RODANDO EM http://localhost:3000");
});
