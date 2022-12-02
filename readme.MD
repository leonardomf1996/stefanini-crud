## Requisitos
 1. Utilizar Clean Architectute
 2. Seu desafio precisa estar versionado no Github, em um repositório público
 3. Documentação é primordial e vamos nos guiar por ela ;)
 4. Um funcionário *deve* possuir como atributos : Id , Idade , Nome e Cargo
 5. Salvar as informações necessárias em um banco de dados relacional ou não relacional de sua escolha dentro de uma infraestrutura AWS
 6. Será necessário que a Lambda consiga consultar, deletar e atualizar um funcionário e que ele esteja acessível via internet
 7. Os recuros podem ser provisionados por serveless framework ou terraform
 8. Realizar testes unitário com JEST

## Como usar
1. Instale as dependências com `yarn` ou `npm install`
2. Com o docker instalado e iniciado, inserir no terminal
`docker run -d -p 27017:27017 -p 28017:28017 -e MONGODB_PASS="mongo" mongo`
3. Inicializar a aplicação com `yarn start` ou `npm run start`

## Endpoints criados:
- GET employees `http://localhost:5050/api/employee`
- POST employee `http://localhost:5050/api/employee`
- DELETE employee `http://localhost:5050/api/employee/:id`