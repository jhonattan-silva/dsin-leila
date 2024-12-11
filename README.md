Projeto avaliativo para a empresa dsin para a vaga de desenvolvedor, criado por Jhonattan Willian Correia Silva.

/DSIN-ETAPA2
  /frontend  -> Aplicação React com TypeScript
  /backend   -> API em Node.js com TypeScript, Prisma e Postgres

//Dependencias backend:
npm init -y
npm install typescript ts-node @types/node express @types/express prisma @prisma/client bcryptjs jsonwebtoken @types/jsonwebtoken dotenv
npm install -D nodemon

init->inicia o projeto node
TypeScript->permite o uso do typescript
ts-node->permite usar o typescript sem compilar, não preciso dar dois comandos para executar o código tipo o tsc e depois o node, rodo só o ts-node no arquivo ts
@types/node-> Tipos TypeScript para o Node.js, para fornecer autocompletar e verificar erros de tipo durante o desenvolvimento.
express-> Framework de aplicativo web para o Node, para construir APIs e aplicativos web.
@types/express: Tipos TypeScript para o Express, que ajudam a fornecer autocompletar e verificar erros de tipo durante o desenvolvimento.
prisma: ORM para Node.jse TypeScript.
@prisma/client: O cliente que interage com o Prisma, necessário para usar o Prisma no código.
bcryptjs: Uma biblioteca para hashing de senhas, garantindo a segurança das senhas dos usuários.
npm install --save-dev @types/bcryptjs
jsonwebtoken: Uma biblioteca para criar e verificar tokens JSON Web (JWT), que são frequentemente usados para autenticação.
@types/jsonwebtoken: Tipos TypeScript para a biblioteca jsonwebtoken, ajudando com autocompletar e verificação de tipos.
dotenv: Uma biblioteca para carregar variáveis de ambiente de um arquivo .env para process.env, ajudando a gerenciar a configuração do ambiente de forma segura.
npm install -D nodemon: Instala nodemon como uma dependência de desenvolvimento. O nodemon é uma ferramenta que reinicia automaticamente o servidor Node.jssempre que um arquivo é alterado, facilitando o desenvolvimento e o teste de aplicativos.
npm install cors :CORS permite a cominicação entre back e front
npm install --save-dev @types/cors

//iniciando o Typescript
npx tsc --init

//configurado o compilador no tsconfig

//configurado os scripts de inciio no package.json
  "dev": "nodemon src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"

//Adicionado o Prisma para gerenciamento do banco
npx prisma init

//Nele crio as tabelas principais do sistema:
Cliente, Servico, Agendamento

//Edito os dados de acesso no .env
//executo para criar as tabelas e vincular o prisma ao bd
npx prisma migrate dev --name init

//crio o server


//DEPENDENCIAS FRONTEND:
npx create-react-app . --template typescript
npm install axios react-router-dom

//REMOVO ITENS DESNECESSÁRIOS APÓS CRIAR O APP

create-react-app . ->Ponto pois já criei a pasta
--template typescript -> usabdo ts como padrão
axios -> para comunicação api front
react-router-dom -> biblioteca para gerenciar rotas no React permite criar uma navegação de uma página para outra

npm install --save-dev @types/react @types/react-dom //para o react trabalhar com TS

//itens para o calendário react
npm install react-calendar
npm install date-fns

//itens para graficos
npm install react-apexcharts apexcharts


frontend/
├── public/
├── src/
│   ├── components/       # Componentes React
│   ├── pages/            # Páginas completas
│   ├── services/         # Serviços para chamadas à API
│   │   └── api.ts        # Arquivo com funções de API centralizadas


//Paginas básicas:
**NO index.tsx vou listar as rotas para essas páginas
Home: Homepage.
Agendamento: Pagina de agendamento.
Admin: Painel para Leila (gerenciar agendamentos).

