# FocoTCC — Sistema de Gerenciamento de TCC

## TL;DR

**O que é:** plataforma educacional colaborativa para gerenciamento e acompanhamento de TCCs.<br>
**Stack:** React + TypeScript no frontend, Node.js/Express no backend e PostgreSQL/Prisma nos dados.<br>
**Diferencial:** assistente conversacional integrado à OpenRouter por meio do backend.<br>
**Contexto profissional:** projeto desenvolvido em equipe na Neukox, com liderança técnica e atuação full stack.

## Visão rápida

| Área | Implementação confirmada |
| --- | --- |
| Frontend | React, TypeScript, Vite, Tailwind CSS, React Router, React Hook Form, Zod, TanStack React Query e Axios |
| Backend | Node.js, Express e TypeScript |
| Dados | PostgreSQL, Prisma ORM e modelos relacionais para usuários, TCCs, atividades, reuniões, anotações, bancas e histórico |
| Segurança | Autenticação JWT, autorização por perfil e hash de senhas com BCrypt |
| IA | Assistente conversacional com fluxo frontend → backend → OpenRouter |
| Ambiente local | Aplicações executadas com npm e PostgreSQL local via Docker Compose |

Plataforma educacional colaborativa para acompanhamento e gerenciamento de Trabalhos de Conclusão de Curso, desenvolvida na Neukox como ambiente prático de desenvolvimento full-stack em equipe.

## Contexto educacional e equipe

O FocoTCC organiza em um único ambiente informações que normalmente ficam distribuídas entre mensagens, documentos e ferramentas distintas. A aplicação atende ao contexto acadêmico de alunos e professores e foi construída como projeto colaborativo — não como um SaaS comercial em produção.

### Equipe

- **Gabriel Falcão da Cruz** — Líder Técnico e Desenvolvedor Full Stack;
- **Davi Leal** — Desenvolvedor Frontend;
- **Israel Soares** — Desenvolvedor Full Stack;
- **Matheus Flores** — Desenvolvedor Frontend.

Gabriel atuou na liderança técnica, organização e acompanhamento das demandas, frontend, backend, integração entre camadas e apoio técnico à equipe.

## Problema

O acompanhamento de um TCC envolve prazos, atividades, orientações, registros e mudanças de status. Quando essas informações ficam dispersas, o aluno perde visibilidade do andamento e a colaboração acadêmica se torna mais difícil. O FocoTCC busca centralizar esse fluxo e tornar o progresso consultável.

## Funcionalidades

- cadastro e autenticação de alunos, professores e administradores;
- criação e atualização de TCC, com orientador, coorientador, área de conhecimento e status;
- acompanhamento de progresso e etapas;
- cadastro e atualização de atividades com prazo e situação;
- organização de reuniões, anotações e histórico de alterações;
- perfil do usuário e alteração de nome e senha;
- recuperação de senha por e-mail com SendGrid;
- assistente conversacional voltado a cronograma, metodologia, estrutura e normas acadêmicas.

## Arquitetura

```text
React + TypeScript + Vite
          |
          | HTTP/JSON (Axios)
          v
Node.js + Express + TypeScript
       |                 |
       | Prisma          | HTTPS
       v                 v
   PostgreSQL        OpenRouter
```

O frontend concentra a interface, a navegação e o consumo da API. O backend expõe rotas sob `/api`, aplica regras de autenticação e acesso e utiliza o Prisma para persistir os dados no PostgreSQL. React Query apoia o gerenciamento das requisições e do estado assíncrono no cliente.

## Assistente de IA

Ao enviar uma pergunta, o frontend identifica o tipo de ajuda, monta um contexto especializado e inclui parte do histórico recente. A mensagem é enviada para `POST /api/chat`; o backend então chama a API de chat completions da OpenRouter e devolve a resposta à interface.

A variável `OPENROUTER_API_KEY` é lida somente no servidor, evitando expor a credencial no bundle do frontend. O fluxo também trata chave inválida, limite de uso, timeout e falhas gerais; no cliente, há mensagens alternativas para indisponibilidade. Trata-se de uma integração com um modelo acessado via OpenRouter, não de um agente autônomo ou modelo treinado pelo projeto.

## Autenticação e persistência

A API emite tokens JWT no cadastro e no login. Rotas protegidas validam o cabeçalho `Authorization: Bearer <token>` e, quando necessário, restringem operações conforme o perfil do usuário. As senhas são armazenadas com hash BCrypt.

O Prisma representa as relações entre usuários, alunos, professores, TCCs, bancas, atividades, comentários, anotações, etapas, reuniões, defesas e histórico. O PostgreSQL é configurado por `DATABASE_URL`.

## Docker no estado atual

O `docker-compose.yml` possui apenas o serviço do PostgreSQL, construído com `Backend/Dockerfile.postgres` e persistido no volume `pgdata`.

> PostgreSQL local via Docker Compose.

Frontend e backend são executados diretamente com Node.js/npm. Portanto, o repositório não oferece containerização completa da aplicação.

## Stack

### Frontend

- React 19 e TypeScript;
- Vite;
- Tailwind CSS;
- React Router;
- React Hook Form e Zod;
- TanStack React Query;
- Axios.

### Backend e dados

