# Teste de Integração Frontend-Backend

## Como testar a aplicação completa

### 1. Iniciar o Backend
```bash
cd Backend
npm run build
npm run dev
```
O backend rodará em: http://localhost:3000

### 2. Iniciar o Frontend  
```bash
cd Frontend
npm run dev
```
O frontend rodará em: http://localhost:5173

### 3. Configurar banco de dados (se necessário)
```bash
# No diretório Backend
docker run --name postgres-tcc -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=tcc -p 9000:5432 -d postgres:13

# Aplicar schema
npx prisma db push

# Popular áreas de conhecimento
npx prisma db seed
```

### 4. Fluxo de teste

#### Registro:
1. Acesse http://localhost:5173/register
2. Preencha todos os campos:
   - Nome completo: "João Silva Santos"
   - Instituição: "Universidade Federal do Brasil"
   - Email: "joao@teste.com"
   - Confirmar email: "joao@teste.com"
   - Senha: "123456"
   - Confirmar senha: "123456"
3. Clique em "Criar Conta"
4. Se bem-sucedido, será redirecionado para login

#### Login:
1. Acesse http://localhost:5173/login (ou será redirecionado automaticamente)
2. Use as credenciais criadas:
   - Email: "joao@teste.com"
   - Senha: "123456"
3. Clique em "Entrar"
4. Se bem-sucedido, será redirecionado para /maindashboard

### 5. APIs Disponíveis

#### POST /register
```json
{
  "nomeCompleto": "João Silva Santos",
  "instituicao": "Universidade Federal do Brasil",
  "email": "joao@teste.com", 
  "confirmEmail": "joao@teste.com",
  "senha": "123456",
  "confirmSenha": "123456"
}
```

#### POST /login
```json
{
  "email": "joao@teste.com",
  "senha": "123456"
}
```

### 6. Recursos implementados

#### Frontend:
- ✅ Formulário de registro conectado à API
- ✅ Formulário de login conectado à API
- ✅ Validação de campos
- ✅ Exibição de mensagens de erro/sucesso
- ✅ Estados de loading
- ✅ Redirecionamento automático após login
- ✅ Armazenamento de token JWT no localStorage

#### Backend:
- ✅ API de registro (/register)
- ✅ API de login (/login)
- ✅ Validações completas
- ✅ Criptografia de senhas
- ✅ Geração de JWT
- ✅ CORS configurado
- ✅ Schema Prisma atualizado
- ✅ Seed das áreas de conhecimento

### 7. Próximos passos

Após confirmar que login/registro funcionam:
1. Implementar rotas protegidas
2. Adicionar middleware de autenticação
3. Expandir dashboard
4. Implementar CRUD de TCCs
5. Adicionar gerenciamento de professores

---

**Status**: ✅ Integração frontend-backend completa
**Testado**: Login e registro funcionais
**Token**: Armazenado automaticamente no localStorage
