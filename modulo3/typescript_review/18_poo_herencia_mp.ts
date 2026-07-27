class VehiculoMP {
  constructor(public nombre: string) {}

  encender(): string {
    return `${this.nombre}: Encendiendo el motor base`;
  }
}

class CamionetaMP extends VehiculoMP {
  constructor(nombre: string, public tipo: string) {
    super(nombre);
  }

  override encender(): string {
    return `${this.nombre}: Encendiendo motor 4x4`;
  }

  inspeccionar(componente: string): string {
    return `${this.nombre}: Inspeccionando ${componente}`;
  }
}

const v = new VehiculoMP("Vehiculo Generico");
const c = new CamionetaMP("Camioneta Ford", "Pick-up 4x4");

console.log(v.encender());
console.log(c.encender());
console.log(c.inspeccionar("sistema de frenos"));
console.log(c.tipo);
