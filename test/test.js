import { expect } from 'chai';
import { ContaCorrente, ContaPoupanca } from '../src/classes/classes.mjs';


describe('Sistema Bancário', () => {
    it('Deve criar uma Conta Corrente com saldo inicial e taxa de juros', () => {
        const contaCorrente = new ContaCorrente('Titular', 1000, 1.5); // Saldo inicial de 1000 e taxa de juros de 1.5%
        expect(contaCorrente.juros).to.equal(1.5); // Verifica se a taxa de juros foi configurada corretamente
    });

    it('Deve criar uma Conta Poupança com saldo inicial e taxa de rendimento', () => {
        const contaPoupanca = new ContaPoupanca('Titular', 2000, 0.02); // Saldo inicial de 2000 e taxa de rendimento de 2%
        expect(contaPoupanca.rendimento).to.equal(0.02); // Verifica se a taxa de rendimento foi configurada corretamente
    });

    it('Deve aplicar rendimento na conta poupança', () => {
        const contaPoupanca = new ContaPoupanca('Titular', 2000, 0.02); // Saldo inicial de 2000 e taxa de rendimento de 2%
        contaPoupanca.aplicarRendimento();
        expect(contaPoupanca.saldo).to.be.closeTo(2040, 0.01); // Verifica se o rendimento foi aplicado corretamente com margem de erro de 0.01
    });
});