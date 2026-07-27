type TipoServicio = "mantenimiento" | "reparacion_motor" | "frenos";

interface VehiculoServicio {
  modelo: string;
  horasTrabajo: number;
  costoRefacciones: number;
  tipoServicio: TipoServicio;
}

const TARIFAS_HORA: Record<TipoServicio, number> = {
  mantenimiento:    350.00,
  reparacion_motor: 600.00,
  frenos:           450.00,
};

const CARGO_DIAGNOSTICO_PCT = 0.05;

function cotizarReparacion(vehiculo: VehiculoServicio): string {
  const tarifaBase = TARIFAS_HORA[vehiculo.tipoServicio];
  const costoManoObra = tarifaBase * vehiculo.horasTrabajo;
  const costoDiagnostico = vehiculo.costoRefacciones * CARGO_DIAGNOSTICO_PCT;
  const total = costoManoObra + vehiculo.costoRefacciones + costoDiagnostico;

  return `
   Cotizacion Taller Mecanico MP
   Vehiculo        : ${vehiculo.modelo}
   Horas Estimadas : ${vehiculo.horasTrabajo} hrs
   Tipo Servicio   : ${vehiculo.tipoServicio}
   Mano de Obra    : $${costoManoObra.toFixed(2)}
   Refacciones     : $${vehiculo.costoRefacciones.toFixed(2)}
   Diagnostico MP  : $${costoDiagnostico.toFixed(2)}
   -------------------------
   TOTAL ESTIMADO  : $${total.toFixed(2)}
  `.trim();
}

const reparacion1: VehiculoServicio = {
  modelo: "Ford Mustang GT",
  horasTrabajo: 4.5,
  costoRefacciones: 3200,
  tipoServicio: "reparacion_motor",
};

const reparacion2: VehiculoServicio = {
  modelo: "Honda Civic 2021",
  horasTrabajo: 2.0,
  costoRefacciones: 1500,
  tipoServicio: "frenos",
};

console.log(cotizarReparacion(reparacion1));
console.log("---");
console.log(cotizarReparacion(reparacion2));
