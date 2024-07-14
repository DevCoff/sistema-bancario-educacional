# Sistema Bancário Educacional

Este é um projeto de sistema bancário educacional implementado em JavaScript usando Node.js. O sistema permite criar contas correntes e contas poupança, realizar depósitos, saques e aplicar juros ou rendimentos.

## Requisitos

- Node.js (versão 20.11.0 ou superior)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/DevCoff/sistema-bancario-educacional.git
   cd sistema-bancario-educacional
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Estrutura do Projeto

- `package.json`: Arquivo de configuração do npm com as dependências do projeto.
- `classes.js`: Contém as classes `ContaGenerica`, `ContaCorrente` e `ContaPoupanca`.
- `script.js`: Script principal para interação com o usuário.
- `test/test.js`: Arquivo de testes utilizando Mocha e Chai.

## Uso

Para iniciar o sistema bancário, execute o seguinte comando:

```bash
node script.js
```
