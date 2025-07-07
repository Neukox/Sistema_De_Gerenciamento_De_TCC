

export async function fetchLogin(email: string, senha: any) {
  try {
    const resposta = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      console.log("Login feito com sucesso:", dados);
      // Armazena o token, se vier
      localStorage.setItem("token", dados.token);
    } else {
      console.error("Erro no login:", dados.mensagem || dados);
    }
  } catch (erro) {
    console.error("Erro na requisição:", erro);
  }
}
