const cliente: string = "Carlos Mendoza";
const vehiculo: string = "Nissan Sentra 2018";
const reparacionesRealizadas: number = 3;

const bienvenida: string = `Cliente: ${cliente}. Vehiculo: ${vehiculo}. Reparaciones completadas: ${reparacionesRealizadas}.`;
console.log(bienvenida);

const costoServicio: number = 2500;
const iva: number           = 0.16;
const totalFactura: string  = `Total con IVA: $${(costoServicio * (1 + iva)).toFixed(2)}`;
console.log(totalFactura);

let identificadorBahia: string = "Bahia-02";
let estadoBahia: boolean       = true;
let ocupacionMecanicos: number = 85.0;

const reporte: string = `
=== Reporte del Taller Mecanico MP ===
Bahia     : Bahia-01
Estado    : Libre
Ocupacion : 90.0%
`;
console.log(reporte);

const reporte2: string = `
=== Reporte del Taller Mecanico MP ===
Bahia     : ${identificadorBahia}
Estado    : ${estadoBahia ? "Ocupada" : "Libre"}
Ocupacion : ${ocupacionMecanicos}%
`;
console.log(reporte2);