- Node.js como runtime;
- Express como framework web;
- TypeScript;
- PostgreSQL;
- Prisma ORM;
- JSON Web Token e BCrypt;
- SendGrid e Handlebars para recuperação de senha por e-mail;
- OpenRouter para o assistente conversacional.

## Demonstração visual

> As capturas registram funcionalidades da interface e são complementadas pelo código do repositório. Elementos visuais não são tratados como prova de funcionalidades que não estejam implementadas.

### Fluxo 1 — Acompanhamento acadêmico

O dashboard reúne a visão do TCC e de seu andamento. A tela de atividades permite consultar entregas, prazos e situações, conectando o planejamento acadêmico aos registros de atividades e progresso mantidos pela API.

![Dashboard do FocoTCC](docs/images/dashboard.jpg)

![Lista de atividades e status](docs/images/tarefas.jpg)

**O que este conjunto demonstra:**

- centralização do acompanhamento do TCC;
- visualização de progresso, prazos e status;
- integração da interface com os modelos de TCC e atividade;
- navegação orientada ao fluxo acadêmico do aluno.

### Fluxo 2 — Assistente de IA

Na tela do assistente, o usuário envia uma dúvida relacionada ao desenvolvimento do TCC e recebe a resposta na própria conversa. A interface encaminha o contexto ao backend, que intermedeia a chamada à OpenRouter e mantém a chave da API no servidor. Esse desenho integra um serviço externo sem transferir a credencial sensível para o navegador.

![Assistente de IA do FocoTCC](docs/images/assistencia.jpg)

**O que este fluxo demonstra:**

- experiência conversacional integrada à aplicação;
- especialização de contexto conforme o tema da pergunta;
- separação de responsabilidades entre frontend, backend e provedor de IA;
- tratamento de indisponibilidade e erros conhecidos.

## Como executar localmente

### Pré-requisitos

- Node.js em versão LTS e npm;
- Git;
- Docker com Docker Compose, para o PostgreSQL.

### 1. Clone o repositório

```bash
git clone https://github.com/Neukox/Sistema_De_Gerenciamento_De_TCC.git
cd Sistema_De_Gerenciamento_De_TCC
```

### 2. Inicie o PostgreSQL

```bash
docker compose up -d postgres
```

### 3. Configure as variáveis de ambiente

Copie `Backend/.env.example` para `Backend/.env` e `Frontend/.env.example` para `Frontend/.env`. Preencha, no mínimo, as credenciais locais do banco, `JWT_SECRET` e `OPENROUTER_API_KEY`. Para recuperação de senha, configure também `SENDGRID_API_KEY` e `CLIENT_URL`.

```env
# Backend/.env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/meu_banco
PORT=3000
JWT_SECRET=troque_por_um_segredo_seguro
CLIENT_URL=http://localhost:5173
SENDGRID_API_KEY=sua_chave_sendgrid
OPENROUTER_API_KEY=sua_chave_openrouter
```

```env
# Frontend/.env
VITE_API_URL=http://localhost:3000/api/
```

### 4. Instale e prepare o backend

```bash
cd Backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Em outro terminal, opcionalmente carregue os dados iniciais com `npx prisma db seed`.

### 5. Inicie o frontend

```bash
cd Frontend
npm install
npm run dev
```

Por padrão, o frontend fica disponível em `http://localhost:5173` e a API em `http://localhost:3000/api`.

## Limitações atuais

- não há suíte automatizada de testes configurada;
- a containerização está restrita ao PostgreSQL;
- a documentação dos endpoints está distribuída em arquivos do backend, sem especificação OpenAPI central;
- o backend declara simultaneamente as dependências `bcrypt` e `bcryptjs`, usadas em pontos diferentes;
- o fluxo do assistente depende da disponibilidade e dos limites da OpenRouter.

## Roadmap

1. **Testes:** adicionar testes unitários, de integração e de interface para os fluxos críticos.
2. **Qualidade e higiene:** padronizar dependências de hash, revisar artefatos versionados e automatizar lint e build.
3. **Documentação da API:** consolidar rotas, contratos e exemplos em uma especificação OpenAPI.
4. **Containerização:** criar imagens para backend e frontend e ampliar o Compose para o ambiente completo.
5. **Segurança e observabilidade:** fortalecer validação, logs estruturados, monitoramento e políticas de segredos.
6. **Assistente:** ampliar contexto, testes de respostas e controles de custo e disponibilidade.

## O que o projeto demonstra profissionalmente

- liderança técnica e coordenação de trabalho em equipe;
- desenvolvimento full stack com separação clara entre interface, API e dados;
- modelagem relacional de um domínio acadêmico com Prisma e PostgreSQL;
- autenticação, autorização por perfil e integração de recuperação de senha;
- integração segura de um provedor de IA por meio do backend;
- capacidade de reconhecer limitações técnicas e organizar uma evolução incremental.

## Contato e licença

**Gabriel Falcão da Cruz**

- [Portfólio](https://www.gabrielfalcaodacruz.tech/)
- [LinkedIn](https://www.linkedin.com/in/gabrielfalcaodev/)
- [GitHub](https://github.com/GabrielF0900)
- [E-mail](mailto:falcaocruz.tech@gmail.com)

O pacote do backend declara licença MIT. Para formalizar a licença de todo o repositório, ainda é necessário adicionar um arquivo `LICENSE` na raiz.

Desenvolvido pela equipe **Neukox**.
