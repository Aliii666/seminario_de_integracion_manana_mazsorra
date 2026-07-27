let datoScannerAny: any = "OBD2 Conectado";
datoScannerAny = 42;
datoScannerAny = true;

let lecturaSensor: unknown = "850 RPM";
lecturaSensor = 850;

if (typeof lecturaSensor === "string") {
  console.log(lecturaSensor.toUpperCase());
} else if (typeof lecturaSensor === "number") {
  console.log(`Revoluciones del motor: ${lecturaSensor} RPM`);
}

function lanzarErrorDiagnostico(mensaje: string): never {
  throw new Error(`[ALERTA TALLER MP] ${mensaje}`);
}

function verificarCasoDesconocido(vehiculo: never): never {
  throw new Error(`Tipo de vehiculo no soportado: ${String(vehiculo)}`);
}
