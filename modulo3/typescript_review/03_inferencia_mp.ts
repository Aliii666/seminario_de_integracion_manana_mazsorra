const codigoEscaner: number = 101;
const modeloEscaner: string = "OBD2-Scanner-MP";
const escanerListo: boolean = true;

const codigoEscaner2 = 101;
const modeloEscaner2 = "OBD2-Scanner-MP";
const escanerListo2 = true;

let presionNeumatico: number;
presionNeumatico = 32;

let identificadorVehiculo: number | string = 1005;
identificadorVehiculo = "ABC-1234";

function diagnosticarComponente(componente: string, nivelFalla: number): string {
  return `Diagnostico en ${componente} - Nivel de severidad: ${nivelFalla}`;
}

const NOMBRE_TALLER_SISTEMA = "Taller-Mecanico-MP";
const CAPACIDAD_MAXIMA_BAHIAS = 8;
const SISTEMA_ACTIVO = true;

let serviciosRealizados: number = 0;
let ultimoVehiculoAtendido: string | null = null;

function registrarServicio(tipoServicio: string, costo: number): void {
  serviciosRealizados++;
  ultimoVehiculoAtendido = tipoServicio;
  console.log(`[${NOMBRE_TALLER_SISTEMA}] Servicio: ${tipoServicio} ($${costo}) - Total atendidos: ${serviciosRealizados}`);
}

registrarServicio("Alineacion y Balanceo", 850);
registrarServicio("Cambio de Aceite Sintetico", 1200);
