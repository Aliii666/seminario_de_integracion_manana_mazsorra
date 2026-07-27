class TanqueCombustibleMP {
  private _capacidadLitros: number;
  private readonly MAX_CAPACIDAD: number = 70;

  constructor(capacidadInicial: number) {
    this._capacidadLitros = capacidadInicial;
  }

  get capacidadLitros(): number {
    return this._capacidadLitros;
  }

  set capacidadLitros(valor: number) {
    if (valor <= 0) throw new Error("La cantidad de combustible debe ser mayor a 0");
    if (valor > this.MAX_CAPACIDAD) throw new Error(`Excede la capacidad maxima del tanque (${this.MAX_CAPACIDAD}L)`);
    this._capacidadLitros = valor;
  }

  get porcentajeLleno(): number {
    return (this._capacidadLitros / this.MAX_CAPACIDAD) * 100;
  }
}

const tanque = new TanqueCombustibleMP(35);
console.log(tanque.capacidadLitros);
console.log(`${tanque.porcentajeLleno.toFixed(2)}%`);

tanque.capacidadLitros = 63;
console.log(`${tanque.porcentajeLleno.toFixed(2)}%`);
