# PROMPT V5 — FOCOTCC
## README FINAL PADRONIZADO COM TL;DR

Você está com o repositório `Neukox/Sistema_De_Gerenciamento_De_TCC` aberto no Antigravity/Codex.

## OBJETIVO

Atualizar SOMENTE o `README.md` para seguir o padrão aprovado de portfólio:

- TL;DR curto no topo;
- visão rápida;
- precisão técnica;
- imagens explicadas;
- narrativa visual agrupada;
- sem métricas inventadas;
- leitura rápida para recrutador;
- profundidade suficiente para entrevista.

Leia o README atual e o código/configuração relevante antes de editar.

---

# TL;DR — OBRIGATÓRIO

Inserir logo após o título.

No máximo 4–5 linhas úteis.

Formato esperado:

## TL;DR

**O que é:** plataforma educacional colaborativa para gerenciamento e acompanhamento de TCCs.  
**Stack:** React + TypeScript no frontend, Node.js/Express no backend e PostgreSQL/Prisma nos dados.  
**Diferencial:** assistente conversacional integrado à OpenRouter por meio do backend.  
**Contexto profissional:** projeto desenvolvido em equipe na Neukox, com liderança técnica e atuação full stack.

Ajuste apenas conforme o código atual.

Não usar percentuais ou claims não medidos.

---

# POSICIONAMENTO

Apresentar como:

> Plataforma educacional colaborativa para acompanhamento e gerenciamento de Trabalhos de Conclusão de Curso, desenvolvida na Neukox como ambiente prático de desenvolvimento full-stack em equipe.

Não apresentar como SaaS comercial em produção.

---

# EQUIPE

Registrar:

- Gabriel Falcão da Cruz — Líder Técnico e Desenvolvedor Full Stack;
- Davi Leal — Desenvolvedor Frontend;
- Israel Soares — Desenvolvedor Full Stack;
- Matheus Flores — Desenvolvedor Frontend.

Gabriel atuou em:

- liderança técnica;
- organização e acompanhamento das demandas;
- frontend;
- backend;
- integração entre camadas;
- apoio técnico à equipe.

Não atribuir features específicas a integrantes sem evidência.

---

# VISÃO RÁPIDA

Criar uma tabela curta logo após o TL;DR ou após o parágrafo de contexto:

- Frontend;
- Backend;
- Dados;
- Segurança;
- IA;
- Ambiente local.

Usar somente tecnologias confirmadas.

Node.js = runtime.  
Express = framework/backend web.

---

# FATOS A VALIDAR

## Frontend
- React;
- TypeScript;
- Vite;
- Tailwind CSS;
- React Router;
- React Hook Form;
- Zod;
- TanStack React Query;
- Axios, se presente.

## Backend
- Node.js;
- Express;
- TypeScript;
- PostgreSQL;
- Prisma;
- JWT;
- BCrypt, se presente;
- email/SendGrid, se presente;
- OpenRouter.

## Docker
O antigo `Dockerfile.backend` vazio foi removido.

Confirme.

Se Docker Compose continuar subindo apenas PostgreSQL:

escrever:

> PostgreSQL local via Docker Compose.

NÃO afirmar containerização completa.

---

# ASSISTENTE DE IA

Se o fluxo continuar:

Frontend → Backend → OpenRouter

descrever como integração real.

Explicar resumidamente:

- mensagem sai do frontend;
- backend intermedeia;
- chave da API fica no servidor;
- tratamento de erro somente conforme código.

Não chamar de:

- agente autônomo;
- IA proprietária;
- modelo treinado pelo projeto.

---

# MÉTRICAS PROIBIDAS

Não manter:

- redução de 40%;
- 100% de paridade;
- qualquer percentual sem metodologia.

Demonstrar impacto qualitativo:

- centralização;
- acompanhamento;
- colaboração;
- integração;
- assistente IA.

---

# IMAGENS — PADRÃO FINAL

Preserve todas as imagens válidas.

Use uma nota curta antes da demonstração:

> As capturas registram funcionalidades da interface e são complementadas pelo código do repositório. Elementos visuais não são tratados como prova de funcionalidades que não estejam implementadas.

## Fluxo 1 — Acompanhamento acadêmico

Agrupar:

- Dashboard;
- Atividades/status.

Explicar:

- o que o usuário acompanha;
- relação com o objetivo do TCC;
- relação com o backend/modelo somente quando comprovada.

Depois:
**O que este conjunto demonstra:** 2–4 bullets.

## Fluxo 2 — Assistente de IA

A imagem do assistente merece bloco próprio.

Explicar:

- ação do usuário;
- frontend → backend → OpenRouter;
- proteção da API key;
- diferencial técnico.

Sem excesso de ressalvas.

---

# ESTRUTURA

1. Título.
2. TL;DR.
3. Visão rápida.
4. Contexto educacional/equipe.
5. Problema.
6. Funcionalidades.
7. Arquitetura.
8. Assistente IA.
9. Autenticação/persistência.
10. Docker real.
11. Stack.
12. Demonstração visual agrupada.
13. Execução.
14. Limitações.
15. Roadmap.
16. O que demonstra profissionalmente.
17. Contato/licença.

---

# LIMITAÇÕES

Aproximadamente 4–6 itens.

Somente fatos reais, como:

- testes limitados;
- dependências inconsistentes, se persistirem;
- `.history`;
- containerização restrita ao banco;
- documentação de endpoints.

---

# ROADMAP

Agrupar em até 6 eixos:

1. Testes;
2. Qualidade/higiene;
3. Documentação API;
4. Containerização;
5. Segurança/observabilidade;
6. Evolução do assistente.

---

# CHECKLIST

- [ ] TL;DR adicionado.
- [ ] TL;DR curto e verificável.
- [ ] Stack confirmada.
- [ ] Equipe correta.
- [ ] OpenRouter descrito corretamente.
- [ ] Docker descrito conforme estado real.
- [ ] Sem métricas artificiais.
- [ ] Imagens preservadas e explicadas.
- [ ] Somente README.md alterado.

Ao final informe:

1. TL;DR criado;
2. imagens preservadas;
3. agrupamento visual;
4. claims removidos/corrigidos;
5. confirmação de somente README.md alterado.
