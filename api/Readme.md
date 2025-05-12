# API Documentation
 
API construída com Node.js, Express e TypeScript.
## Rotas de **Daily**

As rotas abaixo estão associadas ao gerenciamento das "Daily" (entidade do sistema).

### **POST** `/create`
- **Descrição**: Cria uma nova entrada de "Daily".
- **Autenticação**: Requer autenticação (usando `authMiddleware`).
- **Corpo da Requisição**: Dados necessários para criar a entrada de "Daily".
- **Exemplo de uso**:
  ```json
  {
    "title": "Meu Daily",
    "description": "Descrição do Daily"
  }

### **GET** `/`
- **Descrição**: Retorna todas as entradas de "Daily".
- **Autenticação**: Requer autenticação (usando `authMiddleware`).

### **GET** `/:id`
- **Descrição**: Retorna uma entrada de "Daily" pelo seu ID.
- **Autenticação**: Requer autenticação (usando `authMiddleware`).
- **Corpo da Requisição**: Dados necessários para criar a entrada de "Daily".
- **Parâmetros:**: `id` (string): ID da entrada de "Daily" que deseja consultar.


### PUT `/update/:id`
- **Descrição**: Atualiza uma entrada de "Daily" com o ID fornecido.

- **Autenticação**: Requer autenticação (usando `authMiddleware`).

- **Parâmetros**:

    - id (string): ID da entrada de "Daily" que será atualizada.

    - Corpo da Requisição: Dados que irão substituir os dados atuais do "Daily".

- **Exemplo de uso**:
  ```json
  {
    "title": "Meu Daily att",
    "description": "Descrição do Daily att"
  }

### DELETE `/delete/:id`
- **Descrição**: Exclui uma entrada de "Daily" com o ID fornecido.

- **Autenticação**: Requer autenticação (usando `authMiddleware`).

- **Parâmetros**:
    - id (string): ID da entrada de "Daily" que será excluída.

##  Rotas de Autenticação

As rotas abaixo são responsáveis pelas funcionalidades de login, registro e perfil do usuário.

### POST `/register`
- **Descrição**: Registra um novo usuário.

- **Corpo da Requisição**: Dados necessários para registrar um novo usuário.

- **Exemplo de uso**:
  ```json
  {
    "name": "myname",
    "email": "meuemail@email.com",
    "passowrd": "12345678"
  }

### POST `/login`
- **Descrição**: Realiza o login de um usuário.

- **Corpo da Requisição**: Dados de login do usuário.

- **Exemplo de uso**:
  ```json
  {
    "email": "meuemail@email.com",
    "passowrd": "123345678"
  }

### POST `/logout`
- **Descrição**: Realiza o logout do usuário autenticado.

- **Autenticação**: Requer autenticação (usando `authMiddleware`).

### GET `/profile`
- **Descrição**: Retorna o perfil do usuário autenticado.

- **Autenticação**: Requer autenticação (usando `authMiddleware`).

## Middlewares
### authMiddleware
- **Descrição**: Middleware de autenticação utilizado em diversas rotas. Garante que a requisição seja feita por um usuário autenticado, verificando o token JWT enviado.

## Tecnologias Usadas
- **Node.js**

- **Express**

- **TypeScript**

- **JWT**

- **MongoDB**

### Como Rodar
- **Clone o repositório.**

- **Instale as dependências:**

`npm install`

- **Rode a aplicação:**

`npm start`
`http://localhost:4000`
