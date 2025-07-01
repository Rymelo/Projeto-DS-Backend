<div align="center">
  <h1>Projeto API Digital Store</h1>
  <a href="https://rymelo.github.io/Projeto-DS-Frontend/" target="_blank"><img alt="Foto da página inicial" src="https://github.com/user-attachments/assets/afffdc20-78ab-41d3-b751-f515eb468990"></a>
Este projeto foi desenvolvido para fins de avaliação e assimilação de conhecimento durante o curso de desenvolvimento web Geração Tech. 
</div>

## 📑 Índice

- 🔍 [Sobre](#sobre)
- 🛠️ [Ferramentas utilizadas](#%EF%B8%8F-ferramentas-utilizadas)
- 📁 [Estrutura do Projeto](#-estrutura-do-projeto)
- 🚀 [Instruções de instalação](#-instruções-de-instalação)
- 📄 [Documentação da API](#-documentação-da-api)
- 🙌 [Créditos](#-créditos)


## 🔍 Sobre
Essa é a segunda etapa do projeto de um ecommerce interativo, dessa vez estabelecendo a parte back-end do projeto, de forma a cumprir com os critérios da [documentação](#-créditos) através da aplicação dos conhecimentos adquiridos.</br></br>
**A primeira etapa (frontend) pode ser conferida [aqui](https://github.com/Rymelo/Projeto-DS-Frontend).**

## 🛠️ Ferramentas utilizadas
<div align="center">
  
<a href="https://nodejs.org/pt-br/" target="_blank">![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)</a>
<a href="https://expressjs.com/pt-br/" target="_blank">![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)</a>
<a href="https://www.npmjs.com/package/dotenv" target="_blank">![Dotenv](https://img.shields.io/badge/Dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)</a>
<a href="https://nodemon.io/" target="_blank">![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)</a>
<a href="https://www.mysql.com/" target="_blank">![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)</a>
<a href="https://sequelize.org/" target="_blank">![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)</a>
<a href="https://jwt.io/" target="_blank">![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)</a>

>  **Node.js** para fornecer a possibilidade de executar JS em um servidor</br>
>  **Express.js** para criar rotas de api</br>
>  **Dotenv** para criarmos configurações com mais facilidade e segurança</br>
>  **Nodemon** para termos mais produtividade em nosso ambiente de desenvolvimento</br>
>  **MySQL** para persistência de dados</br>
>  **Sequelize** para termos mais produtividade ao lidar com o banco de dados </br>
>  **JWT** para adicionar segurança e limitar o acesso nas rotas de API

</div>


## 📁 Estrutura do projeto


<details>
  <summary><strong>Estruturação das pastas</strong></summary>

### Dos diretórios principais do projeto:
```
project-root/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
└── package.json
```

</details>

## 🚀 Instruções de instalação
<details>
  <summary><strong>Como executar o projeto</strong></summary>

1.  **Clonar o repositório:**
    * Crie uma pasta na área de trabalho
    * Abra o terminal do seu editor de código ou terminal GIT
    
    ```bash
    git clone https://github.com/Rymelo/Projeto-DS-Backend
    ```

2.  **Configure o banco de dados:**
    * Crie um novo banco de dados mySQL chamado `DSBackend` com as seguintes especificações:
    ```
    DB_USER=root
    DB_PASSWORD=admin
    DB_HOST=localhost
    DB_PORT=3306
    DB_NAME=DSBackend
    ```
    * O arquivo connections na pasta config mostra toda a configuração necessária

3.  **Entre na pasta do projeto:**

    ```bash
    cd Projeto-DS-Backend
    ```

4.  **Instale as dependências:**

    ```bash
    npm install
    ```

5.  **Estabeleça a criação das tabelas:**

    ```bash
    cd database
    node sync.js
    ```

6.  **Execute o projeto localmente:**

    ```bash
    npm start
    ```

7.  **Utilize a ferramenta para teste de APIs**
   * Ferramentas como [postman](https://www.postman.com/) ou [insomnia](https://insomnia.rest/)
   * O projeto foi feito conforme a documentação, então as configurações das rotas são as mesmas, estando todas detalhadas [aqui](https://github.com/digitalcollegebr/projeto-backend)


</details>

<details>
  <summary><strong>Guia de uso da aplicação</strong></summary>
  
  </br>
  
  **Na aplicação, todas as rotas exceto GET e CREATE de User utilizam JWT. Portanto, para o teste total da aplicação é necessário:**
  
1.  **Criar o usuário:**
    * Abra a ferramenta de teste de API e crie um http request do tipo post
    * Insira a rota http://localhost:3000/v1/user na URL Preview
    * Crie o usuário conforme o payload em json:

    ```json
    {
      "firstname": "user firstname",
      "surname": "user surname",
      "email": "user@mail.com",
      "password": "123@123",
      "confirmPassword": "123@123",
    }  
    ```

2.  **Autenticar TOKEN:**
    * Crie um http request do tipo post
    * Insira a rota http://localhost:3000/v1/user/token na URL Preview
    * Faça o login conforme as informações do usuário criado, com o payload em json:

    ```json
    {
      "email": "user@mail.com",
      "password": "123@123",
    }  
    ```
    
    * Será gerado um token como resposta
    * Para todas as outras rotas que serão criadas, basta inserir nos headers:
    * Authorization: bearer 'inserir-token-gerado'
    * Dessa forma a api pode ser usada livremente

</details>

## 📄 Documentação da API
**A documentação foi feita no POSTMAN, com as requisições estabelecidas na documentação:**
  ```bash
  https://documenter.getpostman.com/view/46316809/2sB34ZqPQ6
  ```

## 🙌 Créditos

### 👨‍🏫 Geração Tech
O [Geração Tech](https://geracaotech.iel-ce.org.br/) é um projeto do Instituto Euvaldo Lodi (IEL) e o Governo do Estado do Ceará por meio da Agência de Desenvolvimento do Estado do Ceará (ADECE) para capacitação de jovens na área da tecnologia. 
A iniciativa tem o objetivo de oferecer Formação em Desenvolvimento Web, com ênfase no protagonismo dos jovens no mercado da tecnologia e inovação.

### 📄 Documentação
O projeto foi desenvolvido tendo como base a [documentação](https://github.com/digitalcollegebr/projeto-backend) disponibilizada pelo curso, em parceria com a Digital College
