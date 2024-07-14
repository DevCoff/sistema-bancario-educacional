import promptSync from 'prompt-sync';
const prompt = promptSync(); import { ContaCorrente, ContaPoupanca } from './src/classes/classes.mjs';
const contas = [] // Array para armazenar todas as contas criadas

// Função para limpar o console após um delay
function clearWithDelay(delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.clear()
            resolve()
        }, delay)
    })
}

// Função para validar se a entrada é uma string válida
function validarString(mensagem) {
    let valor
    do {
        valor = prompt(mensagem) // Solicita a entrada do usuário
        if (valor.trim() === '') {
            console.log('\x1b[31mO nome do titular não pode ser vazio. Tente novamente.\x1b[0m')
        } else if (!isNaN(valor)) {
            console.log('\x1b[31mO nome do titular não pode ser um número.\x1b[0m')
        }
    } while (valor.trim() === '' || !isNaN(valor))
    return valor
}

// Função para validar se a entrada é um número válido / se o número for um decimal com 3 casas nao será aceito e nem se for uma string
function validarNumero(mensagem, allowZero = false) {
    let valor;
    let isValid;
    do {
        valor = parseFloat(prompt(mensagem)); // Solicita a entrada do usuário
        const valorDecimal = valor.toString().split(".")[1]
        isValid = !isNaN(valor) && (allowZero ? valor >= 0 : valor > 0) && (valorDecimal ? valorDecimal.length <= 2 : true)
        if (!isValid) { // Verifica se o valor é inválido
            console.log('\x1b[31mValor inválido. Por favor, insira um valor numérico maior que zero e com no máximo duas casas decimais.\x1b[0m');
        }
    } while (!isValid) // Continua solicitando até que um valor válido seja fornecido
    return valor
}

// Função para criar uma conta corrente
function criarContaCc() {
    const titular = validarString('Nome do titular: ')
    const saldo = validarNumero('Depósito inicial: ', true) // Permite saldo inicial zero
    const taxaJuros = validarNumero('Simule a taxa de juros (%): ')
    const minhaCc = new ContaCorrente(titular, saldo, taxaJuros)
    contas.push(minhaCc) // Adiciona a conta criada ao array de contas
    console.log(`\x1b[32m\nConta Corrente criada com sucesso!\x1b[0m`)
    console.log(`\x1b[34mNome do titular: ${minhaCc.titular}\x1b[0m`)
}

// Função para criar uma conta poupança
function criarContaPp() {
    const titular = validarString('Nome do titular: ')
    const saldo = validarNumero('Saldo inicial: ', true) // Permite saldo inicial zero
    const rendimento = validarNumero('Simule a taxa de rendimento (%): ')
    const minhaPp = new ContaPoupanca(titular, saldo, rendimento)
    contas.push(minhaPp) // Adiciona a conta criada ao array de contas
    console.log(`\x1b[32m\nConta Poupança criada com sucesso!\x1b[0m`)
    console.log(`\x1b[34mNome do titular: ${minhaPp.titular}\x1b[0m`)
}

// Função para depositar um valor em uma conta existente
function depositar() {
    console.log('Escolha a conta para depósito:')
    contas.forEach((conta, index) => {
        console.log(`${index + 1}. Titular: ${conta.titular}, Tipo: ${conta instanceof ContaCorrente ? 'Corrente' : 'Poupança'}`)
    })

    const indice = parseInt(validarNumero('>> ')) - 1
    if (indice >= 0 && indice < contas.length) {
        const valor = validarNumero('Qual valor do depósito: ')
        contas[indice].depositar(valor)
        console.log(`\x1b[34mValor atual na conta de ${contas[indice].titular}: R$${contas[indice].saldo}\x1b[0m`)
    } else {
        console.log('\x1b[31mConta inválida!\x1b[0m')
    }
}

// Função para sacar um valor de uma conta existente
function sacar() {
    console.log('Escolha a conta para sacar:')
    contas.forEach((conta, index) => {
        console.log(`${index + 1}. Titular: ${conta.titular}, Tipo: ${conta instanceof ContaCorrente ? 'Corrente' : 'Poupança'}`)
    })

    const indice = parseInt(validarNumero('>> ')) - 1
    if (indice >= 0 && indice < contas.length) {
        const conta = contas[indice]

        if (conta.saldo === 0) {
            console.log(`\x1b[31mNão é possível sacar pois o saldo da conta é R$${conta.saldo}!\x1b[0m`)
        } else {
            console.log(`\x1b[34mValor atual na conta de ${conta.titular}: R$${conta.saldo}\x1b[0m`)
            const valor = validarNumero('Qual valor do saque: ')
            if (valor > conta.saldo) {
                console.log('\x1b[31mSaldo insuficiente para realizar o saque!\x1b[0m')
            } else {
                conta.sacar(valor) // chama o método sacar(valor)
                // console.log(`\x1b[32mSaque de R$${valor} realizado com sucesso!\x1b[0m`)
                console.log(`\x1b[34mValor atual na conta de ${conta.titular}: R$${conta.saldo}\x1b[0m`)
            }
        }
    } else {
        console.log('\x1b[31mÍndice inválido!\x1b[0m')
    }
}

// Função para consultar o saldo de uma conta existente

