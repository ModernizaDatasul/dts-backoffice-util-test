# dts-backoffice-util-test

## Objetivo

Projeto para realização de testes das bibliotecas:
- [**dts-backoffice-util**](https://github.com/ModernizaDatasul/dts-backoffice-util/tree/master/projects/dts-backoffice-util)
- [**dts-backoffice-kendo-grid**](https://github.com/ModernizaDatasul/dts-backoffice-util/tree/master/projects/dts-backoffice-kendo-grid)
-  [**mock-totvs-builder**](https://github.com/ModernizaDatasul/mock-totvs-builder)

Nele é possível verificar e testar as implementações das funcionalidades das bibliotecas de forma mais detalhadas, através de exemplos das implementações.

<br>

## Instalação
- Baixar o projeto;
- Abrir na pasta:<br>
**/dts-backoffice-util-test/thf2/**
- Instalar:<br>
**npm install**

<br>

## Utilização
Abrir dois Terminais, um será utilizado para o **Mock** e outro para a **Aplicação**.

<br>

## Mock
Para carregar o mock, utilizar o comando:<br>
**npm run mock**<br>
Na pasta **thf2/data** é possível visualizar, alterar e configurar os arquivos utilizados pelo Mock.<br>
É possível fazer um consulta visual dos dados mockados, através do caminho:<br>
**http://localhost:3000/**

<br>

## Aplicação
No outro terminal, carregar a aplicação:<br>
**npm start**<br>
Após o carregamento, ela estará disponível no caminho:<br>
**http://localhost:4200/dts-backoffice-util-test/#/**<br>
Será apresentado um menu lateral, onde é possível acessar as telas de teste das funcionalidades.

<br>

## Entidades
Nem todas as entidades estão Mockadas, por exemplo os servidores RPW do Agendamento.
<br>Neste caso, deve ser feito a configuração do Ambiente no Arquivo **th2/proxy.conf.js** informando o servidor **"target"**, e o **usuário/senha** de acesso **"Authorization"**.

<br>

## Funcionalidades
Para o **dtsKendoGrid** existe um menu específico para acessar as telas de teste, mas para as demais funcionalidades não há, elas estão **"espalhadas"** pelas telas. Neste caso, para ver o exemplo da implementação, deve-se realizar uma pesquisa no projeto pelo nome da funcionalidade.
