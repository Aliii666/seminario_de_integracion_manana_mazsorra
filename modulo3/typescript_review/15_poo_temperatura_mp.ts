class TemperaturaMotorMP {
  valorCelsius: number = 0;
  valorFahrenheit: number = 0;

  constructor(celsius: number, fahrenheit: number) {
    this.valorCelsius = celsius ?? 0;
    this.valorFahrenheit = fahrenheit ?? 0;
  }

  aFahrenheit(): number {
    return (this.valorCelsius * 9) / 5 + 32;
  }

  aCelsius(): number {
    this.valorCelsius = (this.valorFahrenheit - 32) / (9 / 5);
    return this.valorCelsius;
  }

  aKelvin(): number {
    return this.valorCelsius + 273.15;
  }

  describir(): string {
    const alerta = this.valorCelsius > 105 ? " SOBRECALENTAMIENTO " : " Temperatura Normal";
    return (
      `Motor: ${this.valorCelsius}°C = ` +
      `${this.aFahrenheit()}°F = ` +
      `${this.aKelvin()}K${alerta}`
    );
  }
}

const motorSobrecalentado = new TemperaturaMotorMP(115, 0);
const motorNormal = new TemperaturaMotorMP(90, 0);
const pruebaFahrenheit = new TemperaturaMotorMP(0, 194);

console.log(motorSobrecalentado.describir());
console.log(motorNormal.describir());
console.log(`Conversion a Celsius: ${pruebaFahrenheit.aCelsius()}°C`);
