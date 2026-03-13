/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

export class ProcessamentoDeContaProxy {
  conta: ContaBancaria;

  constructor(saldo?: number, cartao?: string, cliente?: string) {
    this.conta = new Proxy(ContaBancaria, handlerContaBancaria)
  }

  metodoUm() {
    console.log(`Método um`);
    console.log(`this.conta = ${JSON.stringify(this.conta)}`);
    return;
  }
}
export class ProcessamentoDeConta {
  conta: ContaBancaria;

  constructor(saldo?: number, cartao?: string, cliente?: string) {
    this.conta = new ContaBancaria(saldo, cartao, cliente);
  }

  metodoUm() {
    console.log(`Método um`);
    console.log(`this.conta = ${JSON.stringify(this.conta)}`);
    return;
  }
}

class ContaBancaria {
  saldo: number;
  cartao: string;
  cliente: string;

  constructor(saldo?: number, cartao?: string, cliente?: string) {
    this.saldo = saldo ?? 0;
    this.cartao = cartao ?? 'none';
    this.cliente = cliente ?? 'std';
  }

  adicionarSaldo(diff: number) {
    this.saldo += diff;
    return;
  }

  cartaoValido() {
    return !!this.cartao;
  }

  tipoCliente() {
    if (this.cliente === 'std') return 'std';
    return 'other';
  }
}

export const handlerContaBancaria = {
  get(target, prop, receiver) {
    if (prop === 'cartao') {
      console.log(
        `Tentativa de acesso aos dados do cartão do cliente ${target.cliente}. Operaçao bloqueada.`,
      );
      return null;
    }

    if (prop === 'saldo') {
      console.log(`Saldo do cliente ${target.cliente} foi buscado.`);
    }
    return Reflect.get(target, prop, receiver);
  },
  
  construct(target: T, argArray: any[], newTarget: Function){
    //todo implement new constructor for trap object
  },
};
