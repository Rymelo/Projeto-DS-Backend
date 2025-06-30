# Projeto API Digital Store
Este projeto foi desenvolvido para fins de avaliação e assimilação de conhecimento durante o curso de desenvolvimento web Geração Tech. 

## Índice

- [Sobre](#sobre)
- [Ferramentas utilizadas](#ferramentas-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instruções de instalação](#Instruções-de-instalação)
- [Créditos](#créditos)

## Sobre
Essa é a segunda etapa do projeto de um ecommerce interativo, dessa vez estabelecendo as conexões à parte back-end do projeto, de forma a cumprir com os critérios da [documentação](#créditos) através da aplicação dos conhecimentos adquiridos.
A primeira etapa (frontend) pode ser conferida [aqui](https://github.com/Rymelo/Projeto-DS-Frontend)

## Ferramentas utilizadas
- **Node.js** para fornecer a possibilidade de executar JS em um servidor
- **Express.js** para criar rotas de api
- **Dotenv** para criarmos configurações com mais facilidade e segurança
- **Nodemon** para termos mais produtividade em nosso ambiente de desenvolvimento
- **MySQL** para persistência de dados
- **Sequelize** para termos mais produtividade ao lidar com o banco de dados 
- **JWT** para adicionar segurança e limitar o acesso nas rotas de API

## Estrutura do projeto


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

## Instruções de instalação
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

## Créditos

### Geração Tech
O [Geração Tech](https://geracaotech.iel-ce.org.br/) é um projeto do Instituto Euvaldo Lodi (IEL) e o Governo do Estado do Ceará por meio da Agência de Desenvolvimento do Estado do Ceará (ADECE) para capacitação de jovens na área da tecnologia. 
A iniciativa tem o objetivo de oferecer Formação em Desenvolvimento Web, com ênfase no protagonismo dos jovens no mercado da tecnologia e inovação.

### Documentação
O projeto foi desenvolvido tendo como base a [documentação](https://github.com/digitalcollegebr/projeto-backend) disponibilizada pelo curso.
