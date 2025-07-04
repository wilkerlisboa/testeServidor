let funcionariosCache = [];
const modalElement = document.getElementById("modalFuncionario");
const modal = new bootstrap.Modal(modalElement);
const modalTitle = modalElement.querySelector(".modal-title");
const modalBody = document.getElementById("modalFuncionarioBody");
const modalFooter = document.getElementById("modalFuncionarioFooter");

async function carregarProdutos() {
  const tabela = document.getElementById("tabelaProdutos");
  try {
    const res = await fetch("http://localhost:3000/materiais");
    const produtos = await res.json();
    tabela.innerHTML = produtos
      .map(
        (p) => `
            <tr>
              <td>${p.ID}</td>
              <td>${p.NOME}</td>
              <td>${p.QUANTIDADE}</td>
              <td>${p.LOCALIZACAO}</td>
              <td>R$ ${parseFloat(p.PRECO).toFixed(2).replace(".", ",")}</td>
            </tr>
          `
      )
      .join("");
  } catch (err) {
    console.error("Erro ao carregar produtos:", err);
    tabela.innerHTML = `<tr><td colspan="5" class="text-danger text-center">Erro ao carregar os produtos.</td></tr>`;
  }
}

async function carregarFuncionarios() {
  const tabela = document.getElementById("tabelaFuncionarios");
  try {
    const res = await fetch("http://localhost:3000/usuario");
    const funcionarios = await res.json();
    funcionariosCache = funcionarios;

    tabela.innerHTML = funcionarios
      .map(
        (f) => `
            <tr>
              <td>${f.ID}</td>
              <td>${f.NOME}</td>
              <td>${f.FUNCAO}</td>
              <td>${f.EMAIL}</td>
              <td>
                <button class="btn btn-sm btn-info me-1" onclick="visualizarFuncionario(${f.ID})"><i class="fas fa-eye"></i></button>
                <button class="btn btn-sm btn-warning me-1" onclick="editarFuncionario(${f.ID})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deletarFuncionario(${f.ID})"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>`
      )
      .join("");
  } catch (err) {
    console.error(err);
    tabela.innerHTML = `<tr><td colspan="5" class="text-danger text-center">Erro ao carregar funcionários.</td></tr>`;
  }
}

async function carregarResumo() {
  try {
    const resVendas = await fetch("http://localhost:3000/vendas");
    const vendas = await resVendas.json();
    const total = vendas.length;
    const soma = vendas.reduce(
      (acc, venda) => acc + parseFloat(venda.TOTAL),
      0
    );
    document.getElementById("totalVendas").textContent = total;
    document.getElementById(
      "valorTotalVendas"
    ).textContent = `R$ ${soma.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    })}`;
  } catch (err) {
    console.error("Erro ao carregar vendas:", err);
  }

  try {
    const resMateriais = await fetch("http://localhost:3000/materiais");
    const materiais = await resMateriais.json();
    const totalQuantidade = materiais.reduce(
      (acc, m) => acc + parseInt(m.QUANTIDADE),
      0
    );
    const totalValor = materiais.reduce(
      (acc, m) => acc + parseInt(m.QUANTIDADE) * parseFloat(m.PRECO),
      0
    );
    document.getElementById("quantidadeEstoque").textContent = totalQuantidade;
    document.getElementById(
      "valorEstoque"
    ).textContent = `R$ ${totalValor.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    })}`;
  } catch (err) {
    console.error("Erro ao carregar estoque:", err);
  }

  try {
    const resUsuarios = await fetch("http://localhost:3000/usuario");
    const usuarios = await resUsuarios.json();
    document.getElementById("quantidadeFuncionarios").textContent =
      usuarios.length;
  } catch (err) {
    console.error("Erro ao carregar funcionários:", err);
  }
}

function abrirModal(titulo, corpoHTML, footerHTML = "") {
  modalTitle.textContent = titulo;
  modalBody.innerHTML = corpoHTML;
  modalFooter.innerHTML = footerHTML;
  modal.show();
}

function visualizarFuncionario(id) {
  const func = funcionariosCache.find((f) => f.ID === id);
  if (!func) {
    abrirModal("Erro", "<p>Funcionário não encontrado.</p>");
    return;
  }
  const corpo = `
          <p><strong>ID:</strong> ${func.ID}</p>
          <p><strong>Nome:</strong> ${func.NOME}</p>
          <p><strong>Função:</strong> ${func.FUNCAO}</p>
          <p><strong>Email:</strong> ${func.EMAIL}</p>
        `;
  abrirModal(
    "Visualizar Funcionário",
    corpo,
    `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>`
  );
}

