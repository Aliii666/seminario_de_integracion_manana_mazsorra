interface DiagnosticableMP {
  diagnosticar(): string;
}

interface FacturableMP {
  esValidoParaFacturar(): boolean;
}

class OrdenReparacionMP implements DiagnosticableMP, FacturableMP {
  constructor(
    public folio: string,
    public repuestos: string[],
    public totalManoObra: number
  ) {}

  diagnosticar(): string {
    return JSON.stringify({ folio: this.folio, repuestos: this.repuestos, totalManoObra: this.totalManoObra });
  }

  esValidoParaFacturar(): boolean {
    return this.repuestos.length > 0 && this.totalManoObra > 0;
  }
}

const orden = new OrdenReparacionMP("ORD-885", ["Filtro de aire", "Bujia Iridium"], 1200);
console.log(orden.esValidoParaFacturar());
console.log(orden.diagnosticar());
