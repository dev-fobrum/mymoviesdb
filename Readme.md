# My Movies DB

Este repositório contém o código-fonte de um sistema desenvolvido utilizando Node.js para o backend e React para o frontend, com o intuito de criar uma plataforma para consultas e registros de filmes.

O sistema utiliza a API do site The Movie Database https://developer.themoviedb.org/docs/getting-started

A estrutura de pastas é organizada da seguinte forma:

```
packages/
├── frontend/      # Código do frontend em React
└── backend/       # Código do backend em Node.js
```

# Iniciando via Docker

Certifique-se de ter o Docker instalado na sua máquina.

## Configuração

1. Renomeie o arquivo `docker-compose.yml.exemple` para `docker-compose.yml` e configure as variáveis de ambiente necessárias.
2. Navegue até a pasta `docker/sqlserver`.
3. Renomeie o arquivo `Dockerfile.sqlserver.example` para `Dockerfile.sqlserver` e configure a senha do banco de dados.

## Iniciar

Para criar as imagens (Backend, Frontend e Banco de Dados SQLServer), vá até a raiz do projeto e execute o comando:

```bash
npm run docker:up
```

# Para desenvolvimento

## Instalação

Certifique-se de ter o Node.js instalado na sua máquina. Para instalar as dependências do frontend e do backend, navegue para cada pasta respectivamente e execute o comando:

```bash
npm install
```

## Configuração

### Backend

1. Navegue até a pasta `packages/backend`.
2. Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente necessárias.

   O servidor estará acessível em `http://localhost:3003` por padrão.

### Frontend

1. Navegue até a pasta `packages/frontend`.
2. Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente necessárias, se aplicável.

   O aplicativo estará acessível em `http://localhost:3001` por padrão.

## Iniciando o projeto

Para desenvolvimento, entre na raiz do projeto e execute o comando:

```bash
npm run start
```

## Uso

Para utilização do frontend é necessário criar uma conta através da página inicial através do link `Faça sua conta`. O ambiente é amigável e intuitivo.

O sistema possui diversas rotas para interatividade do Frontend. Para mais informações, consulte o [READMEAPI\*](./READMEAPI.md).

### Outros

Para utilização do banco de dados via Docker individualmente, executar os seguintes comandos:

```bash
docker pull mcr.microsoft.com/mssql/server:2022-latest

docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=MY_STRONG_PASSWORD" `
   -p 1433:1433 --name sql1 --hostname sql1 `
   -d `
   mcr.microsoft.com/mssql/server:2022-latest
```
