const IVA: number = 0.16;
const NOMBRE_TALLER: string = "Taller Mecanico El Pit Stop MP";
const MODO_DIAGNOSTICO: boolean = true;

let vehiculosEnTaller: number = 0;
let estadoTaller: string = "cerrado";
let mecanicoDisponible: boolean = false;

console.log(`vehiculos en taller : ${vehiculosEnTaller} 
    estado taller       : ${estadoTaller} 
    mecanico disponible : ${mecanicoDisponible}`);

vehiculosEnTaller++;
estadoTaller = "abierto";
mecanicoDisponible = true;

console.log(`vehiculos en taller : ${vehiculosEnTaller} 
    estado taller       : ${estadoTaller} 
    mecanico disponible : ${mecanicoDisponible}`);
