class ComponenteAutoMP {
  nombre(): string { return "Componente Automotriz Generico MP"; }
  costoReemplazo(): number { return 0; }
}

class MotorMP extends ComponenteAutoMP {
  constructor(private cilindros: number) { super(); }
  override nombre(): string { return `Motor MP (${this.cilindros} Cilindros)`; }
  override costoReemplazo(): number { return 15000 + this.cilindros * 2000; }
}

class TransmisionMP extends ComponenteAutoMP {
  constructor(private tipo: string) { super(); }
  override nombre(): string { return `Transmision MP (${this.tipo})`; }
  override costoReemplazo(): number { return this.tipo === "Automatica" ? 18000 : 12000; }
}

class SistemaFrenosMP extends ComponenteAutoMP {
  constructor(private tipoFrenos: string) { super(); }
  override nombre(): string { return `Sistema de Frenos MP (${this.tipoFrenos})`; }
  override costoReemplazo(): number { return 4500; }
}

const componentes: ComponenteAutoMP[] = [
  new MotorMP(4),
  new TransmisionMP("Automatica"),
  new SistemaFrenosMP("Disco ABS"),
];

for (const c of componentes) {
  console.log(`${c.nombre()}: costo reemplazo = $${c.costoReemplazo().toFixed(2)}`);
}