function editarFuncionario(id) {
  const func = funcionariosCache.find((f) => f.ID === id);
  if (!func) {
    abrirModal("Erro", "<p>Funcionário não encontrado.</p>");
    return;
  }
  const corpo = `
      <form id="formEditarFuncionario">
        <div class="mb-3">
          <label for="nomeFuncionario" class="form-label">Nome</label>
          <input type="text" class="form-control" id="nomeFuncionario" value="${
            func.NOME ?? ""
          }" required>
        </div>
        <div class="mb-3">
          <label for="cpfFuncionario" class="form-label">CPF</label>
          <input type="text" class="form-control" id="cpfFuncionario" value="${
            func.CPF ?? ""
          }" required>
        </div>
        <div class="mb-3">
          <label for="rgFuncionario" class="form-label">RG</label>
          <input type="text" class="form-control" id="rgFuncionario" value="${
            func.RG ?? ""
          }" required>
        </div>
        <div class="mb-3">
          <label for="enderecoFuncionario" class="form-label">Endereço</label>
          <input type="text" class="form-control" id="enderecoFuncionario" value="${
            func.ENDERECO ?? ""
          }" required>
        </div>
        <div class="mb-3">
          <label for="funcaoFuncionario" class="form-label">Função</label>
          <input type="text" class="form-control" id="funcaoFuncionario" value="${
            func.FUNCAO ?? ""
          }" required>
        </div>
        <div class="mb-3">
          <label for="emailFuncionario" class="form-label">Email</label>
          <input type="email" class="form-control" id="emailFuncionario" value="${
            func.EMAIL ?? ""
          }" required>
        </div>
        <div class="mb-3">
          <label for="senhaFuncionario" class="form-label">Senha</label>
          <input type="password" class="form-control" id="senhaFuncionario" value="${
            func.SENHA ?? ""
          }" required>
        </div>
      </form>
    `;
  const footer = `
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
      <button type="button" class="btn btn-primary" onclick="salvarEdicaoFuncionario(${id})">Salvar</button>
    `;
  abrirModal("Editar Funcionário", corpo, footer);
}

async function salvarEdicaoFuncionario(id) {
  const nome = document.getElementById("nomeFuncionario").value.trim();
  const cpf = document.getElementById("cpfFuncionario").value.trim();
  const rg = document.getElementById("rgFuncionario").value.trim();
  const endereco = document.getElementById("enderecoFuncionario").value.trim();
  const funcao = document.getElementById("funcaoFuncionario").value.trim();
  const email = document.getElementById("emailFuncionario").value.trim();
  const senha = document.getElementById("senhaFuncionario").value.trim();

  if (!nome || !cpf || !rg || !endereco || !funcao || !email || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/usuario/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        NOME: nome,
        CPF: cpf,
        RG: rg,
        ENDERECO: endereco,
        FUNCAO: funcao,
        EMAIL: email,
        SENHA: senha,
      }),
    });

    if (res.ok) {
      alert("Funcionário atualizado com sucesso!");
      modal.hide();
      carregarFuncionarios();
    } else {
      alert("Erro ao atualizar funcionário.");
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao atualizar funcionário.");
  }
}
async function salvarEdicaoFuncionario(id) {
  const nome = document.getElementById("nomeFuncionario").value.trim();
  const funcao = document.getElementById("funcaoFuncionario").value.trim();
  const email = document.getElementById("emailFuncionario").value.trim();

  if (!nome || !funcao || !email) {
    alert("Preencha todos os campos.");
    return;
  }

  // Exemplo de envio para backend - ajuste conforme sua API
  try {
    const res = await fetch(`http://localhost:3000/usuario/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ NOME: nome, FUNCAO: funcao, EMAIL: email }),
    });

    if (res.ok) {
      alert("Funcionário atualizado com sucesso!");
      modal.hide();
      carregarFuncionarios();
    } else {
      alert("Erro ao atualizar funcionário.");
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao atualizar funcionário.");
  }
}

function deletarFuncionario(id) {
  const corpo = `<p>Tem certeza que deseja deletar o funcionário <strong>ID ${id}</strong>?</p>`;
  const footer = `
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-danger" onclick="confirmarDeletarFuncionario(${id})">Deletar</button>
        `;
  abrirModal("Confirmar Exclusão", corpo, footer);
}

async function confirmarDeletarFuncionario(id) {
  try {
    const res = await fetch(`http://localhost:3000/usuario/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      alert("Funcionário deletado com sucesso!");
      modal.hide();
      carregarFuncionarios();
    } else {
      alert("Erro ao deletar funcionário.");
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao deletar funcionário.");
  }
}

carregarResumo();
carregarProdutos();
carregarFuncionarios();
