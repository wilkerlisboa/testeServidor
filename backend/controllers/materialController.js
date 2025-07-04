const banco = require("../database/fileDatabase");

// ROTA PARA VER TODOS OS MATERIAS
exports.getAllMateriais = (req, res) => {
    const materiais = banco.prepare(`
      SELECT *FROM MATERIAS
    `).all();
  res.json(materiais);
};

// ROTA PARA VER UM MATERIAL ESPECIFICO
exports.getMateriaisById = (req, res) => {
  const { id } = req.params;
  const materiais = banco.prepare(`
    SELECT *FROM MATERIAS WHERE ID = ?
  `).get(id);
  res.json(materiais);
};

// ROTA PARA ENVIAR MATERIAL
exports.createtMaterial = (req, res) => {
  const { nome, categoria, quantidade, preco, marca, descricao, localizacao } = req.body;
  const envio = banco.prepare(`
    INSERT INTO MATERIAS (NOME, CATEGORIA, QUANTIDADE, PRECO, MARCA, DESCRICAO, LOCALIZACAO) VALUES(?,?,?,?,?,?,?)  
  `);
  const info = envio.run(nome, categoria, quantidade, preco, marca, descricao, localizacao);
  res.json({
    id: info.lastInsertRowid,
    nome,
    quantidade,
    localizacao,
  });
};

// ROTA PARA ATUALIZAR UM MATERIAL ESPECIFICO
exports.updateMaterialById = (req, res) => {
  const { id } = req.params;
  const { nome, categoria, quantidade, preco, descricao, localizacao } = req.body;
  const envio = banco.prepare(`
    UPDATE MATERIAS SET NOME= ?, CATEGORIA= ?, QUANTIDADE= ?, PRECO= ?, DESCRICAO= ?, LOCALIZACAO= ? WHERE ID=?
  `);
  const info = envio.run(nome, categoria, quantidade, preco, descricao, localizacao, id);
  res.json({
    id: info.lastInsertRowid,
    nome,
    mensagem: "Material atualizado com sucesso",
  });
};

// ROTA PARA DELETAR UM MATERIAL ESPECIFICO
exports.deleteMaterialById = (req, res) => {
  const { id } = req.params;
  const envio = banco.prepare(`
    DELETE FROM MATERIAS WHERE ID= ?
  `);
  const info = envio.run(id);
  res.json({
    id: info.lastInsertRowid,
    mensagem: "deletado com sucesso!",
  });
};
