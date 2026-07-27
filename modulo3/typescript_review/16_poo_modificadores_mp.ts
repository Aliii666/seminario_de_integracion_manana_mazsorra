class ExpedienteVehiculoMP {
  readonly vin: string;
  public propietario: string;
  private kilometraje: number;
  protected paisOrigen: string;

  constructor(vin: string, propietario: string, kilometrajeInicial: number) {
    this.vin = vin;
    this.propietario = propietario;
    this.kilometraje = kilometrajeInicial;
    this.paisOrigen = "Mexico";
  }

  obtenerKilometraje(): number {
    return this.kilometraje;
  }

  registrarRecorrido(kmAdicionales: number): void {
    if (kmAdicionales <= 0) throw new Error("Kilometraje adicional invalido");
    this.kilometraje += kmAdicionales;
  }
}

const expediente = new ExpedienteVehiculoMP("3FA6P0H75JR123456", "Ana Garcia MP", 45000);
console.log(expediente.propietario);
console.log(expediente.vin);
console.log(expediente.obtenerKilometraje());
expediente.registrarRecorrido(1200);
console.log(expediente.obtenerKilometraje());
