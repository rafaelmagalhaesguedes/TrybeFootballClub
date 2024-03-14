# Trybe Football Club ⚽

Bem-vindo à API da Trybe Football Club! Esta API fornece informações sobre partidas, times e classificações de futebol. Foi desenvolvida utilizando tecnologias modernas e boas práticas de desenvolvimento de software, com o objetivo de oferecer uma experiência de alta qualidade e confiabilidade.

__Link do Deploy__: [Trybe Football Club](https://deploy-project-fcmnaw2el-rafaelmagalhaesguedes.vercel.app/leaderboard)

## Tecnologias Utilizadas

- React.js
- Node.js
- Express
- TypeScript
- MySQL/PostgreSQL
- Sequelize
- Mocha/Sinon/Chai
- Docker

## Princípios e Práticas

> __SOLID__: Os princípios SOLID foram aplicados para criar um código mais modular, flexível e de fácil manutenção.

> __Programação Orientada a Objetos (POO)__: A POO foi adotada para estruturar o código de forma coesa e orientada a objetos.

> __Arquitetura de Software__: A API foi desenvolvida seguindo uma arquitetura de software bem definida, com camadas de Modelo, Serviço 
e Controladores para uma melhor organização e separação de responsabilidades.

> __Testes de Integração__: Foram implementados testes de integração utilizando Mocha, Chai, ChaiHTTP e Sinon para garantir a qualidade e robustez do sistema.

## Funcionalidades

### Endpoints Disponíveis

#### Login

- __POST /login__: Realiza o login do usuário.
- __GET /login/validate__: Avalia se o usuário é o administrador.
#### Times

- __GET /teams__: Retorna todos os times cadastrados.
- __GET /teams/:id__: Retorna um time específico.
#### Partidas

- __GET /matches__: Retorna todas as partidas cadastradas.
- __GET /matches?inProgress=true__: Retorna todas as partidas em progresso.
- __GET /matches?inProgress=false__: Retorna todas as partidas finalizadas.
- __POST /matches__: Cria uma nova partida.
- __PATCH /matches/:id/finish__: Atualiza a chave 'inProgress' para finalizada de uma partida específica.
- __PATCH /matches/:id__: Atualiza os gols de uma partida específica.

#### Placar

- __GET /leaderboard__: Retorna a classificação geral dos times.
- __GET /leaderboard/home__: Retorna a classificação dos times mandantes.
- __GET /leaderboard/away__: Retorna a classificação dos times visitantes.

## Como Executar Localmente com Docker

Para executar o repositório localmente, siga estas etapas:
```
1. Clone este repositório usando git clone.

2. Navegue até a pasta raiz do projeto.

3. Execute npm run install:apps para instalar todas as dependências, do Backend e do Frontend.

4. Para instalar as dependências separado para cada microserviço, entre na pasta e execute o npm install.
  
  -ex: app/backend npm install, mesma coisa no frontend.

5. Execute npm run compose:up na raiz do projeto para iniciar os containers Docker da aplicação.

6. Para verificar os Logs da aplicação geral, use docker-compose logs.

7. Para verificar os logs de um microserviço separadamente use docker-compose logs <nome-do-serviço>.

  - Lembrando que vai subir três containers, o Frontend, Backend e o Banco de dados.
  - Para usar um banco de dados local, altere as informações no docker file.

8. Para parar a aplicação, execute npm run compose:down.
```
## Executando Testes

Para executar os testes, siga estas etapas:
```
1. Navegue até a pasta app/backend.

2. Execute npm test para executar os testes unitários.

3. Para verificar a cobertura dos tests, digite npm test:coverage.

```

## Dúvidas, sugestões ou feedbacks?

- Entre em contato comigo no linkedIn - https://www.linkedin.com/in/rafael-magalh%C3%A3es-guedes/.
- Estou sempre aberto a novas ideias, sugestões e feedbacks.

> Rafael M.