function consultarSaldo() {
    console.log('Escolha a conta para consultar o saldo:')
    contas.forEach((conta, index) => {
        console.log(`${index + 1}. Titular: ${conta.titular}, Tipo: ${conta instanceof ContaCorrente ? 'Corrente' : 'Poupança'}`)
    })

    const indice = parseInt(validarNumero('>> ')) - 1
    if (indice >= 0 && indice < contas.length) {
        const conta = contas[indice]
        console.log(`\x1b[34mSaldo da conta de ${conta.titular}: R$${conta.saldo.toFixed(2)}, Tipo: ${conta instanceof ContaCorrente ? 'Corrente' : 'Poupança'}\x1b[0m`)
    } else {
        console.log('\x1b[31mConta inválida!\x1b[0m')
    }
}

// Função para aplicar juros ou rendimento em uma conta existente
function aplicarJurosRendimento() {
    console.log('Escolha a conta para aplicar juros ou rendimento:')
    contas.forEach((conta, index) => {
        console.log(`${index + 1}. Titular: ${conta.titular}, Tipo: ${conta instanceof ContaCorrente ? 'Corrente' : 'Poupança'}`)
    })

    const indice = parseInt(validarNumero('>> ')) - 1
    if (indice >= 0 && indice < contas.length) {
        const conta = contas[indice]
        if (conta instanceof ContaCorrente) {
            conta.aplicarJuros() // Aplica juros se for conta corrente
        } else if (conta instanceof ContaPoupanca) {
            conta.aplicarRendimento() // Aplica rendimento se for conta poupança
        }
        console.log(`Saldo atualizado da conta de ${conta.titular}: R$${conta.saldo.toFixed(2)}`)
    } else {
        console.log('Índice inválido!')
    }
}

// Função principal que exibe o menu inicial do programa
async function menu() {
    while (true) {
        console.clear() // Limpa o console no início de cada iteração

        // Exibe o menu inicial
        console.log(`
        \x1b[36m========================
        SISTEMA DE CADASTRO BANCÁRIO
        ========================
        1. Criar Conta
        2. Sair
        ========================\x1b[0m
        `)

        const escolha = prompt('\x1b[36m>> \x1b[0m') // Solicita a escolha do usuário

        switch (escolha) {
            case '1':
                console.clear()
                console.log('-------------------\n')
                console.log('\nEscolha qual tipo de conta deseja criar:')
                console.log('1 - Corrente')
                console.log('2 - Poupança\n')
                const tipoConta = prompt('\x1b[36m>> \x1b[0m')
                if (tipoConta === '1') {
                    criarContaCc()
                    await mainMenu() // Chama o menu principal após criar a conta
                } else if (tipoConta === '2') {
                    criarContaPp()
                    await mainMenu() // Chama o menu principal após criar a conta
                } else {
                    console.log('\x1b[31mOpção inválida!\x1b[0m')
                    await clearWithDelay(4000)
                }
                break

            case '2':
                console.log('\nFinalizando programa...')
                return

            default:
                console.log('\x1b[31mOpção inválida!\x1b[0m')
                await clearWithDelay(4000)
                break
        }
    }
}

// Função para exibir o menu principal do sistema bancário
async function mainMenu() {
    while (true) {
        console.clear() // Limpa o console no início de cada iteração

        // Exibe o menu principal do sistema bancário
        console.log(`
        \x1b[36m========================
        SISTEMA BANCÁRIO
        ========================
        1. Criar Nova Conta
        2. Depositar
        3. Sacar
        4. Consultar Saldo
        5. Aplicar Juros/Rendimento
        6. Sair da Conta
        ========================\x1b[0m
        `)

        const escolha = prompt('\x1b[36m>> \x1b[0m') // Solicita a escolha do usuário

        switch (escolha) {
            case '1':
                console.clear()
                console.log('\nEscolha qual tipo de conta deseja criar:')
                console.log('1 - Corrente')
                console.log('2 - Poupança\n')
                const tipoConta = prompt('\x1b[36m>> \x1b[0m')
                if (tipoConta === '1') {
                    criarContaCc()
                } else if (tipoConta === '2') {
                    criarContaPp()
                } else {
                    console.log('\x1b[31mOpção inválida!\x1b[0m')
                }
                await clearWithDelay(2000) // Aguarda um tempo para o usuário ler as mensagens
                break

            case '2':
                console.clear()
                depositar()
                await clearWithDelay(4000) // Aguarda um tempo para o usuário ler as mensagens
                break

            case '3':
                console.clear()
                sacar()
                await clearWithDelay(4000) // Aguarda um tempo para o usuário ler as mensagens
                break

            case '4':
                console.clear()
                consultarSaldo()
                await clearWithDelay(4000) // Aguarda um tempo para o usuário ler as mensagens
                break

            case '5':
                console.clear()
                aplicarJurosRendimento()
                await clearWithDelay(4000) // Aguarda um tempo para o usuário ler as mensagens
                break

            case '6':
                console.log('\nSaindo do sistema bancário. Até logo!') // Mensagem de saída
                return

            default:
                console.log('\x1b[31mOpção inválida!\x1b[0m')
                await clearWithDelay(4000) // Aguarda um tempo para o usuário ler as mensagens
                break
        }
    }
}

menu() // Inicia o programa chamando a função menu()
