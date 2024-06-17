# Documentação da API

## Sumário

1. [Introdução](#introdução)
2. [Autenticação](#autenticação)
   - [Login](#login)
   - [Esqueci a Senha](#esqueci-a-senha)
3. [Favoritos](#favoritos)
   - [Listar Favoritos](#listar-favoritos)
   - [Adicionar Favorito](#adicionar-favorito)
   - [Remover Favorito](#remover-favorito)
   - [Detalhes de Favorito](#detalhes-de-favorito)
4. [Últimos Filmes Vistos](#últimos-filmes-vistos)
   - [Listar Últimos Filmes Vistos](#listar-últimos-filmes-vistos)
   - [Adicionar Último Filme Visto](#adicionar-último-filme-visto)
   - [Remover Último Filme Visto](#remover-último-filme-visto)
   - [Detalhes de Último Filme Visto](#detalhes-de-último-filme-visto)
5. [Filmes](#filmes)
   - [Descobrir Filmes](#descobrir-filmes)
   - [Filmes em Destaque](#filmes-em-destaque)
   - [Detalhes do Filme](#detalhes-do-filme)
   - [Filmes Semelhantes](#filmes-semelhantes)
   - [Créditos do Filme](#créditos-do-filme)
   - [Gêneros de Filmes](#gêneros-de-filmes)
6. [Pessoas](#pessoas)
   - [Detalhes do Ator](#detalhes-do-ator)
   - [Filmes do Ator](#filmes-do-ator)
7. [Avaliações](#avaliações)
   - [Listar Todas as Avaliações](#listar-todas-as-avaliações)
   - [Detalhes da Avaliação](#detalhes-da-avaliação)
   - [Avaliações por Usuário](#avaliações-por-usuário)
   - [Criar Avaliação](#criar-avaliação)
   - [Atualizar Avaliação](#atualizar-avaliação)
   - [Remover Avaliação](#remover-avaliação)
8. [Usuários](#usuários)
   - [Listar Todos os Usuários](#listar-todos-os-usuários)
   - [Detalhes do Usuário Autenticado](#detalhes-de-um-usuário)
   - [Criar Novo Usuário](#criar-um-novo-usuário)
   - [Atualizar Dados do Usuário](#atualizar-dados-do-usuário)

---

## Introdução

Bem-vindo à documentação da API, que oferece recursos para interação com um sistema de filmes. Esta API permite realizar operações como autenticação de usuários, gerenciamento de favoritos, consulta de filmes, detalhes de atores, avaliações de filmes e gerenciamento de usuários.

## Autenticação

### Login

Endpoint para autenticar um usuário e obter um token JWT.

- **URL:** `/login`
- **Método:** `POST`
- **Body:**
  ```json
  {
    "username": "joao_silva",
    "password": "senha123"
  }
  ```
- **Resposta de Exemplo:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### Esqueci a Senha

Endpoint para solicitar uma redefinição de senha.

- **URL:** `/forgot-password`
- **Método:** `POST`
- **Body:**
  ```json
  {
    "email": "usuario@email.com"
  }
  ```
- **Resposta de Exemplo:**
  ```json
  {
    "message": "Instruções de recuperação de senha enviadas para o seu e-mail."
  }
  ```

## Favoritos

### Listar Favoritos

Endpoint para listar todos os filmes favoritos do usuário autenticado.

- **URL:** `/favorites`
- **Método:** `GET`
- **Autenticação:** Requer token JWT válido.

### Adicionar Favorito

Endpoint para adicionar um filme aos favoritos do usuário autenticado.

- **URL:** `/favorites`
- **Método:** `POST`
- **Autenticação:** Requer token JWT válido.
- **Body:**
  ```json
  {
    "movieId": "12345"
  }
  ```

### Remover Favorito

Endpoint para remover um filme dos favoritos do usuário autenticado.

- **URL:** `/favorites/:movieId`
- **Método:** `DELETE`
- **Autenticação:** Requer token JWT válido.

### Detalhes de Favorito

Endpoint para obter detalhes de um filme marcado como favorito pelo usuário autenticado.

- **URL:** `/favorites/:movieId`
- **Método:** `GET`
- **Autenticação:** Requer token JWT válido.

## Últimos Filmes Vistos

### Listar Últimos Filmes Vistos

Endpoint para listar os últimos filmes vistos pelo usuário autenticado.

- **URL:** `/lastsee`
- **Método:** `GET`
- **Autenticação:** Requer token JWT válido.

### Adicionar Último Filme Visto

Endpoint para adicionar um filme à lista de últimos filmes vistos pelo usuário autenticado.

- **URL:** `/lastsee`
- **Método:** `POST`
- **Autenticação:** Requer token JWT válido.
- **Body:**
  ```json
  {
    "movieId": "12345"
  }
  ```

### Remover Último Filme Visto

Endpoint para remover um filme da lista de últimos filmes vistos pelo usuário autenticado.

- **URL:** `/lastsee/:movieId`
- **Método:** `DELETE`
- **Autenticação:** Requer token JWT válido.

### Detalhes de Último Filme Visto

Endpoint para obter detalhes de um filme da lista de últimos filmes vistos pelo usuário autenticado.

- **URL:** `/lastsee/:movieId`
- **Método:** `GET`
- **Autenticação:** Requer token JWT válido.

## Filmes

### Descobrir Filmes

Endpoint para descobrir filmes com base em diferentes critérios.

- **URL:** `/discover`
- **Método:** `GET`
- **Autenticação:** Opcional.
- **Parâmetros de Consulta:**
  - `page`: Número da página (opcional, padrão é 1)
  - `query`: Consulta de pesquisa (opcional)
  - `ordering`: Ordenação dos resultados (opcional)
  - `genres`: Lista de gêneros (opcional)

### Filmes em Destaque

Endpoint para obter os filmes em destaque.

- **URL:** `/trending`
- **Método:** `GET`
- **Autenticação:** Opcional.
- **Parâmetros de Consulta:**
  - `page`: Número da página (opcional, padrão é 1)

### Detalhes do Filme

Endpoint para obter detalhes de um filme específico.

- **URL:** `/movies/:id`
- **Método:** `GET`
- **Autenticação:** Opcional.

### Filmes Semelhantes

Endpoint para obter filmes semelhantes a um filme específico.

- **URL:** `/movies/:id/similar`
- **Método:** `GET`
- **Autenticação:** Opcional.

### Créditos do Filme

Endpoint para obter os créditos (atores, diretores) de um filme específico.

- **URL:** `/movies/:id/credits`
- **Método:** `GET`
- **Autenticação:** Opcional.

### Gêneros de Filmes

Endpoint para obter todos os gêneros de filmes disponíveis.

- **URL:** `/genres`
- **Método:** `GET`
- **Autenticação:** Opcional.

## Pessoas

### Detalhes do Ator

Endpoint para obter detalhes de um ator específico.

- **URL:** `/persons/:id`
- **Método:** `GET`
- **Autenticação:** Opcional.

### Filmes do Ator

Endpoint para obter os filmes em que um ator específico participou.

- **URL:** `/persons/:id/movies`
- **Método:** `GET`
- **Autenticação:** Opcional.

## Avaliações

### Listar Todas as Avaliações (continuação)

- **Método:** `GET`
- **Autenticação:** Opcional.
- **Parâmetros de Consulta:**
  - `page`: Número da página (opcional, padrão é 1)

### Detalhes da Avaliação

Endpoint para obter detalhes de uma avaliação específica.

- **URL:** `/reviews/:reviewId`
- **Método:** `GET`
- **Autenticação:** Opcional.

### Avaliações por Usuário

Endpoint para obter todas as avaliações feitas por um usuário específico.

- **URL:** `/reviews/user/:userId`
- **Método:** `GET`
- **Autenticação:** Opcional.

### Criar Avaliação

Endpoint para criar uma nova avaliação para um filme.

- **URL:** `/reviews`
- **Método:** `POST`
- **Autenticação:** Requer token JWT válido.
- **Body:**
  ```json
  {
    "movieId": "12345",
    "rating": 4.5,
    "comment": "Ótimo filme!"
  }
  ```

### Atualizar Avaliação

Endpoint para atualizar uma avaliação existente.

- **URL:** `/reviews/:reviewId`
- **Método:** `PUT`
- **Autenticação:** Requer token JWT válido.
- **Body:**
  ```json
  {
    "rating": 5,
    "comment": "Maravilhoso!"
  }
  ```

### Remover Avaliação

Endpoint para remover uma avaliação existente.

- **URL:** `/reviews/:reviewId`
- **Método:** `DELETE`
- **Autenticação:** Requer token JWT válido.

## Usuários

### Listar Todos os Usuários

Endpoint para listar todos os usuários do sistema.

- **URL:** `/users`
- **Método:** `GET`
- **Autenticação:** Requer token JWT válido como administrador.

### Detalhes de um Usuário

Endpoint para obter detalhes do usuário autenticado.

- **URL:** `/users/me`
- **Método:** `GET`
- **Autenticação:** Requer token JWT válido.

### Criar um Novo Usuário

Endpoint para criar um novo usuário.

- **URL:** `/users`
- **Método:** `POST`
- **Autenticação:** Opcional.
- **Body:**
  ```json
  {
    "username": "novousuario",
    "password": "senha123",
    "email": "novousuario@email.com"
  }
  ```

### Atualizar Dados do Usuário

Endpoint para atualizar os dados do usuário autenticado.

- **URL:** `/users/me`
- **Método:** `PUT`
- **Autenticação:** Requer token JWT válido.
- **Body:**
  ```json
  {
    "username": "novousuario",
    "email": "novousuario@email.com"
  }
  ```

---
