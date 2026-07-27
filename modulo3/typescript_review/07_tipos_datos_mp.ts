const entero: number = 42;
const decimal: number = 3.14;
const negativo: number = -100;
const codigoFallaHex: number = 0x0300;
const binarioLecturas: number = 0b1010;
const octalPuerto: number = 0o17;
const revolucionesMax: number = 7_000;

console.log(codigoFallaHex);
console.log(binarioLecturas);
console.log(revolucionesMax);

console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.isFinite(1 / 0));
console.log(Number.isNaN(0 / 0));

const simple: string = "Taller Mecanico MP";
const doble: string = 'Servicio Automotriz';
const template: string = `Atencion ${"MP"}`;

const cliente: string = "Roberto Gomez";
const kilometraje: number = 45000;

const saludo: string = `Bienvenido ${cliente}, su vehiculo registra ${kilometraje} km.`;
const requerimiento: string = `El servicio es ${kilometraje >= 50000 ? "mayor" : "menor"}.`;

const fichaServicio: string = `
  Ficha Tecnica MP
  Cliente: ${cliente}
  Kilometraje: ${kilometraje} km
`.trim();

console.log("  pastilla de freno  ".trim());
console.log("mantenimiento".toUpperCase());
console.log("2024-07-26".split("-"));
console.log("falla: frenos".includes("falla"));
console.log("orden_123.mp".endsWith(".mp"));
console.log("orden_123.mp".startsWith("orden"));

const inspeccionAprobada: boolean = true;
const necesitaCambioFrenos: boolean = false;

const esVehiculoNuevo = kilometraje < 10000;
const requiereEscaneo = kilometraje >= 30000;

if (requiereEscaneo) {
  console.log("Escaneo OBD2 recomendado para este mantenimiento.");
}

let mecanicoAsignado: undefined = undefined;
let diagnosticoScanner: null = null;

function buscarMecanico(id: number): string | null {
  if (id === 1) return "Ing. Carlos Mecanico MP";
  return null;
}

const mecanico = buscarMecanico(5);

const nombreMecanico = mecanico ?? "Mecanico de Guardia MP";
console.log(nombreMecanico);

const longitud = mecanico?.length;
console.log(longitud);
