const banco = require("../database/fileDatabase");

// ROTA PARA VER TODAS AS VENDAS
exports.getAllVendas = (req, res) => {
    const vendas = banco.prepare(`
        SELECT *FROM VENDAS
    `).all();
    res.json(vendas);
}

// ROTA PARA VER UMA VENDA ESPECIFICA
exports.getVendasById = (req, res) => {
    const { id } = req.params;
    const vendas = banco.prepare(`
        SELECT *FROM VENDAS WHERE ID = ?    
    `).get(id);
    res.json(vendas);
}

// ROTA PARA CRIAR UMA NOVA VENDA
exports.createVendas = (req, res) => {
    const { usuario_id, materia_id, data, quantidade } = req.body;

    const material = banco.prepare(`
        SELECT * FROM MATERIAS WHERE ID = ?
    `).get(materia_id);

    const total = material.PRECO * quantidade;

    const insertVenda = banco.prepare(`
        INSERT INTO VENDAS (USUARIO_ID, MATERIA_ID, DATA, QUANTIDADE, TOTAL)
        VALUES (?, ?, ?, ?, ?)
    `);

    const info = insertVenda.run(usuario_id, materia_id, data, quantidade, total);

    const atualizarEstoque = banco.prepare(`
        UPDATE MATERIAS SET QUANTIDADE = QUANTIDADE - ? WHERE ID = ?
    `);
    atualizarEstoque.run(quantidade, materia_id);

    res.json({
        id: info.lastInsertRowid,
        materia_id,
        quantidade,
        total,
        data
    });
};
