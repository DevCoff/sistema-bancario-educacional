// Classe base para contas genéricas
class ContaGenerica {
    constructor(titular, saldo) {
        this.titular = titular  // Nome do titular da conta
        this.saldo = saldo  // Saldo inicial da conta
    }

    // Método para depositar um valor na conta
    depositar(valor) {
        if (isNaN(valor) || valor <= 0) {  // Verifica se o valor é válido
            console.log('\x1b[31mDigite um valor numérico válido e maior que zero!\x1b[0m')
        } else {
            this.saldo += valor  // Adiciona o valor ao saldo
            console.log(`\x1b[32mDepósito de R$${valor} realizado com sucesso!\x1b[0m`)
        }
    }

    // Método para sacar um valor da conta
    sacar(valor) {
        if (valor > 0 && valor <= this.saldo) {  // Verifica se o valor é válido e se há saldo suficiente
            this.saldo -= valor  // Subtrai o valor do saldo
            console.log(`\x1b[32mSaque de R$${valor} realizado com sucesso!\x1b[0m`)
        } else {
            console.log('\x1b[31mValor de saque inválido ou saldo insuficiente!\x1b[0m')
        }
    }

    // Método para consultar o saldo atual da conta
    consultarSaldo() {
        console.log(`\x1b[34mSaldo atual: R$${this.saldo}\x1b[0m`)
    }
}

// Classe para conta corrente, derivada de ContaGenerica
class ContaCorrente extends ContaGenerica {
    constructor(titular, saldo, juros) {
        super(titular, saldo)  // Chama o construtor da classe base
        this.juros = juros  // Taxa de juros específica da conta corrente
    }

    // Método para aplicar juros no saldo da conta
    aplicarJuros() {
        this.saldo += this.saldo * (this.juros / 100)  // Aumenta o saldo com base na taxa de juros
        console.log('\x1b[32mJuros aplicados com sucesso!\x1b[0m')
    }
}

// Classe para conta poupança, derivada de ContaGenerica
class ContaPoupanca extends ContaGenerica {
    constructor(titular, saldo, rendimento) {
        super(titular, saldo)  // Chama o construtor da classe base
        this.rendimento = rendimento  // Taxa de rendimento específica da poupança
    }

    // Método para aplicar rendimento no saldo da conta
    aplicarRendimento() {
        this.saldo = this.saldo + (this.saldo * this.rendimento)  // Aumenta o saldo com base na taxa de rendimento
        console.log(`\x1b[32mValor do rendimento em um mês: R$${this.saldo}\x1b[0m`)
    }
}

export { ContaGenerica, ContaCorrente, ContaPoupanca };