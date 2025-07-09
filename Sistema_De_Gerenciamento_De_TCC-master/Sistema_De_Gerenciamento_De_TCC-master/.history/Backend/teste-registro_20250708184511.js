// Teste simples do algoritmo de registro sem conectar ao banco

// Simulação básica do registro
function testeRegistro() {
    const dadosEntrada = {
        nomeCompleto: "João Silva Santos",
        instituicao: "Universidade Federal de Teste",
        email: "joao@teste.com",
        confirmEmail: "joao@teste.com", 
        senha: "123456",
        confirmSenha: "123456"
    };

    console.log("Testando validações...");

    // Teste 1: Campos obrigatórios
    const camposObrigatorios = ['nomeCompleto', 'instituicao', 'email', 'confirmEmail', 'senha', 'confirmSenha'];
    const camposFaltando = camposObrigatorios.filter(campo => !dadosEntrada[campo]);
    
    if (camposFaltando.length > 0) {
        console.log("❌ Erro: Campos obrigatórios faltando:", camposFaltando);
        return false;
    }
    console.log("✅ Todos os campos obrigatórios preenchidos");

    // Teste 2: Emails coincidem
    if (dadosEntrada.email !== dadosEntrada.confirmEmail) {
        console.log("❌ Erro: Emails não coincidem");
        return false;
    }
    console.log("✅ Emails coincidem");

    // Teste 3: Senhas coincidem
    if (dadosEntrada.senha !== dadosEntrada.confirmSenha) {
        console.log("❌ Erro: Senhas não coincidem");
        return false;
    }
    console.log("✅ Senhas coincidem");

    // Teste 4: Formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dadosEntrada.email)) {
        console.log("❌ Erro: Formato de email inválido");
        return false;
    }
    console.log("✅ Formato de email válido");

    // Teste 5: Tamanho da senha
    if (dadosEntrada.senha.length < 6) {
        console.log("❌ Erro: Senha deve ter pelo menos 6 caracteres");
        return false;
    }
    console.log("✅ Senha tem tamanho adequado");

    console.log("\n🎉 Todas as validações passaram!");
    console.log("📝 Dados que seriam enviados para o banco:");
    console.log({
        usuario: {
            nomeCompleto: dadosEntrada.nomeCompleto.trim(),
            email: dadosEntrada.email.toLowerCase(),
            tipo: 'aluno',
            role: 'user'
        },
        aluno: {
            curso: '', // Vazio inicialmente
            instituicao: dadosEntrada.instituicao.trim()
        }
    });

    return true;
}

// Executar teste
console.log("=== TESTE DO ALGORITMO DE REGISTRO ===\n");
testeRegistro();
