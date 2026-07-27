type EstadoReparacionMP = "recepcion" | "diagnostico" | "en_taller" | "finalizado";
type TipoCombustibleMP  = "gasolina" | "diesel" | "hibrido" | "electrico";

function procesarReparacion(idOrden: number, estado: EstadoReparacionMP): void {
  console.log(`Orden de Servicio #${idOrden}: ${estado}`);
}

procesarReparacion(101, "en_taller");

type PrioridadOrdenMP = "baja" | "media" | "alta" | "urgente";

interface OrdenTrabajoMP {
  id: number;
  vehiculo: string;
  prioridad: PrioridadOrdenMP;
  completada: boolean;
}

function etiquetarOrdenTrabajo(o: OrdenTrabajoMP): string {
  const prefijos: Record<PrioridadOrdenMP, string> = {
    baja:    "[BAJA]",
    media:   "[MEDIA]",
    alta:    "[ALTA]",
    urgente: "[URGENTE]",
  };
  const estado = o.completada ? "[OK]" : "[PENDIENTE]";
  return `${estado} ${prefijos[o.prioridad]} [#${o.id}] ${o.vehiculo}`;
}

const ordenesMP: OrdenTrabajoMP[] = [
  { id: 101, vehiculo: "Toyota RAV4 - Cambio de filtro",    prioridad: "baja",    completada: true  },
  { id: 102, vehiculo: "Chevy Silverado - Falla de frenos", prioridad: "urgente", completada: false },
  { id: 103, vehiculo: "VW Jetta - Alineacion",             prioridad: "media",   completada: false },
];

for (const o of ordenesMP) {
  console.log(etiquetarOrdenTrabajo(o));
}
