const form = document.getElementById("cadastroForm");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  mensagem.textContent = "";
  mensagem.style.color = "red";

  const nome = form.nome.value.trim();
  const cpf = form.cpf.value.trim();
  const rg = form.rg.value.trim();
  const endereco = form.endereco.value.trim();
  const funcao = form.funcao.value.trim();
  const email = form.email.value.trim();
  const senha = form.senha.value;

  let valido = true;

  // Validação básica
  if (!nome) {
    form.nome.classList.add("is-invalid");
    valido = false;
  } else {
    form.nome.classList.remove("is-invalid");
  }
  if (!cpf.match(/^\d{11}$/)) {
    form.cpf.classList.add("is-invalid");
    valido = false;
  } else {
    form.cpf.classList.remove("is-invalid");
  }
  if (!rg) {
    form.rg.classList.add("is-invalid");
    valido = false;
  } else {
    form.rg.classList.remove("is-invalid");
  }
  if (!endereco) {
    form.endereco.classList.add("is-invalid");
    valido = false;
  } else {
    form.endereco.classList.remove("is-invalid");
  }
  if (!funcao) {
    form.funcao.classList.add("is-invalid");
    valido = false;
  } else {
    form.funcao.classList.remove("is-invalid");
  }
  if (!email || !email.includes("@")) {
    form.email.classList.add("is-invalid");
    valido = false;
  } else {
    form.email.classList.remove("is-invalid");
  }
  if (!senha || senha.length < 6) {
    form.senha.classList.add("is-invalid");
    valido = false;
  } else {
    form.senha.classList.remove("is-invalid");
  }

  if (!valido) return;

  // Envia para a API
  try {
    const response = await fetch("http://192.168.100.54:3000/usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, cpf, rg, endereco, funcao, email, senha }),
    });

    const data = await response.json();

    if (!response.ok) {
      mensagem.textContent = data.mensagem || "Erro ao cadastrar.";
      return;
    }

    mensagem.style.color = "green";
    mensagem.textContent = "Cadastro realizado com sucesso!";
    form.reset();
  } catch (error) {
    console.error(error);
    mensagem.textContent = "Erro na conexão com o servidor.";
  }
});
