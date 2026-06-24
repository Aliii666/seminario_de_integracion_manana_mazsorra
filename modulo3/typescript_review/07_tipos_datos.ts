// Numerico
// Concepto puro
const entero: number = 42;
const decimal: number = 3.14;
const negativo: number = -100;
const hexadecimal: number = 0xff;   // 255 en base 16
const binario: number = 0b1010;     // 10 en base 2
const octal: number = 0o17;         // 15 en base 8
const grande: number = 1_000_000;   // _ como separador visual (ES2021)

console.log(hexadecimal); // 255
console.log(binario);     // 10
console.log(grande);      // 1000000

// Constantes especiales de number
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.isFinite(1 / 0)); // false (Infinity no es finito)
console.log(Number.isNaN(0 / 0));    // true

// String
// Concepto puro
const simple: string = "Hola TypeScript";
const doble: string = 'También funciona';
const template: string = `Hola ${"mundo"}`; // template literal

const nombre: string = "Ana";
const edad: number = 28;

// Interpolación: embebe expresiones dentro de ${}
const saludo2: string = `Hola, ${nombre}. Tienes ${edad} años.`;
const mayoria: string = `Eres ${edad >= 18 ? "mayor" : "menor"} de edad.`;

// Multilínea sin caracteres de escape
const mensaje: string = `
  Línea 1
  Línea 2
  Línea 3
`.trim();

// Métodos comunes (tipados, el editor autocompleta)
console.log("  hola  ".trim());      
console.log("hola".toLowerCase());   // "hola"
console.log("hola".toUpperCase());      // "HOLA"
console.log("2024-06-15".split("-"));   // ["2024", "06", "15"]
console.log("error: fallo".includes("error")); // true
console.log("archivo.ts".endsWith(".ts"));     
console.log("aechivo.ts".startsWith(".ts"));// true

// Boolean
// Concepto puro
const activo: boolean = true;
const eliminado: boolean = false;

// Se infiere sin anotación explícita
const esMayor = 25 >= 18;    // boolean inferido → true
const tieneStock = 0 > 0;    // boolean inferido → false

// Valores "falsy" en TypeScript/JavaScript (importantes para narrowing)
// false, 0, "", null, undefined, NaN → todos se comportan como false en un if
if (!tieneStock) {
  console.log("Sin stock disponible");
}

//NULO O DEFINIDO

// Concepto puro
let sinAsignar: undefined = undefined;
let sinValor: null = null;

// En la práctica: propiedades opcionales o resultados de búsqueda
function buscarUsuario(id: number): string | null {
  if (id === 1) return "Ana";
  return null; // encontrado = null cuando no existe
}

const usuario = buscarUsuario(5);

// Operador de coalescencia nula ?? (devuelve el lado derecho si el izquierdo es null/undefined)
const nombreUsuario = usuario ?? "Invitado";
console.log(nombreUsuario); // "Invitado"

// Encadenamiento opcional ?. (no lanza error si algo es null/undefined)
const longitud = nombreUsuario?.length;
console.log(longitud); // undefined (no lanza error)