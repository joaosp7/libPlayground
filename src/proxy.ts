/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const target = {
  item1: 'hello',
  item2: 'everyone',
};

const handler = {
  get(target, prop, receiver) {
    if (prop === 'item2') {
      return 'FUI OVERRIDE';
    }
    return Reflect.get(target, prop, receiver);
  },

  set(target, prop, receiver) {
    if (prop === 'item1') {
      console.log('Propriedade item1 foi alterada');
      console.log('receiver', receiver);
    }
    return Reflect.set(target, prop, receiver);
  },
};

const proxy = new Proxy(target, handler);

console.log('proxy3.item1', proxy.item1);
console.log('proxy3.item2', proxy.item2);

proxy.item1 = 'Novo item1';

console.log('proxy3.item1', proxy.item1);
console.log('proxy3.item2', proxy.item2);
