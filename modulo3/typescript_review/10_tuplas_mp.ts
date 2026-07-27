type CoordenadaAuxilio = [number, number];
type MedidaNeumatico = [number, number, number];
type EntradaFalla = [string, number];

const ubicacionGrua: CoordenadaAuxilio = [19.4326, -99.1332];
const llantaFrontal: MedidaNeumatico = [205, 55, 16];
const diagnosticoMP: EntradaFalla = ["P0300", 4];

const [lat, lng] = ubicacionGrua;
const [ancho, perfil, rin] = llantaFrontal;
const [codigoOBD, gravedad] = diagnosticoMP;

console.log(`Ubicacion Auxilio MP: lat=${lat}, lng=${lng}`);
console.log(`Medida Neumatico: ${ancho}/${perfil} R${rin}`);
console.log(`Falla detectada: Codigo ${codigoOBD} (Severidad: ${gravedad})`);

type HorarioAtencionTaller = [apertura: number, cierre: number];
const horarioMP: HorarioAtencionTaller = [8, 19];
