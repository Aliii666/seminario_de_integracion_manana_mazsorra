// Concepto puro
type Producto = {
  id: number;
  nombre: string;
  precio: number;
  disponible: boolean;
  existencia: number,
};

const catalogo: Producto[] = [
  { id: 1, nombre: "Laptop",  precio: 999,  disponible: true, existencia: 5 },
  { id: 2, nombre: "Mouse",   precio: 25,   disponible: true, existencia: 3 },
  { id: 3, nombre: "Monitor", precio: 350,  disponible: false, existencia: 2 },
  { id: 4, nombre: "Mouse",   precio: 25,   disponible: true, existencia: 15 },
  { id: 5, nombre: "Monitor", precio: 350,  disponible: false, existencia: 115 },
];

// TypeScript sabe que cada "p" es de tipo Producto
const disponibles: Producto[] = catalogo.filter((p) => p.disponible);
const nombres: string[] = catalogo.map((p) => p.nombre);
const masBarato: Producto | undefined = catalogo.reduce((min, p) =>
  p.precio < min.precio ? p : min
);

console.log(nombres);                  // ["Laptop", "Mouse", "Monitor"]
console.log(masBarato?.nombre);       // "Mouse"
console.log(disponibles.length);      // 2
console.log(catalogo);
console.log(catalogo[3].existencia);

