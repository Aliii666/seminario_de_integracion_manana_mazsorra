class VehiculoMP {
  marca: string;
  modelo: string;
  enReparacion: boolean;

  constructor(marca: string, modelo: string, enReparacion: boolean) {
    this.marca = marca;
    this.modelo = modelo;
    this.enReparacion = enReparacion;
  }

  describir(): string {
    const estado = this.enReparacion ? "en taller para reparacion" : "listo para entrega";
    return `${this.marca} ${this.modelo} - (${estado})`;
  }
}

const auto1 = new VehiculoMP("Toyota", "Corolla 2020", true);
const auto2 = new VehiculoMP("Honda", "Civic 2022", false);

console.log(auto1.describir());
console.log(auto2.describir());
