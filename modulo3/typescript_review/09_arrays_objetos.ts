// Concepto puro
type Producto = {
  id: number;
  nombre: string;
  precio: number;
  disponible: boolean;
  existencias: number;
};

const catalogo: Producto[] = [
  { id: 1, nombre: "Laptop",  precio: 999,  disponible: true, existencias: 10 },
  { id: 2, nombre: "Mouse",   precio: 25,   disponible: true, existencias: 50 },
  { id: 3, nombre: "Monitor", precio: 350,  disponible: false, existencias: 0 },
  { id: 4, nombre: "Teclado",   precio: 15,   disponible: true, existencias: 20 },
  { id: 5, nombre: "Tarjeta de video", precio: 550,  disponible: true, existencias: 5 },
];

// TypeScript sabe que cada "p" es de tipo Producto
const disponibles: Producto[] = catalogo.filter((p) => p.disponible);
const nombres: string[] = catalogo.map((p) => p.nombre);
const masBarato: Producto | undefined = catalogo.reduce((min, p) =>
  p.precio < min.precio ? p : min
);

//console.log(nombres);                  // ["Laptop", "Mouse", "Monitor"]
//console.log(masBarato?.nombre);       // "Mouse"
//console.log(disponibles.length);    
//console.log(catalogo[3]); 
//Arreglo completo
const catalogoCompleto: Producto[] = catalogo.map((p) => p);
console.log(catalogoCompleto);
//Existencias del elemento 4
const existenciasTeclado: number = catalogo[3].existencias;
console.log(`Existencias del teclado: ${existenciasTeclado}`);
