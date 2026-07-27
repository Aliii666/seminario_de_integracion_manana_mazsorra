print("match-case")
servicio = input("Servicio para hacer cambio/alineacion/frenos: ")
match servicio:
    case "cambio":
        print("Cambio de aceite iniciado")
    case "alineacion":
        print("Alineación iniciada")
    case "frenos":
        print("Servicio de frenos iniciado")
    case _:
        print(f"servicio '{servicio}' no encontrado")


    print("match condiciones")
    precio=125
    match precio:
        case n if n<0:
            print(f"${n} es negativo")
        case 0:
            print("Es cero")
        case n if n%2==0:
            print(f"${n} es par")
        case n:
            print(f"${n} es positivo e impar")
