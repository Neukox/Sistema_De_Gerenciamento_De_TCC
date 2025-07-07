async function login() {
  const resposta = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: "suelemfalcao@gmail.com",
      senha: "10668889730"
    })
  });

  const dados = await resposta.json();

  if (resposta.ok) {
    console.log("Login feito com sucesso:", dados);
    // Exemplo: salvar token
    localStorage.setItem("token", dados.token);
  } else {
    console.error("Erro no login:", dados.mensagem || dados);
  }
}
