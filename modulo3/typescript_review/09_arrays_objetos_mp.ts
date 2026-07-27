type RepuestoAuto = {
  id: number;
  nombre: string;
  precio: number;
  disponible: boolean;
  existencia: number;
};

const inventarioRepuestos: RepuestoAuto[] = [
  { id: 1, nombre: "Filtro de Aceite",       precio: 180,  disponible: true,  existencia: 15 },
  { id: 2, nombre: "Pastillas de Freno",     precio: 650,  disponible: true,  existencia: 8 },
  { id: 3, nombre: "Amortiguador Delantero", precio: 2200, disponible: false, existencia: 0 },
  { id: 4, nombre: "Bujia Iridium",          precio: 250,  disponible: true,  existencia: 24 },
  { id: 5, nombre: "Bateria 12V 60Ah",       precio: 1950, disponible: true,  existencia: 5 },
];

const disponibles: RepuestoAuto[] = inventarioRepuestos.filter((r) => r.disponible);
const nombresRepuestos: string[] = inventarioRepuestos.map((r) => r.nombre);
const masEconomico: RepuestoAuto | undefined = inventarioRepuestos.reduce((min, r) =>
  r.precio < min.precio ? r : min
);

console.log(nombresRepuestos);
console.log(`Repuesto mas economico: ${masEconomico?.nombre} ($${masEconomico?.precio})`);
console.log(`Cantidad disponibles: ${disponibles.length}`);
console.log(inventarioRepuestos);
console.log(`Existencia bujias: ${inventarioRepuestos[3].existencia}`);
