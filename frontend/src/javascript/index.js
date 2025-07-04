document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch("http://192.168.100.54:3000/usuario/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      document.getElementById("mensagem").textContent = errorData.mensagem || "Erro no login";
      return;
    }

    const data = await response.json();
    
    // Guarda o nome do usuário no localStorage
    localStorage.setItem("nomeUsuario", data.usuario.NOME);
    
    // Redireciona para dashboard.html
    window.location.href = "./screens/admin/dashboard.html";
    

  } catch (error) {
    document.getElementById("mensagem").textContent = "Erro ao conectar ao servidor.";
    console.error("Erro:", error);
  }
});
