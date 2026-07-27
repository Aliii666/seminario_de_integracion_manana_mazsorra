const costosServicios: number[] = [450, 1200, 850, 2300, 600];
const repuestos: Array<string> = ["Filtro Aceite", "Pastillas Freno", "Bujias Platinum"];
const inferidoPrecios = [150, 300, 450];

console.log(`Arreglo Costos Servicios: ${costosServicios}`);
console.log(`Arreglo Repuestos: ${repuestos}`);
console.log(`Arreglo Inferido: ${inferidoPrecios}`);

const costosConIVA: number[] = costosServicios.map((c) => c * 1.16);
const serviciosCostosos: number[] = costosServicios.filter((c) => c > 1000);
const sumaTotal: number = costosServicios.reduce((acc, c) => acc + c, 0);

console.log(`Costos con IVA: ${costosConIVA}`);
console.log(`Servicios Costosos (>1000): ${serviciosCostosos}`);
console.log(`Suma Total Servicios: ${sumaTotal}`);

costosServicios.push(950);
console.log(`Arreglo Costos Servicios: ${costosServicios}`);
costosServicios.unshift(300);
console.log(`Arreglo Costos Servicios: ${costosServicios}`);
const ultimo = costosServicios.pop();
console.log(`Arreglo Costos Servicios: ${costosServicios}`);
const primero = costosServicios.shift();
console.log(`Arreglo Costos Servicios: ${costosServicios}`);

const existeCosto: boolean = costosServicios.includes(1200);
console.log(`Existe costo 1200: ${existeCosto}`);
const indiceCosto: number = costosServicios.indexOf(1200);
console.log(`Posicion del costo 1200: ${indiceCosto}`);
const encontradoCostoso: number | undefined = costosServicios.find((c) => c > 2000);
console.log(`Valor encontrado mayor a 2000: ${encontradoCostoso}`);
