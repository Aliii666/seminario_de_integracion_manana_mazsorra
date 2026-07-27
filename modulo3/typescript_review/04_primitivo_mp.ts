const precioRepuesto: number       = 450.50;
const kilometraje: number          = 85000;
const temperaturaAceite: number    = 92.4;
const codigoHexDiagnostico: number = 0x0300;

const emailCliente: string  = "cliente@taller-mp.com";
const marcaAuto: string     = 'Toyota';
const placaVehiculo: string = `/vehiculos/MX-889-MP`;

const bahiaDisponible: boolean          = true;
const requiereRepuestoEspecial: boolean = false;
const esClienteVIP: boolean             = true;

const subtotalReparacion = 3200;
const descuentoManoObra  = 400;
const totalReparacion    = subtotalReparacion - descuentoManoObra;

const cliente = "  perez.juan@taller-mp.com  ";
console.log(cliente.trim().toLowerCase());
console.log(emailCliente.includes("taller-mp"));
console.log(emailCliente.split("@"));
console.log(emailCliente.split("@")[1]);
let registroVehiculo: string = "Juan;Perez;Toyota Corolla;2020;XYZ-7890";
console.log(registroVehiculo.split(";"));

const puedeIngresarABahia: boolean = bahiaDisponible && !requiereRepuestoEspecial;
console.log(puedeIngresarABahia);
