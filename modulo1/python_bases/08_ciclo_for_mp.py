print("Match - Case")
estado_servicio = input("Estado del servicio en_proceso/completado/cancelado: ")
match estado_servicio:
    case "en_proceso":
        print("Vehículo en reparación")
    case "completado":
        print("Vehículo listo para entrega al cliente")
    case "cancelado":
        print("Servicio cancelado")
    case _:
        print(f"Estado '{estado_servicio}' no reconocido")

print("Match condicionales")
vehiculos_en_taller = 7
match vehiculos_en_taller:
    case n if n < 0:
        print(f"Error de registro: {n} negativo")
    case 0:
        print("Sin vehículos en taller")
    case n if n % 2 == 0:
        print(f"Tenemos {n} vehículos, cantidad par")
    case n:
        print(f"Tenemos {n} vehículos, cantidad impar")