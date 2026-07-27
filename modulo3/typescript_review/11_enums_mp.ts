enum NivelAceite {
  Bajo,
  Medio,
  Alto,
}

const estadoAceite: NivelAceite = NivelAceite.Bajo;
console.log(estadoAceite);
console.log(NivelAceite[0]);

enum CodigoErrorOBD {
  FallaCilindro = 300,
  CatalizadorEficiencia = 420,
  SistemaMezclaPobre = 171,
}

enum EstadoVehiculoMP {
  EnEspera     = "EN_ESPERA",
  EnReparacion = "EN_REPARACION",
  Listo        = "LISTO_PARA_ENTREGA",
  Entregado    = "ENTREGADO",
}

const estadoActual: EstadoVehiculoMP = EstadoVehiculoMP.EnReparacion;
console.log(estadoActual);
