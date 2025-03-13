# 🍽️ NutriFácil - Plataforma de Receitas  

## 📝 Sobre o Projeto  

O **NutriFácil** é uma plataforma de receitas desenvolvida com **Node.js** e **Express**, permitindo que usuários cadastrem, gerenciem e compartilhem suas receitas de forma simples e intuitiva. A aplicação conta com autenticação de usuários e armazenamento de dados no **MongoDB Atlas**, garantindo persistência e segurança.  

## 🚀 Tecnologias Utilizadas  

- **Node.js** 🟩  
- **Express.js** ⚡  
- **MongoDB Atlas** 🍃 (banco de dados na nuvem)  
- **Mongoose** 📄 (ODM para MongoDB)  
- **Dotenv** 🔑 (variáveis de ambiente)  
- **Bcrypt** 🔒 (criptografia de senhas)  
- **JsonWebToken (JWT)** 🔑 (autenticação)  
- **EJS** 🎨 (template engine)  
- **Express-Session** 🛠️ (gerenciamento de sessão)  
- **Cors** 🌍 (para requisições externas)  

## ⚙️ Funcionalidades  

- 🔐 **Cadastro e login de usuários**  
- 📌 **Home page** com as receitas mais recentes  
- 🔍 **Barra de pesquisa** para encontrar receitas pelo nome ou ingredientes  
- 📂 **Categorias de receitas** para facilitar a navegação  
- 📝 **Cadastro, edição e exclusão de receitas**  
- 👤 **Página de perfil**, onde o usuário pode gerenciar suas próprias receitas  

## ⚙️ Configuração do Projeto  

### 🔧 Pré-requisitos  

Antes de iniciar, certifique-se de ter o **Node.js** instalado.  

### 🛠️ Passo a Passo  

1. **Clone o repositório**  

   ```bash
   git clone https://github.com/seu-usuario/nutrifacil.git

   cd nutri-facil
2. Instale as dependências
    ```bash
   npm instal
   ```
3. Configure as variáveis de ambiente
    - Crie um arquivo .env na raiz do projeto e adicione:
    ```env
        MONGO_URI='mongodb+srv://seu_usuario:senha@seu-cluster.mongodb.net/todo-db?retryWrites=true&w=majority'
    ```
4. Inicie o servidor
    ```bash
        npm run dev
    ```
5. A API estará disponível em: http://localhost:3000