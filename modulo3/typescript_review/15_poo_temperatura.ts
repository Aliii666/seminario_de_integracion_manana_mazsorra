class Temperatura {
  valorCelsius: number = 0;
  valorFahrenheit: number = 0;

  constructor(celsius: number, fahrenheit: number) {
    this.valorCelsius = celsius ?? 0 ;
    this.valorFahrenheit = fahrenheit ?? 0;
  }

  aFahrenheit(): number {
    return this.valorCelsius * 9 / 5 + 32;
  }

  aCelsius(): number {
    this.valorCelsius = (this.valorFahrenheit -32)/ (9 / 5);
    return this.valorCelsius;
  }

  aKelvin(): number {
    return this.valorCelsius + 273.15;
  }

  describir(): string {
    return (
      `${this.valorCelsius}°C = ` +
      `${this.aFahrenheit()}°F = ` +
      `${this.aKelvin()}K`
    );
  }
}

const hervor = new Temperatura(100, 0);
const congelacion = new Temperatura(0, 0);
const convertirACelsius = new Temperatura(0, 50);

console.log(hervor.describir());     // 100°C = 212°F = 373.15K
console.log(congelacion.describir()); // 0°C = 32°F = 273.15K
console.log(convertirACelsius.aCelsius());