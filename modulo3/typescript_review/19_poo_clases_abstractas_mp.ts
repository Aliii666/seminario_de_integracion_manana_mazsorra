abstract class MantenimientoMP {
  abstract calcularCosto(): number;
  abstract estimarTiempoHoras(): number;

  describir(): string {
    return (
      `Costo: $${this.calcularCosto().toFixed(2)} | ` +
      `Tiempo Estimado: ${this.estimarTiempoHoras().toFixed(1)} hrs`
    );
  }
}

class CambioAceiteMP extends MantenimientoMP {
  constructor(private litrosAceite: number, private precioPorLitro: number) {
    super();
  }

  override calcularCosto(): number {
    const manoDeObra = 300;
    return this.litrosAceite * this.precioPorLitro + manoDeObra;
  }

  override estimarTiempoHoras(): number {
    return 1.0;
  }
}

class AlineacionBalanceoMP extends MantenimientoMP {
  constructor(private cantidadLlantas: number, private costoPorLlanta: number) {
    super();
  }

  override calcularCosto(): number {
    return this.cantidadLlantas * this.costoPorLlanta;
  }

  override estimarTiempoHoras(): number {
    return 2.5;
  }
}

const cambioAceite = new CambioAceiteMP(4.5, 180);
const alineacion = new AlineacionBalanceoMP(4, 200);

console.log(cambioAceite.describir());
console.log(alineacion.describir());
