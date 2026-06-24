// Concepto puro — dos sintaxis equivalentes
const numeros: number[] = [1, 2, 3, 4, 5];
const textos: Array<string> = ["a", "b", "c"];   // forma genérica


// TypeScript infiere el tipo del array si lo inicializas
const inferido = [10, 20, 30]; // number[] inferido

console.log(`Arreglo de números: ${numeros}`);
console.log(`Arreglo de textos: ${textos}`);
console.log(`Arreglo inferido: ${inferido}`);
// Métodos tipados: el compilador conoce el tipo del elemento
const dobles: number[] = numeros.map((n) => n * 2);       // [2, 4, 6, 8, 10]
const pares: number[] = numeros.filter((n) => n % 2 === 0); // [2, 4]
const suma: number = numeros.reduce((acc, n) => acc + n, 0); // 15
console.log(`Dobles: ${dobles}`);
console.log(`Pares: ${pares}`);
console.log(`Suma: ${suma}`);

// Mutación (cambia el array original)
numeros.push(6);       // agrega al final
numeros.unshift(0);    // agrega al inicio
const ultimo = numeros.pop();   // elimina y devuelve el último
const primero = numeros.shift(); // elimina y devuelve el primero
console.log(`Después de mutaciones: ${numeros}`);
console.log(`Primero: ${primero}, Último: ${ultimo}`);

// Búsqueda

const existe: boolean = numeros.includes(3); 
console.log(`Existe 3: ${existe}`);

const indice: number = numeros.indexOf(3);      
console.log(`Índice de 3: ${indice}`);

  // posición o -1
const encontrado: number | undefined = numeros.find((n) => n > 4); // 5
console.log(`Encontrado: ${encontrado}`); 