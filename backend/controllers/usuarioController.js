const banco = require("../database/fileDatabase");

// ROTA PARA VER TODOS OS USUARIOS
exports.getAllUsuarios = (req, res) => {
  const usuarios = banco.prepare(`
    SELECT * FROM USUARIOS
  `).all();
  res.json(usuarios);
};

// ROTA PARA VER UM USUARIO ESPECIFICO
exports.getUsuarioLogin = (req, res) => {
  const { email, senha } = req.body;
  const usuario = banco.prepare(`
    SELECT * FROM USUARIOS WHERE EMAIL = ? AND SENHA = ?
  `).get(email, senha);
  if (usuario) {
    res.json({
      mensagem: "Usuário encontrado",
      usuario
    });
  } else {
    res.status(404).json({ erro: "Usuário não encontrado ou credenciais inválidas" });
  }
};

// ROTA PARA CRIAR UM NOVO USUARIO
exports.createUsuario = (req, res) => {
  const { nome, cpf, rg, endereco, funcao, email, senha } = req.body;
  const insert = banco.prepare(`
    INSERT INTO USUARIOS (NOME, CPF, RG, ENDERECO, FUNCAO, EMAIL, SENHA)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const info = insert.run(nome, cpf, rg, endereco, funcao, email, senha);
  res.json({ id: info.lastInsertRowid, nome });
};

// ROTA PARA ATUALIZAR UM USUARIO ESPECIFICO
exports.updateUsuario = (req, res) => {
  const { id } = req.params;
  const { nome, cpf, rg, endereco, funcao, email, senha } = req.body;
  const update = banco.prepare(`
    UPDATE USUARIOS SET NOME = ?, CPF = ?, RG = ?, ENDERECO = ?, FUNCAO = ?, EMAIL = ?, SENHA = ?
    WHERE ID = ?
  `);
  update.run(nome, cpf, rg, endereco, funcao, email, senha, id);
  res.json({ mensagem: "Usuário atualizado com sucesso!" });
};

// ROTA PARA DELETA USUARIO
exports.deleteUsuario = (req, res) => {
  const { id } = req.params;

  try {
    // Excluir registros relacionados primeiro (se existir outra tabela)
    banco.prepare(`DELETE FROM vendas WHERE usuario_id = ?`).run(id);

    // Agora sim remove o usuário
    banco.prepare(`DELETE FROM USUARIOS WHERE ID = ?`).run(id);

    res.json({ mensagem: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao deletar usuário. Verifique os vínculos no banco de dados." });
  }

};
